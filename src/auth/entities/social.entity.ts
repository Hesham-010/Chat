import { Field } from '@nestjs/graphql';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { SocialEnum } from 'src/utils/enums/social.enum';
import { v4 as uuid } from 'uuid';

@Table
export class Social extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Field()
  @Column
  providerId: string;

  @Column({
    type: DataType.ENUM(...Object.values(SocialEnum)),
  })
  socialType: SocialEnum;

  @ForeignKey(() => User)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  userId: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @BeforeCreate
  static generateUuid(social: Social) {
    social.id = uuid();
  }
}
