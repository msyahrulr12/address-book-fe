<script setup>
  import { ref } from 'vue'
  import { useAddressBookStore } from '@/stores/addressBook';
  import AddressBookView from '../views/AddressBookView.vue'
  import AddressBookImport from '@/components/address_book/AddressBookImport.vue';

  const datas = ref([])
  const store = useAddressBookStore();

</script>

<template>
  <main>
    <AddressBookView />
    <AddressBookImport />
  </main>
</template>

<style>

</style>
