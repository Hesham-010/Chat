import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { SocialEnum } from 'src/utils/enums/social.enum';
import { StatusEmail } from 'src/utils/enums/statusEmail.enum';

@InputType()
export class LoginSocialInput {
  @IsOptional()
  @IsEmail()
  @Field()
  email: string;

  @Field()
  statusEmail: StatusEmail;

  @IsString()
  @Field()
  providerId: string;

  @Field()
  socialType: SocialEnum;
}
