import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsOptional, IsUUID } from 'class-validator';
import { GenderEnum, UserRoleEnum } from '../user.enum';

@InputType()
export class GetUsersFilter {
  @IsOptional()
  @Field({ nullable: true })
  searchKey?: string;

  @IsOptional()
  @IsBoolean()
  @Field({ nullable: true })
  isBlocked?: boolean;

  @IsOptional()
  @IsEnum(GenderEnum)
  @Field({ nullable: true })
  gender?: GenderEnum;

  @IsOptional()
  @IsEnum(UserRoleEnum)
  @Field({ nullable: true })
  role?: UserRoleEnum;
}

@ArgsType()
export class GetUsersInput {
  @Field({ nullable: true })
  filter?: GetUsersFilter;
}

@InputType()
export class GetUser {
  @IsUUID('4')
  @Field()
  userId: string;
}
