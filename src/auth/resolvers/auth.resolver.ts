import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { RegisterInput } from '../dtos/register.dto';
import { LoginInput } from '../dtos/login.dto';
import { User } from 'src/user/entities/user.entity';
import { LoginSocialInput } from '../dtos/socialLogin';
import { AuthResponse } from '../types/authType';
import { SocialRegisterInput } from '../dtos/socialRegister.dto';
import { MergeOrReplaceInput } from '../dtos/mergeOrReplace.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Mutation(() => String)
  sendOtpForPassword(@Args('email') email: string) {
    return this.authService.sendOtpForPassword(email);
  }

  @Mutation(() => String)
  changePassword(
    @Args('newPassword') newPassword: string,
    @Args('email') email: string,
  ) {
    return this.authService.changePassword(newPassword, email);
  }

  @Mutation(() => User!)
  socialRegister(
    @Args('socialRegisterInput') socialRegisterInput: SocialRegisterInput,
  ) {
    return this.authService.socialRegister(socialRegisterInput);
  }

  @Mutation(() => AuthResponse)
  socialLogin(@Args('loginSocialInput') loginSocialInput: LoginSocialInput) {
    return this.authService.socialLogin(loginSocialInput);
  }

  @Mutation(() => AuthResponse)
  mergeOrReplace(
    @Args('mergeOrReplaceInput') mergeOrReplaceInput: MergeOrReplaceInput,
  ) {
    return this.authService.mergeOrReplace(mergeOrReplaceInput);
  }

  @Mutation(() => String)
  sendOtpForRegister(@Args('email') email: string) {
    return this.authService.sendOtpForRegister(email);
  }

  @Mutation(() => String)
  verifyOtp(@Args('otp') otp: string) {
    return this.authService.verifyOtp(otp);
  }
}
