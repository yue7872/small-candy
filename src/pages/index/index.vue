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
  }
  interface TempNow {
    temp: string;
    text: string;
    obsTime: string;
  }
  const title = ref('candy');
  const weatherArr: Ref<DailyWeather[]> = ref([]);
  const suggestion: Ref<string[]> = ref([]);
  const tempNow: Ref<TempNow> = ref({} as TempNow);

  onMounted(() => {
    Promise.all([
      UseRequest('https://devapi.qweather.com/v7/weather/3d', 'GET', weatherHeader),
      UseRequest('https://devapi.qweather.com/v7/indices/3d', 'GET', { type: 3, ...weatherHeader }),
      UseRequest('https://devapi.qweather.com/v7/weather/now', 'GET', weatherHeader),
    ]).then((values: any) => {
      weatherArr.value = values[0].daily;
      suggestion.value = [values[1].daily[0].text, values[1].daily[1].text];
      tempNow.value = { temp: values[2].now.temp, text: values[2].now.text, obsTime: values[2].now.obsTime };
      console.log(values);
    });
  });
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view v-if="tempNow.temp"
      >{{
        tempNow.obsTime
          .replace(/\d{4}-/, '')
          .replace('T', ' ')
          .replace('+08:00', '')
      }}
      当前：{{ tempNow.temp }}度</view
    >
    <block v-if="weatherArr.length > 0 && suggestion.length > 0">
      <view v-for="(_, index) in 2" :key="index">
        <view>{{ index === 0 ? '今日' : '明日' }}</view>
        <view
          >{{ weatherArr[index].textDay }}
          <text :class="`qi-${weatherArr[index].iconDay}`"></text>
        </view>
        <view>{{ weatherArr[index].tempMin }} ～ {{ weatherArr[index].tempMax }}度</view>
        <view>{{ suggestion[index] }}</view>
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
