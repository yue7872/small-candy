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
      url: `${url}?key=4b5a7bf00d40495fbc49576a210d6035&location=101110113&${query}`,
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
