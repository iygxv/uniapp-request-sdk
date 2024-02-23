import { platform } from './platform';
import { hideLoading, showLoading } from './loading';

const mapBaseUrl = {
  H5: '/dev-api',
  MpWeixin: 'https://xxxx'
  // 测试环境 / 预发布环境 / 生产环境自己补充...
};

const baseUrl = mapBaseUrl[platform];

/**
 * 封装uni.request
 * @param {String}  option.method  请求方式
 * @param {String}  option.url     请求url
 * @param {Object}  option.data    请求参数
 * @param {Object}  option.loading loading配置信息
 * @param {Boolean} option.loading.show 显示loading
 * 余下配置参考 RequestOptions 类型定义
 * 如果要扩展 可在 MyRequestOptions 下进行类型扩展
 * 
 * ==== 
 * MyRequestOptions  HttpResponse 放在了./type/index.ts 建议放在 global.d.ts 全局 ts 类型定义中
 * ====
 * @returns
 */
const request = <T = any>(
  option: MyRequestOptions
): Promise<HttpResponse<T>> => {
  return new Promise((resolve, reject) => {
    // 处理请求loading
    if (option.loading?.show) {
      showLoading(option.loading.option);
    }
    uni.request({
      method: option.method || 'GET',
      url: `${baseUrl}${option.url}`, // 完整URL
      data: option.data || {},
      header: option.header || {},
      success: async (res) => {
        // 处理响应数据
        if (option.loading?.show) {
          hideLoading();
        }
        // ========= 下面按要求后端的返回自行处理 ========
        const data = res.data as HttpResponse<T>;
        if (data.code === 200) {
          resolve(data);
        } else {
          uni.showToast({
            title: data.errMsg,
            icon: 'none'
          });
        }
        if (data.code === 401) {
          // 删除缓存
          uni.navigateTo({
            url: '/pages/login/login'
          });
        }
        // ========= 上面按要求后端的返回自行处理 ========
      },
      fail: (err) => {
        if (option.loading?.show) {
          hideLoading();
        }
        uni.showToast({
          title: err.errMsg,
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

// 这里仅封装了部分常用的请求方法，可以根据需求继续封装其他方法
request.post = <T = any>(option: MyRequestOptions) => {
  return request({
    method: 'POST',
    ...option
  }) as unknown as Promise<HttpResponse<T>>;
};

request.get = <T = any>(option: MyRequestOptions) => {
  return request({
    method: 'GET',
    ...option
  }) as unknown as Promise<HttpResponse<T>>;
};

request.put = <T = any>(option: MyRequestOptions) => {
  return request({
    method: 'PUT',
    ...option
  }) as unknown as Promise<HttpResponse<T>>;
};

request.delete = <T = any>(option: MyRequestOptions) => {
  return request({
    method: 'DELETE',
    ...option
  }) as unknown as Promise<HttpResponse<T>>;
};

export default request;
