import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { MergeOrReplace } from 'src/utils/enums/mergeOrReplace.enum';
import { SocialEnum } from 'src/utils/enums/social.enum';

@InputType()
export class MergeOrReplaceInput {
  @IsOptional()
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  providerId: string;

  @Field()
  socialType: SocialEnum;

  @IsOptional()
  @Field({ nullable: true })
  mergeOrReplace: MergeOrReplace;
}
