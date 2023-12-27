import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Min } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @Min(6)
  @IsString()
  @Field()
  password: string;
}
