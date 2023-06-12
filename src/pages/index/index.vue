<script setup lang="ts">
  import { ref, type Ref, onMounted } from 'vue';
  import { UseRequest } from '@/composables/UseRequest';
  import { weatherHeader } from '@/config/config';
  import 'qweather-icons/font/qweather-icons.css';

  interface DailyWeather {
    textDay: string;
    tempMin: number;
    tempMax: number;
    iconDay: string;
    precip: number;
  }
  interface TempNow {
    temp: string;
    text: string;
    obsTime: string;
  }

  const weatherArr: Ref<DailyWeather[]> = ref([]);
  const suggestion: Ref<string[]> = ref([]);
  const tempNow: Ref<TempNow> = ref({} as TempNow);
  const weatherRecent: Ref<string> = ref('');

  onMounted(() => {
    Promise.all([
      UseRequest('https://devapi.qweather.com/v7/weather/3d', 'GET', weatherHeader),
      UseRequest('https://devapi.qweather.com/v7/indices/3d', 'GET', { type: 3, ...weatherHeader }),
      UseRequest('https://devapi.qweather.com/v7/weather/now', 'GET', weatherHeader),
      UseRequest('https://devapi.qweather.com/v7/minutely/5m', 'GET', { ...weatherHeader, location: '108.87,34.21' }),
    ])
      .then(([weatherRes, suggestionRes, nowRes, recentRes]) => {
        weatherArr.value = (weatherRes as any).daily;
        suggestion.value = (suggestionRes as any).daily.map((item: any) => {
          return item.text;
        });

        const { temp, text, obsTime } = (nowRes as any).now;
        tempNow.value = {
          temp,
          text,
          obsTime,
        };
        weatherRecent.value = (recentRes as any).summary;
      })
      .catch(err => {
        console.log(err);
      });
  });
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ new Date().getMonth() + 1 + '月' + new Date().getDate() + '日' }}</text>
    </view>
    <view v-if="tempNow.temp"> 当前：{{ tempNow.temp }}度 </view>
    <view v-if="weatherRecent">{{ weatherRecent }}</view>
    <block v-if="weatherArr.length > 0 && suggestion.length > 0">
      <view v-for="(_, index) in 2" :key="index">
        <view>{{ index === 0 ? '今日' : '明日' }}</view>
        <view
          >{{ weatherArr[index].textDay }}
          <text :class="`qi-${weatherArr[index].iconDay}`"></text>
        </view>
        <view>{{ weatherArr[index].tempMin }} ～ {{ weatherArr[index].tempMax }}度</view>
        <view>{{ suggestion[index] }} {{ weatherArr[index].precip > 0 ? '可能有雨，记得带伞喔' : '' }}</view>
      </view>
    </block>
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
