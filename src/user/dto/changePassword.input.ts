import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

@InputType()
export class changePasswordInput {
  @Field()
  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  currentPassword: string;

  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  @Field()
  newPassword: string;

  @MinLength(6)
  @MaxLength(30)
  @IsNotEmpty()
  @Field()
  confirmPassword: string;
}
