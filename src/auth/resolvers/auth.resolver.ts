import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { RegisterInput } from '../dtos/register.input';
import { LoginInput } from '../dtos/login.input';
import { User } from 'src/user/entities/user.entity';
import { AuthResponse } from '../types/authType';
import { LoginResponse } from '../response';

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
  // sendOtpForPassword(@Args('email') email: string) {
  //   return this.authService.sendOtpForPassword(email);
  // }

  // @Mutation(() => String)
  // changePassword(
  //   @Args('newPassword') newPassword: string,
  //   @Args('email') email: string,
  // ) {
  //   return this.authService.changePassword(newPassword, email);
  // }

  // @Mutation(() => String)
  // sendOtpForRegister(@Args('email') email: string) {
  //   return this.authService.sendOtpForRegister(email);
  // }

  // @Mutation(() => String)
  // verifyOtp(@Args('otp') otp: string) {
  //   return this.authService.verifyOtp(otp);
  // }
}
