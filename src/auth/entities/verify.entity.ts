import { Field, ObjectType } from '@nestjs/graphql';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { OtpJob } from 'src/utils/enums/optJob.enum';
import { v4 as uuid } from 'uuid';

@ObjectType()
@Table
export class Verify extends Model {
  @PrimaryKey
  @Field()
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Field()
  @Column
  otp: number;

  @Field()
  @Column
  otpVerified: boolean;

  @Field()
  @Column({
    type: DataType.ENUM(...Object.values(OtpJob)),
  })
  otpJob: string;

  @BeforeCreate
  static autoGenerateUUID(verify: Verify) {
    verify.id = uuid();
  }
}
