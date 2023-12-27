import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { comperePassword, hashPassword } from 'src/utils/password';
import { createToken } from 'src/utils/token';
import { Verify } from '../entities/verify.entity';
import { RegisterInput } from '../dtos/register.dto';
import { LoginInput } from '../dtos/login.dto';
import { LoginSocialInput } from '../dtos/socialLogin';
import { StatusEmail } from 'src/utils/enums/statusEmail.enum';
import { SocialRegisterInput } from '../dtos/socialRegister.dto';
import { Social } from '../entities/social.entity';
import { sendEmail } from 'src/utils/SendEmail/sendMailer';
import { OtpJob } from 'src/utils/enums/optJob.enum';
import { MergeOrReplace } from 'src/utils/enums/mergeOrReplace.enum';
import { SocialEnum } from 'src/utils/enums/social.enum';
import { MergeOrReplaceInput } from '../dtos/mergeOrReplace.input';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
    @Inject('VERIFY_REPOSITORY') private verifyRepository: typeof Verify,
    @Inject('SOCIAL_REPOSITORY') private socialRepository: typeof Social,
  ) {}

  async register(registerInput: RegisterInput) {
    registerInput.password = await hashPassword(registerInput.password);
    const unVerifiedEmail = registerInput.email;
    const user = await this.userRepository.create({
      unVerifiedEmail,
      ...registerInput,
    });
    return user;
  }

  async login(loginInput: LoginInput) {
    const user = await this.userRepository.findOne({
      where: { verifiedEmail: loginInput.email },
    });
    if (!user) {
      return new NotFoundException(`Invalid Email or Password`);
    }
    const comparePassword = await comperePassword(
      loginInput.password,
      user.password,
    );

    if (!user || !comparePassword) {
      return new BadRequestException('Invalid Email or Password');
    }
    const token = await createToken({ user: user.id });
    return { token, data: user };
  }

  async sendOtpForPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: { verifiedEmail: email },
    });
    if (!user) {
      return new NotFoundException('email not found');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await this.verifyRepository.create({
      otp,
      otpVerified: false,
      otpJob: OtpJob.RESET_PASSWORD,
      userId: user.id,
    });
    sendEmail({ email, subject: 'Verify Password', code: otp });
    return 'Success';
  }

  async changePassword(newPassword: string, email: string) {
    const newHashPassword = await hashPassword(newPassword);
    console.log(newHashPassword);
    await this.userRepository.update(
      { password: newHashPassword },
      {
        where: { verifiedEmail: email },
      },
    );
    return 'Success';
  }

  async socialRegister(socialRegisterInput: SocialRegisterInput) {
    // check if user exist
    const user = await this.userRepository.findOne({
      where: {
        verifiedEmail: socialRegisterInput.email,
      },
    });

    if (!user) {
      // create new user
      const user = await this.userRepository.create({
        verifiedEmail: socialRegisterInput.email,
        ...socialRegisterInput,
      });

      // create new social for specific user
      await this.socialRepository.create({
        userId: user.id,
        providerId: socialRegisterInput.providerId,
        socialType: socialRegisterInput.socialType,
      });

      return user;
    }
    return new BadRequestException('this email already exist');
  }

  async socialLogin(loginSocialInput: LoginSocialInput) {
    const socialUser = await this.socialRepository.findOne({
      where: {
        providerId: loginSocialInput.providerId,
        socialType: loginSocialInput.socialType,
      },
    });
    // return user if providerId exist
    if (socialUser) {
      const user = await this.userRepository.findByPk(socialUser.userId);
      const token = await createToken({ user: user.id });
      return {
        statusCode: 200,
        status: 'Success',
        token,
        data: user,
        message: 'user can be access',
      };
    }
    return await this.checkEmail(loginSocialInput);
  }

  async checkEmail(loginSocialInput: LoginSocialInput) {
    const user = await this.userRepository.findOne({
      where: { verifiedEmail: loginSocialInput.email },
    });

    if (!user && loginSocialInput.statusEmail === StatusEmail.MANUALLY) {
      return {
        statusCode: 601,
        status: 'Success',
        token: null,
        data: null,
        message: 'must be verify email and register',
      };
    } else if (!user && loginSocialInput.statusEmail === StatusEmail.AUTO) {
      return {
        statusCode: 600,
        status: 'Success',
        token: null,
        data: null,
        message: 'must be register',
      };
    }

    return {
      statusCode: 602,
      status: 'Success',
      token: null,
      data: null,
      message: 'must be merge or replace',
    };
  }

  async mergeOrReplace(mergeOrReplaceInput: MergeOrReplaceInput) {
    const user = await this.userRepository.findOne({
      where: { verifiedEmail: mergeOrReplaceInput.email },
    });

    if (mergeOrReplaceInput.mergeOrReplace === MergeOrReplace.MERGE) {
      await this.socialRepository.create({
        providerId: mergeOrReplaceInput.providerId,
        socialType: mergeOrReplaceInput.socialType,
        userId: user.id,
      });
    } else if (mergeOrReplaceInput.mergeOrReplace === MergeOrReplace.REPLACE) {
      await this.socialRepository.update(
        {
          providerId: mergeOrReplaceInput.providerId,
          socialType: mergeOrReplaceInput.socialType,
        },
        {
          where: {
            userId: user.id,
            socialType: mergeOrReplaceInput.socialType,
          },
          returning: true,
        },
      );
    }
    return { status: 'Success' };
  }

  async sendOtpForRegister(email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const verify = await this.verifyRepository.create({
      otp,
      otpVerified: false,
      otpJob: OtpJob.VERIFY_EMAIL,
    });

    sendEmail({ email, subject: 'Verify Email', code: otp });

    return 'success';
  }

  async verifyOtp(otp: string) {
    const verify = await this.verifyRepository.findOne({
      where: { otp },
    });

    if (!verify) {
      return new BadRequestException('Invalid Code');
    }

    if (!verify || Number(verify.createdAt) + 10 * (60 * 1000) < Date.now()) {
      return new BadRequestException('Invalid Code');
    }

    await verify.destroy();

    return 'Code Verified';
  }
}
