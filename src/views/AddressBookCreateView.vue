<script setup>
  import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
  import { ref, computed, toRef } from 'vue'
  import axios from 'axios';
  import { inject } from 'vue'
  import CryptoJS from 'crypto-js'
  import AddressBookCreate from '@/components/address_book/AddressBookCreate.vue';
  import AddressBookList from '@/components/address_book/AddressBookList.vue';
  import { useAddressBookStore } from '@/stores/addressBook';
  import AddressBookView from '../views/AddressBookView.vue'

  const datas = ref([])
  const store = useAddressBookStore();

</script>

<template>
  <main>
    <AddressBookView />
    <AddressBookCreate />
  </main>
</template>

<style>

</style>
