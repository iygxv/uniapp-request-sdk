interface ShowLoadingOptions {
  /**
   * 提示的内容
   */
  title?: string;
  /**
   * 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  mask?: boolean;
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: any) => void;
  /**
   * 接口调用失败的回调函数
   */
  fail?: (result: any) => void;
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (result: any) => void;
}

let loadingCount = 0;

export function showLoading(option: ShowLoadingOptions = {}) {
  loadingCount++;
  uni.showLoading({
    title: option.title || '加载中',
    ...option
  });
}

export function hideLoading() {
  loadingCount = loadingCount - 1;
  if (loadingCount === 0) {
    uni.hideLoading();
  }
}
