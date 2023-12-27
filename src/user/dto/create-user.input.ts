import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Length(3, 8)
  @IsString()
  @Field()
  firstName: string;

  @Length(3, 16)
  @IsString()
  @Field()
  lastName: string;

  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  password: string;
}
