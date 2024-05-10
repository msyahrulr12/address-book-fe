import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAddressBookStore = defineStore('address_book', () => {
  const id = ref(0)
  function setId(value) {
    id.value = value
  }

  return { id, setId } 
})
