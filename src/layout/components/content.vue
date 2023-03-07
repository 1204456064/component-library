<template>
  <a-layout-content>
    <router-view v-slot="{ Component, route }">
      <transition name="fade-slide" mode="out-in">
        <!-- 缓存 -->
        <!-- <keep-alive> -->
        <component :is="Component" :key="route.fullPath"></component>
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </a-layout-content>
</template>
<script lang="ts" setup></script>
