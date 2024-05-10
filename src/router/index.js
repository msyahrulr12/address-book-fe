import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AddressBookView from '../views/AddressBookView.vue'
import AddressBookCreateView from '@/views/AddressBookCreateView.vue'
import AddressBookListView from '@/views/AddressBookListView.vue'
import AddressBookUpdateView from '@/views/AddressBookUpdateView.vue'
import AddressBookImportView from '@/views/AddressBookImportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AddressBookView
    },
    {
      path: '/address-books/list',
      name: 'address_books_list',
      component: AddressBookListView
    },
    {
      path: '/address-books/create',
      name: 'address_books_create',
      component: AddressBookCreateView
    },
    {
      path: '/address-books/edit/:id',
      name: 'address_books_edit',
      component: AddressBookUpdateView
    },
    {
      path: '/address-books/import',
      name: 'address_books_import',
      component: AddressBookImportView
    },
  ]
})

export default router
