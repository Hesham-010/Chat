import { ObjectType, Field } from '@nestjs/graphql';

type ClassType<T> = new (...args: any[]) => T;

@ObjectType()
export class PageInfoType {
  @Field()
  hasNext: boolean;

  @Field()
  hasBefore: boolean;

  @Field()
  page: number;

  @Field()
  totalCount: number;

  @Field()
  totalPages: number;

  @Field()
  limit: number;
}

export function PaginationResponse<item extends object>(item: ClassType<item>) {
  @ObjectType()
  abstract class Pagination {
    @Field(() => [item], { nullable: true })
    items?: [item];

    @Field()
    pageInfo: PageInfoType;
  }

  return Pagination;
}
