import { openaiHeader } from "@/config/config";

export const GenPlan = (lessonName: string) => {
  return new Promise((resolve, reject) => {
    uni.request({
      method: 'POST',
      url: 'https://api.openai.com/v1/chat/completions',
      header: openaiHeader,
      data: {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": `帮我写个${lessonName}的教案` }],
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
