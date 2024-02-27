import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { GetUser, GetUsersFilter } from '../dto/get-users.filter';
import { PaginatorInput } from 'src/_common/pagination/pagenator.input';
import { Op } from 'sequelize';
import { HelperService } from 'src/_common/helper/helper.service';
import { BaseHttpException } from 'src/_common/exceptions/base-http-exception';
import { ErrorCodeEnum } from 'src/_common/exceptions/error-code.enum';
import { UpdateUserInput } from '../dto/update-user.input';
import { UserTransformer } from '../transformer/user.transformer';
import { isEmail } from 'class-validator';
import { changePasswordInput } from '../dto/changePassword.input';
import { comparePassword } from 'src/utils/password';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
    private readonly helper: HelperService,
    private readonly userTransformer: UserTransformer,
  ) {}

  async findAll(filter: GetUsersFilter, paginate: PaginatorInput) {
    return await User.paginate(
      {
        ...(filter.role && { role: filter.role }),
        ...(filter.isBlocked !== undefined && { isBlocked: filter.isBlocked }),
        ...(filter.gender && { gender: filter.gender }),
        ...(filter.searchKey && {
          [Op.or]: [
            {
              fullName: {
                [Op.iLike]: `%${this.helper.trimAllSpaces(filter.searchKey)}%`,
              },
            },
            { verifiedEmail: { [Op.iLike]: `%${filter.searchKey}%` } },
            { phone: { [Op.iLike]: `%${filter.searchKey}%` } },
          ],
        }),
      },
      '-createdAt',
      paginate.page,
      paginate.limit,
    );
  }

  async findOne(getUser: GetUser) {
    const { userId } = getUser;
    const user = await this.userRepository.findByPk(userId);
    if (!user) {
      return new NotFoundException(`There is no user for this id ${userId}`);
    }
    return user;
  }

  async updateProfile(input: UpdateUserInput, user: User) {
    if (input.phone) {
      const existUser = await this.userRepository.findOne({
        where: {
          id: { [Op.ne]: user.id },
          verifiedPhone: input.phone,
        },
      });
      if (existUser)
        throw new BaseHttpException(ErrorCodeEnum.PHONE_ALREADY_EXISTS);
    }

    if (input.email) {
      if (!isEmail(input.email))
        throw new BaseHttpException(ErrorCodeEnum.INVALID_EMAIL);
      const existUser = await this.userRepository.findOne({
        where: {
          id: { [Op.ne]: user.id },
          email: input.email,
        },
      });
      if (existUser)
        throw new BaseHttpException(ErrorCodeEnum.EMAIL_ALREADY_EXISTS);
    }

    if (user.isBlocked) throw new BaseHttpException(ErrorCodeEnum.BLOCKED_USER);
    if (!user.verifiedEmail)
      throw new BaseHttpException(ErrorCodeEnum.USER_EMAIL_IS_NOT_VERIFIED_YET);

    const updateProfileTransformer =
      await this.userTransformer.updateProfileTransformer(input, user);

    const res = await user.update(updateProfileTransformer);
    return res;
  }

  async getValidUserOrError(filter): Promise<User> {
    const user = await this.userRepository.findOne({ where: filter });
    if (!user) throw new BaseHttpException(ErrorCodeEnum.USER_DOES_NOT_EXIST);
    if (user.isBlocked) throw new BaseHttpException(ErrorCodeEnum.BLOCKED_USER);
    if (!user.verifiedEmail)
      throw new BaseHttpException(ErrorCodeEnum.USER_EMAIL_IS_NOT_VERIFIED_YET);
    return user;
  }

  async errorIfUserVerifiedEmailExist(email: string) {
    const user = await this.userRepository.findOne({
      where: { verifiedEmail: email },
    });

    if (user) throw new BaseHttpException(ErrorCodeEnum.EMAIL_ALREADY_EXISTS);
  }

  async deleteUsersIfNotVerifiedEmailExist(email: string) {
    await this.userRepository.destroy({
      where: { notVerifiedEmail: email },
    });
  }

  async errorIfUserPhoneExist(phone) {
    const user = await this.userRepository.findOne({
      where: { phone },
    });

    if (user) throw new BaseHttpException(ErrorCodeEnum.PHONE_ALREADY_EXISTS);
  }

  async getValidUserForLogin(filter) {
    const user = await this.userRepository.findOne(filter);
    if (!user)
      throw new BaseHttpException(ErrorCodeEnum.INCORRECT_EMAIL_OR_PASSWORD);
    if (user.isBlocked) throw new BaseHttpException(ErrorCodeEnum.BLOCKED_USER);
    return user;
  }

  async changePassword(input: changePasswordInput, user: User) {
    if (!user.verifiedEmail)
      throw new BaseHttpException(ErrorCodeEnum.USER_EMAIL_IS_NOT_VERIFIED_YET);

    const password = await this.userTransformer.changePasswordTransformer(
      input,
      user,
    );

    await user.update({ password });

    return 'Password Updated';
  }
}
