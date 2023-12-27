import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length, Min } from 'class-validator';

@InputType()
export class RegisterInput {
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

  @Min(6)
  @IsString()
  @Field()
  password: string;
}
