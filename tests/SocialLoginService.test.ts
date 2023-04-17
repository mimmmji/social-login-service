import SocialLoginService, { LoginErrors } from '../src/services/SocialLoginService';

describe('SocialLoginService', () => {
  it('should login through kakao', async () => {
    const service = new SocialLoginService({ provider: 'kakao' });
    const result = await service.login();
    expect(result).toHaveProperty('providerId');
    expect(result).toHaveProperty('provider', 'kakao');
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('scopes');
    expect(result).toHaveProperty('email');
  });

  it('should login through naver', async () => {
    const service = new SocialLoginService({ provider: 'naver'});
    const result = await service.login();
    expect(result).toHaveProperty('providerId');
    expect(result).toHaveProperty('provider', 'naver');
    expect(result).toHaveProperty('user');
    expect(result).toHaveProperty('scopes');
    expect(result).toHaveProperty('email');
  });
  it('should return LoginProviderError for invalid provider', async () => {
    const service = new SocialLoginService({ provider: 'facebook' });
    const result = await service.login();
    expect(result).toBe(LoginErrors.LoginProviderError);
  });
});

