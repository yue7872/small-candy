import { openaiHeader } from "@/config/config";
export const OpenAi = () => {
  return new Promise((resolve, reject) => {
    uni.request({
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',
      header: openaiHeader,
      data: {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": "Who won the world series in 2020?" }],
      },
      success: (res: any) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}
