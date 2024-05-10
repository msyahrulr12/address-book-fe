<script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import router from '../../router'
  import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/solid';
  
  const query = ref({})
  const datas = ref([]);
  const lastPage = ref(0);
  const currentPage = ref(1);
  const changePageNumber = ref(1);

  async function getData() {
    let urlParams = new URLSearchParams(query.value);
    if (urlParams.toString().length <= 0) {
      query.value = {
        per_page: 10,
        page: changePageNumber.value
      };

      router.push({ name: 'address_books_list', query: query.value });
    }

    urlParams = new URLSearchParams(query.value);

    let queryParams = urlParams.has('search') ? '?'+urlParams.toString() : '?'+urlParams.toString();

    await axios
      .get('/address-books'+queryParams)
      .then(function (res) {
        datas.value = res.data.data
        lastPage.value = res.data.data.last_page;
        currentPage.value = res.data.data.current_page;
      })
      .catch(function (err) {
        console.log(err);
      });

      console.log(query.value, currentPage.value, lastPage.value)
  }

  function checkQuery() {
    var httpQueries = location.search.substring(1);
    if (httpQueries.length > 0) {
      query.value = JSON.parse('{"' + decodeURI(httpQueries).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    }
  }

  function edit(id) {
    router.push({ name: 'address_books_edit', params: {id: id} })
  }

  function deleteData(id) {
    if (confirm('Apakah anda yakin ingin menghapus data ini?') === true) {
      axios
        .delete('/address-books/'+id)
        .then(function (res) {
          alert(res.data.message);
          Init();
        })
        .catch(function (err) {
          var errors = err.response.data.errors;
          var message = "";
  
          for (let i = 0; i < errors.length; i++) {
              message += errors[i].message + "\n";
          }
  
          alert(message);
        });
    } else {
      alert('Hapus data dibatalkan!');
    }
  }

  function changePage(page) {
    changePageNumber.value = page;
    query.value = {
      per_page: 10,
      page: changePageNumber.value
    };
    getData();
  }

  function nextPage() {
    if (currentPage.value == lastPage.value) {
      getData();
    } else {
      query.value.page = parseInt(query.value.page) + 1;
      getData();
      router.push({ name: 'address_books_list', query: query.value });
    }
  }

  function prevPage() {
    if (currentPage.value == 1) {
      getData();
    } else {
      query.value.page = parseInt(query.value.page) - 1;
      getData();
      router.push({ name: 'address_books_list', query: query.value });
    }
    
  }

  function search() {
    getData();
    router.push({ name: 'address_books_list', query: query.value });
  }

  function Init() {
    checkQuery();
    getData();
  }

  Init();
</script>

<template>
  <div class="py-10 px-12">
    <div class="text-2xl my-5 font-bold">List Address Book</div>
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-2xl font-bold mb-4">Cari Data</h1>
      <form class="flex items-center" @submit.prevent="search">
          <input type="text" placeholder="Search... (Only : code, name, address, phone number and description)"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              v-model="query.search">
          <button type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none focus:shadow-outline">
              Search
          </button>
      </form>
    </div>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <!-- <th scope="col" class="px-6 py-3">
                  ID
                </th> -->
                <th scope="col" class="px-6 py-3">
                  CODE
                </th>
                <th scope="col" class="px-6 py-3">
                  NAME
                </th>
                <th scope="col" class="px-6 py-3">
                  ADDRESS
                </th>
                <th scope="col" class="px-6 py-3">
                  PHONE_NUMBER
                </th>
                <th scope="col" class="px-6 py-3">
                  STATUS
                </th>
                <th scope="col" class="px-6 py-3">
                  DESCRIPTION
                </th>
                <th scope="col" class="px-6 py-3">
                  CREATED_AT
                </th>
                <th scope="col" class="px-6 py-3">
                  UPDATED_AT
                </th>
                <th scope="col" class="px-6 py-3">
                  ACTION
                </th>
              </tr>
          </thead>
          <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" 
                v-for="data in datas.data" 
                :key="data.id">
                  <!-- <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {{ iteration++ }}
                  </th> -->
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ data.code }}
                  </td>
                  <td class="px-6 py-4">
                    {{ data.name }}
                  </td>
                  <td class="px-6 py-4">
                    {{ data.address }}
                  </td>
                  <td class="px-6 py-4">
                    {{ data.phone_number }}
                  </td>
                  <td class="px-6 py-4">
                    {{ data.status }}
                  </td>
                  <td class="px-6 py-4">
                    {{ data.description }}
                  </td>
                  <td class="px-6 py-4">
                    {{ data.created_at }}
                  </td>
                  <td class="px-6 py-4">
                    {{ data.updated_at }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-5">
                      <button
                       @click="edit(data.id)">
                        <PencilSquareIcon class="size-6 text-yellow-500" />
                      </button>
                      <button
                       @click="deleteData(data.id)">
                        <TrashIcon class="size-6 text-red-500" />
                      </button>
                    </div>
                  </td>
              </tr>
          </tbody>
      </table>
    </div>
    <div>
    <ul class="flex">
      <li>
          <button @click="prevPage"
              :disabled="currentPage.value == 1"
              class="px-4 py-2 bg-gray-200 text-gray-700 rounded-l hover:bg-gray-300">Previous</button>
      </li>

      <li v-for="pageNumber in lastPage.value" :key="pageNumber">
          <button @click="changePage(pageNumber)"
              :class="{ 'bg-blue-500 text-white': currentPage.value === pageNumber, 'bg-gray-200 text-gray-700': currentPage.value !== pageNumber }"
              class="px-4 py-2 hover:bg-blue-500 hover:text-white">{{ pageNumber }}</button>
      </li>

      <li>
          <button
            @click="nextPage"
            :disabled="currentPage.value === 1 ? true : false"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-r hover:bg-gray-300">Next</button>
      </li>
    </ul>
    </div>
  </div>
</template>

<style>
    .pagination {
        display: flex;
        list-style-type: none;
        padding: 0;
    }

    .pagination li {
        margin-right: 5px;
    }

    .pagination li button {
        padding: 5px 10px;
        cursor: pointer;
        border: 1px solid #ddd;
        background-color: #fff;
    }

    .pagination li button:hover {
        background-color: #f3f3f3;
    }

    .pagination li.disabled button {
        cursor: not-allowed;
        color: #999;
    }

    .pagination li.active button {
        background-color: #007bff;
        color: #fff;
    }
</style>