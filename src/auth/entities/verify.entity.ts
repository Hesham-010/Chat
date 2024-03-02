import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { OtpUseCase } from 'src/utils/enums/otpJob.enum';
import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@ObjectType()
@Table
export class Verify extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Field()
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @AllowNull(false)
  @Field()
  @Column
  otp: number;

  @AllowNull(false)
  @Field()
  @Column({
    type: DataType.ENUM(...Object.values(OtpUseCase)),
  })
  useCase: OtpUseCase;

  @AllowNull(false)
  @Column({ type: DataType.DATE })
  expiryDate: Date;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  @Field()
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
