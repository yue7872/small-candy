<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import { UseRequest } from '@/composables/UseRequest';

  interface DailyWeather {
    fxDate: string;
    textDay: string;
    tempMin: number;
    tempMax: number;
  }
  interface TargetWeather {
    name: string;
    category: string;
    text: string;
    level: string;
  }
  const title = ref('candy');
  const weatherArr: Ref<DailyWeather[]> = ref([]);
  const targetArr: Ref<DailyWeather[]> = ref([]);

  const showWeather = () => {
    UseRequest('https://devapi.qweather.com/v7/weather/3d').then((res: any) => {
      console.log(res);
      weatherArr.value = res.daily;

      UseRequest('https://devapi.qweather.com/v7/indices/3d', 'GET', { type: 3 }).then((indices: any) => {
        targetArr.value = indices.daily;
      });
    });
  };
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view>今日天气</view>
    <view v-if="weatherArr.length > 0">
      <view>{{ weatherArr[0].fxDate }}</view>
      <view>{{ weatherArr[0].textDay }}</view>
      <view>{{ weatherArr[0].tempMin }}</view>
      <view>{{ weatherArr[0].tempMax }}</view>
      <view>{{ targetArr[0] }}</view>
    </view>
    <view>明日天气</view>
    <view v-if="weatherArr.length > 0">
      <view>{{ weatherArr[1].fxDate }}</view>
      <view>{{ weatherArr[1].textDay }}</view>
      <view>{{ weatherArr[1].tempMin }}</view>
      <view>{{ weatherArr[1].tempMax }}</view>
      <view>{{ targetArr[1] }}</view>
    </view>
    <button @click="showWeather()">click me</button>
  </view>
</template>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
