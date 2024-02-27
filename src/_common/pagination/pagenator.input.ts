import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsOptional, Min, ValidateNested } from 'class-validator';

@InputType()
export class PaginatorInput {
  @Min(1)
  @Field({ defaultValue: 1 })
  page?: number;

  @Min(1)
  @Field({ defaultValue: 15 })
  limit?: number;
}

@ArgsType()
export class PaginatorArgs {
  @Field({ nullable: true })
  @IsOptional()
  @ValidateNested()
  paginate?: PaginatorInput;
}
