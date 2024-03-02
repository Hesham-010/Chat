import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsEnum } from 'class-validator';
import { OtpUseCase } from 'src/utils/enums/otpJob.enum';

@InputType()
export class sendOTPInput {
  @IsEmail()
  @Field()
  email: string;

  @IsEnum(OtpUseCase)
  @Field()
  useCase: OtpUseCase;
}
