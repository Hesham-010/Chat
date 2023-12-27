import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';
import { SocialEnum } from 'src/utils/enums/social.enum';

@InputType()
export class SocialRegisterInput {
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
  providerId: string;

  @Field()
  socialType: SocialEnum;
}
