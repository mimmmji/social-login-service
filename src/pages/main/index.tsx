import React from 'react';
import SocialLoginService, {
  LoginErrors,
  SocialLoginProviders,
  SocialLoginResponse,
} from '@/services/SocialLoginService';

function isError(response: LoginErrors | SocialLoginResponse): response is LoginErrors {
  return typeof (response as LoginErrors) === 'string';
}

const Main = () => {
  const onClick = async (provider: SocialLoginProviders) => {
    const service = new SocialLoginService({ provider });
    const resp = await service.login();

    if (isError(resp)) {
      alert('로그인 에러');
    } else {
      alert(JSON.stringify(resp));
    }
  };

  return (
    <>
      <button onClick={() => onClick('kakao')}>카카오 로그인</button>
      <button onClick={() => onClick('naver')}>네이버 로그인</button>
    </>
  );
};

export default Main;
