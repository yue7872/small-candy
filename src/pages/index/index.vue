<script setup lang="ts">
  import { ref, type Ref, onMounted } from 'vue';
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
  const targetArr: Ref<TargetWeather[]> = ref([]);
  const showWeather = ref(false);

  onMounted(() => {
    Promise.all([
      UseRequest('https://devapi.qweather.com/v7/weather/3d'),
      UseRequest('https://devapi.qweather.com/v7/indices/3d', 'GET', { type: 3 }),
    ]).then((values: any) => {
      weatherArr.value = values[0].daily;
      targetArr.value = values[1].daily;
      console.log(values);
      showWeather.value = true;
    });
  });
</script>

<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <block v-if="showWeather">
      <view v-for="(_, index) in 2" :key="index">
        <view>{{ (index === 0 ? '今日' : '明日') + weatherArr[index].fxDate.replace(/\d{4}-/, '') }}</view>
        <view>{{ weatherArr[index].textDay }}</view>
        <view>{{ weatherArr[index].tempMin }} ～ {{ weatherArr[index].tempMax }}度</view>
        <view>{{ targetArr[index].text }}</view>
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
