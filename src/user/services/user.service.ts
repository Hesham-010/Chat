import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User } from '../entities/user.entity';
import { hashPassword } from 'src/utils/password';
import { Social } from 'src/auth/entities/social.entity';
import { AddSocialAcountInput } from '../dto/addSocialAcount.input';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
    @Inject('SOCIAL_REPOSITORY') private socialRepository: typeof Social,
  ) {}

  async create(createUserInput: CreateUserInput) {
    createUserInput.password = await hashPassword(createUserInput.password);
    const user = await this.userRepository.create({
      ...createUserInput,
    });
    return user;
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      return new NotFoundException(`There is no user for this id ${id}`);
    }
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.update(updateUserInput, {
      where: { id },
      returning: true,
    });

    if (!user[0]) {
      return new NotFoundException(`No user for this id ${updateUserInput.id}`);
    }

    return user[1][0];
  }

  async remove(id: string) {
    await this.userRepository.destroy({ where: { id } });
    return 'User Removed';
  }

  async disconnectSocialAcount(
    addSocialAcountInput: AddSocialAcountInput,
    userId: string,
  ) {
    const socialAcounts = await this.socialRepository.findAll({
      where: { userId },
    });

    const user = await this.userRepository.findByPk(userId);

    if (socialAcounts.length <= 1 && !user.password) {
      return 'to disconnect this acount please link another one frist';
    }

    await this.socialRepository.destroy({
      where: {
        userId,
        providerId: addSocialAcountInput.providerId,
        socialType: addSocialAcountInput.socialType,
      },
    });

    return 'Your acount disconnected';
  }
}
