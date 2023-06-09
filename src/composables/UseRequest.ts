export const UseRequest = (
  url: string,
  method: "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined = 'GET',
  data?: {
    [propName: string]: any;
  }
) => {
  let query = '';
  if (data) {
    query = Object.keys(data).map((item) => {
      return `${item}=${data[item]}`
    }).join('&');
  }
  return new Promise((resolve, reject) => {
    uni.request({
      method,
      // 默认雁塔区
      url: `${url}?${query}`,
      success: (res: any) => {
        if (res.data.code === '200') {
          resolve(res.data)
        }
      },

      fail: (err) => {
        reject(err)
      }
    })
  })
}
