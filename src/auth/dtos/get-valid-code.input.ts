import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { OtpUseCase } from 'src/utils/enums/otpJob.enum';

@InputType()
export class VerifyEmailInput {
  @IsNumber()
  @Field()
  otp: number;

  @Field()
  email: string;

  @Field()
  useCase: OtpUseCase;
}
