<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import { GenPlan } from '@/composables/GenPlan';

  const tempInput = ref('');
  const teachPlan = ref('');

  const lessonInput = (e: Event) => {
    tempInput.value = (e.target as HTMLInputElement).value;
  };

  const createTeachPlan = () => {
    teachPlan.value = '生成中，请稍后...';
    GenPlan(tempInput.value)
      .then((res: any) => {
        teachPlan.value = res.choices[0].message.content;
        console.log({ res, teachPlan });
      })
      .catch((err: any) => {
        teachPlan.value = '生成失败，请重试';
        console.log({ err, teachPlan });
      });
  };

  const resetTeachPlan = () => {
    teachPlan.value = '';
    console.log('重新输入');
  };
</script>

<template>
  <view class="teach-plan-pages">
    <input v-if="!teachPlan" placeholder="请输入课程名称" @input="lessonInput" />
    <view v-else>{{ teachPlan }}</view>
    <button @click="createTeachPlan" v-if="!teachPlan">生成教案</button>
    <view v-else>
      <button @click="resetTeachPlan">重新输入</button>
    </view>
  </view>
</template>

<style>
  .teach-plan-pages {
    width: 100%;
    height: 100vh;
  }
</style>
