import { Injectable } from '@nestjs/common';
import { HelperService } from 'src/_common/helper/helper.service';
import { RegisterInput } from 'src/auth/dtos/register.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';
import { changePasswordInput } from '../dto/changePassword.input';
import { comparePassword, hashPassword } from 'src/utils/password';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';

@Injectable()
export class UserTransformer {
  constructor(private readonly helper: HelperService) {}

  async transformRegisterInput(Input: RegisterInput) {
    return {
      ...Input,
      fullName: Input.firstName + ' ' + Input.lastName,
      phone: Input.phone,
      password: await this.helper.hashPassword(Input.password),
      notVerifiedEmail: Input.email,
    };
  }

  async updateProfileTransformer(input: UpdateUserInput, user: User) {
    return {
      ...input,
      ...((input.firstName || input.lastName) && {
        fullName:
          (input.firstName || user.firstName) +
          ' ' +
          (input.lastName || user.lastName),
      }),
      ...(input.email && {
        notVerifiedEmail: input.email,
        verifiedEmail: null,
      }),
    };
  }

  async changePasswordTransformer(input: changePasswordInput, user: User) {
    const matchPassword = await comparePassword(
      input.currentPassword,
      user.password,
    );
    if (!matchPassword)
      throw new BaseHttpException(ErrorCodeEnum.WRONG_PASSWORD);

    if (input.confirmPassword !== input.newPassword)
      throw new BaseHttpException(ErrorCodeEnum.CONFIRM_PASSWORD_DOESN_T_MATCH);

    const password = await hashPassword(input.newPassword);
    return password;
  }
}
