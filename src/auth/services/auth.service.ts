import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { comparePassword, hashPassword } from 'src/utils/password';
import { createToken } from 'src/utils/token';
import { Verify } from '../entities/verify.entity';
import { RegisterInput } from '../dtos/register.input';
import { LoginInput } from '../dtos/login.input';
import { sendEmail } from 'src/utils/SendEmail/sendMailer';
import { UserService } from 'src/user/services/user.service';
import { UserTransformer } from 'src/user/transformer/user.transformer';
import { LoginResponse } from '../response';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { OtpUseCase } from 'src/utils/enums/otpJob.enum';
import { sendOTPInput } from '../dtos/sendOTP.input';
import { VerifyEmailInput } from '../dtos/get-valid-code.input';
import { NotificationService } from 'src/notification/services/notification.service';
import { DeviceType } from 'src/notification/notification_status.enum';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
    @Inject('VERIFY_REPOSITORY') private verifyRepository: typeof Verify,
    private readonly userService: UserService,
    private readonly userTransformer: UserTransformer,
    private readonly notificationService: NotificationService,
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

    await this.notificationService.createDeviceInfoForLogin({
      userId: user.id,
      deviceType: loginInput.deviceType,
      fcm_Token: loginInput.fcm_Token,
    });

    const token = await createToken({ user: user.id });
    return { token, user };
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

  async verifyEmail(verifyEmailInput: VerifyEmailInput) {
    const { email } = verifyEmailInput;

    const user = await this.userService.getUserToVerifyEmail({
      notVerifiedEmail: email,
    });

    const verify = await this.getValidVerificationCode(verifyEmailInput, user);

    await user.update({ verifiedEmail: email, notVerifiedEmail: null });

    await verify.destroy();

    return true;
  }

  async sendOtp(sendOtp: sendOTPInput) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date(Date.now() + 3600000);

    const user = await this.userService.getUserToVerifyEmail({
      notVerifiedEmail: sendOtp.email,
    });

    await this.verifyRepository.create({
      otp,
      expiryDate,
      useCase: OtpUseCase.VERIFY_EMAIL,
      userId: user.id,
    });

    sendEmail({ email: sendOtp.email, subject: 'Verify Email', code: otp });

    return true;
  }

  //////////////////////////////////////////////////////////////////
  async getValidVerificationCode(
    verifyEmailInput: VerifyEmailInput,
    user: User,
  ): Promise<Verify> {
    const { otp, useCase } = verifyEmailInput;

    const verify = await this.verifyRepository.findOne({
      where: { otp, useCase, userId: user.id },
    });
    if (!verify) throw new BaseHttpException(ErrorCodeEnum.INVALID_Code);
    if (verify.expiryDate < new Date(Date.now()))
      throw new BaseHttpException(ErrorCodeEnum.EXPIRED_VERIFICATION_CODE);
    return verify;
  }
}
