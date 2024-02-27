import { ObjectType } from '@nestjs/graphql';
import { PaginationResponse } from 'src/_common/types/pagination.type';
import { User } from './entities/user.entity';

@ObjectType()
export class UserPagination extends PaginationResponse(User) {}
