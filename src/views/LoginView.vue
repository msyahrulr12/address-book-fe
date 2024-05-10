<script setup>
  import { ref, computed } from 'vue'

  const counter = ref(0);
</script>

<template>
  <main class="login-page border-2 p-6">
    <div class="left border-4">
      <div class="py-2 mt-2">
        <input type="email" name="email" placeholder="Email" class="border-4 py-12" style="background-color: aqua;">
      </div>
  
      <div class="w-1/12 mt-6">
        <input type="password" name="password" placeholder="Password" class="py-6 h-full">
      </div>
    </div>
    <div class="right">
      <img src="@/assets/images/women-logo.png" alt="">
    </div>
  </main>
</template>

<style>
  body {
    background-color: white;
  }

  .login-page {
    color: black;
  }
</style>
