import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { comparePassword, hashPassword } from 'src/utils/password';
import { createToken } from 'src/utils/token';
import { Verify } from '../entities/verify.entity';
import { RegisterInput } from '../dtos/register.input';
import { LoginInput } from '../dtos/login.input';
import { sendEmail } from 'src/utils/SendEmail/sendMailer';
import { OtpJob } from 'src/utils/enums/otpJob.enum';
import { UserService } from 'src/user/services/user.service';
import { UserTransformer } from 'src/user/transformer/user.transformer';
import { LoginResponse } from '../response';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
    private readonly userService: UserService,
    private readonly userTransformer: UserTransformer,
  ) {}

  async register(registerInput: RegisterInput) {
    await this.userService.errorIfUserVerifiedEmailExist(registerInput.email);
    await this.userService.deleteUsersIfNotVerifiedEmailExist(
      registerInput.email,
    );
    await this.userService.errorIfUserPhoneExist(registerInput.email);
    const transformedInput =
      await this.userTransformer.transformRegisterInput(registerInput);
    return await this.userRepository.create({ ...transformedInput });
  }

  async loginWithEmailAndPassword(
    loginInput: LoginInput,
  ): Promise<LoginResponse> {
    const user = await this.userService.getValidUserForLogin({
      where: { verifiedEmail: loginInput.email },
    });

    // Match Password
    const matchPassword = await comparePassword(
      loginInput.password,
      user.password,
    );

    if (!user || !matchPassword) {
      throw new BaseHttpException(ErrorCodeEnum.INCORRECT_EMAIL_OR_PASSWORD);
    }

    const token = await createToken({ user: user.id });
    return { token, user };
  }

  // async sendOtpForPassword(email: string) {
  //   const user = await this.userRepository.findOne({
  //     where: { verifiedEmail: email },
  //   });
  //   if (!user) {
  //     return new NotFoundException('email not found');
  //   }
  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();

  //   await this.verifyRepository.create({
  //     otp,
  //     otpVerified: false,
  //     otpJob: OtpJob.RESET_PASSWORD,
  //     userId: user.id,
  //   });
  //   sendEmail({ email, subject: 'Verify Password', code: otp });
  //   return 'Success';
  // }

  // async changePassword(newPassword: string, email: string) {
  //   const newHashPassword = await hashPassword(newPassword);
  //   console.log(newHashPassword);
  //   await this.userRepository.update(
  //     { password: newHashPassword },
  //     {
  //       where: { verifiedEmail: email },
  //     },
  //   );
  //   return 'Success';
  // }

  // async sendOtpForRegister(email: string) {
  //   const otp = Math.floor(100000 + Math.random() * 900000).toString();

  //   const verify = await this.verifyRepository.create({
  //     otp,
  //     otpVerified: false,
  //     otpJob: OtpJob.VERIFY_EMAIL,
  //   });

  //   sendEmail({ email, subject: 'Verify Email', code: otp });

  //   return 'success';
  // }

  // async verifyOtp(otp: string) {
  //   const verify = await this.verifyRepository.findOne({
  //     where: { otp },
  //   });

  //   if (!verify) {
  //     return new BadRequestException('Invalid Code');
  //   }

  //   if (!verify || Number(verify.createdAt) + 10 * (60 * 1000) < Date.now()) {
  //     return new BadRequestException('Invalid Code');
  //   }

  //   await verify.destroy();

  //   return 'Code Verified';
  // }
}
