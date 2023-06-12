<script setup lang="ts">
  import { ref } from 'vue';
  const teachPlan = ref('');
  const createTeachPlan = () => {
    teachPlan.value = '教案内容';
  };
</script>

<template>
  <view class="teach-plan-pages">
    <input v-if="!teachPlan" placeholder="请输入课程名称" />
    <view v-else>{{ teachPlan }}</view>
    <button @click="createTeachPlan">生成教案</button>
  </view>
</template>

<style>
  .teach-plan-pages {
    width: 100%;
    height: 100vh;
  }
</style>
