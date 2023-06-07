export const subscribeMessage = (templateId: string) => {
  if (uni.canIUse('requestSubscribeMessage')) {
    wx.requestSubscribeMessage({
      tmplIds: [templateId],
      success(res: object) {
        console.log({ res });
      },
      fail({ errMsg }: { errMsg: string }) {
        console.log({ errMsg });
      },
    });
  } else {
    console.log('当前微信版本不支持订阅消息，请先升级微信到最新版');
  };
};
