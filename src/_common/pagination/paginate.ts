import { WhereOptions } from 'sequelize';
import { ModelCtor } from 'sequelize-typescript';

export interface PaginationResponse<T> {
  pageInfo: {
    hasNext: boolean;
    hasBefore: boolean;
    page: number;
    totalCount: number;
    totalPages: number;
    limit: number;
  };
  items: [];
}

export async function paginate<T>(
  model: ModelCtor,
  where: WhereOptions = {},
  sort: string = '-createdAt',
  page = 0,
  limit = 15,
  include: any = [],
): Promise<PaginationResponse<T>> {
  let order;
  if (typeof sort === 'object') order = sort;
  else order = [[sort.replace('-', ''), sort.startsWith('-') ? 'DESC' : 'ASC']];

  const totalCount: number = await model.count();

  if (limit > 10) limit = 10;
  if (limit < 1) limit = 10;
  if (page < 1) page = 1;

  const totalPages = Math.ceil(totalCount / limit) || 1;
  const offset = page > 1 ? (page - 1) * limit : 0;
  const hasNext: boolean = offset + limit < totalCount;
  const hasBefore: boolean = page <= 1 ? false : true;

  const items = await model.findAll({ where, order, limit, offset, include });
  return {
    pageInfo: {
      hasBefore,
      hasNext,
      page,
      totalCount,
      totalPages,
      limit,
    },
    items: <any>items,
  };
}
