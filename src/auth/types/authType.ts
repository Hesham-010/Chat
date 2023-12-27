import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field({ nullable: true })
  statusCode: number;

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  message: string;

  @Field(() => User, { nullable: true })
  data: User;

  @Field({ nullable: true })
  token: string;
}

// @ObjectType()
// export class SocialAuthResponse {
//   status: string; /*enum */
//   user: User;
// }
