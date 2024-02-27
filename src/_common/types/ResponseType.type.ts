// import { ObjectType, Field } from '@nestjs/graphql';
// import { Category } from 'src/category/entities/category.entity';
// import { Address } from 'src/address/entities/address.entity';
// import { Order } from 'src/order/entities/order.entity';
// import { Product } from 'src/product/entities/product.entity';
// import { Return } from 'src/return/entities/return.entity';
// import { SubCategory } from 'src/subcategory/entities/subcategory.entity';
// import { ClassType } from 'type-graphql';

// export function GeneralResponse<item extends object>(item: ClassType<item>) {
//   @ObjectType()
//   abstract class ResponseClass {
//     @Field(() => [item], { nullable: true })
//     data: item[];

//     @Field({ nullable: true })
//     message: string;

//     @Field({ nullable: true })
//     code: number;
//   }
//   return ResponseClass;
// }

// @ObjectType()
// export class AddressResponse extends GeneralResponse(Address) {}

// @ObjectType()
// export class ProductResponse extends GeneralResponse(Product) {}

// @ObjectType()
// export class CategoryResponse extends GeneralResponse(Category) {}

// @ObjectType()
// export class OrderResponse extends GeneralResponse(Order) {}

// @ObjectType()
// export class SubCategoryResponse extends GeneralResponse(SubCategory) {}

// @ObjectType()
// export class ReturnResponse extends GeneralResponse(Return) {}
