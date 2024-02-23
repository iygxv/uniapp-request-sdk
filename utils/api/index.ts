// ==========这个是示例代码==========
import request from '@/utils/request';

export interface UserInfo {
  uuid: string;
  username: string;
  nickName: string;
  avatar: string;
}

export interface loginType {
  userInfo: UserInfo;
  token: string;
}

export const login = (
  option: MyRequestOptions = {}
): Promise<HttpResponse<loginType>> => {
  option.url = '/user/login';
  return request.post(option);
};

// 使用方式
const handleLogin = async () => {
  const res: HttpResponse<loginType> = await login({
    data: {
      username: 'admin',
      password: '123456'
    },
    loading: {
      show: true,
      option: {
        title: '加载中...'
      }
    }
  });
  console.log(res);
};
