import KakaoLogin from "./KakaoLogin";
import NaverLogin from "./NaverLogin";

export type SocialLoginProviders = 'kakao' | 'naver' | string;

interface User {
  id: number | string;
}

export enum LoginErrors {
  // naver, kakao 이외의 다른 provider가 넘어왔을 경우 발생하는 에러
  LoginProviderError = 'LoginProviderError',
}

export interface SocialLoginResponse {
  providerId: string;
  provider: string;
  user?: User;
  scopes?: string[];
  email?: string | null;
}

class SocialLoginService {
  private readonly provider: SocialLoginProviders;

  constructor({ provider }: { provider: SocialLoginProviders }) {
    if(!['kakao','naver'].includes(provider)){
       LoginErrors.LoginProviderError;
    }
    this.provider = provider;
  }

  async login(): Promise<LoginErrors | SocialLoginResponse> {
    if(this.provider === 'kakao'){
      const response = await new KakaoLogin().login();
      return {
        providerId: response.provider_id,
        provider: 'kakao',
        user: {
          id: response.profile.user.id,
        },
        scopes: response.profile.scopes,
        email: response.profile.user.email
      }
    } else if (this.provider === 'naver'){
      const response = await new NaverLogin().login();
      return {
        providerId: response.provider.id,
        provider: 'naver',
        user: {
          id: response.provider.id,
        },
        scopes: response.profile.scopes,
        email: response.profile.email
      }
    } else{
      return LoginErrors.LoginProviderError;
    }   
  }
}

export default SocialLoginService;
