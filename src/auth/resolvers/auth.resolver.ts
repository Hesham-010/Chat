import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { RegisterInput } from '../dtos/register.input';
import { LoginInput } from '../dtos/login.input';
import { User } from 'src/user/entities/user.entity';
import { LoginResponse } from '../response';
import { sendOTPInput } from '../dtos/sendOTP.input';
import { VerifyEmailInput } from '../dtos/get-valid-code.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => LoginResponse)
  loginWithEmailAndPassword(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.loginWithEmailAndPassword(loginInput);
  }

  // @Mutation(() => String)
  // changePassword(
  //   @Args('newPassword') newPassword: string,
  //   @Args('email') email: string,
  // ) {
  //   return this.authService.changePassword(newPassword, email);
  // }

  @Mutation(() => Boolean)
  sendOtp(@Args('input') input: sendOTPInput) {
    return this.authService.sendOtp(input);
  }

  @Mutation(() => Boolean)
  verifyEmail(@Args('input') input: VerifyEmailInput) {
    return this.authService.verifyEmail(input);
  }
}
