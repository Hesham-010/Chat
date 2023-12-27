import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Length } from 'class-validator';
import { SocialEnum } from 'src/utils/enums/social.enum';

@InputType()
export class AddSocialAcountInput {
  @IsString()
  @Field()
  socialType: SocialEnum;

  @IsString()
  @Field()
  providerId: string;
}
