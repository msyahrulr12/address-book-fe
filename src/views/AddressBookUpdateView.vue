<script setup>
  import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid'
  import { ref } from 'vue'
  import AddressBookCreate from '@/components/address_book/AddressBookCreate.vue';
  import AddressBookList from '@/components/address_book/AddressBookList.vue';
  import { useAddressBookStore } from '@/stores/addressBook';
  import AddressBookView from '../views/AddressBookView.vue'
import AddressBookUpdate from '@/components/address_book/AddressBookUpdate.vue';

  const datas = ref([])
  const store = useAddressBookStore();

</script>

<template>
  <main>
    <AddressBookView />
    <AddressBookUpdate />
  </main>
</template>

<style>

</style>
