<script setup>
  import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
  import { ref, computed, toRef } from 'vue'
  import axios from 'axios';
  import { inject } from 'vue'
  import CryptoJS from 'crypto-js'
  import AddressBookCreate from '@/components/address_book/AddressBookCreate.vue';
  import AddressBookList from '@/components/address_book/AddressBookList.vue';
  import { useAddressBookStore } from '@/stores/addressBook';

  const datas = ref([])
  const store = useAddressBookStore();

</script>

<template>
  <main>
    <div class="bg-slate-700 text-white">
      <div class="flex justify-center py-5">
        <span class="text-2xl font-bold">Aplikasi Address Book</span>
      </div>
    </div>
    <div class="nav mt-6">
      <nav class="flex justify-center gap-8">
        <!-- <RouterLink to="/list" class="bg-cyan-200 py-3 px-4 rounded">List</RouterLink> -->
        <RouterLink to="/address-books/list" class="bg-cyan-200 py-3 px-4 rounded">Home</RouterLink>
        <RouterLink to="/address-books/create" class="bg-cyan-200 py-3 px-4 rounded">Create</RouterLink>
        <RouterLink to="/address-books/import" class="bg-cyan-200 py-3 px-4 rounded">Import</RouterLink>
      </nav>
    </div>
  </main>
</template>

<style>
  :root, body {
    height: 100%;
    width: 100%;
  }
</style>
