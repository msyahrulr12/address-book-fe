<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useAddressBookStore } from '@/stores/addressBook';
    import router from '../../router'

    const data = ref({});
    const id = ref(router.currentRoute.value.params.id);

    function getDataById() {
        axios
            .get('/address-books/'+id.value)
            .then(function (res) {
                data.value = res.data.data
                console.log(data.value);
            })
            .catch(function (err) {
                console.log(err);
            });
        // console.log(data.value)
    }

    function submitForm() {
        axios.put('/address-books/'+id.value, data.value)
        .then(function (res) {
            alert(res.data.message)
            router.push({ name: 'address_books_list' });
        })
        .catch(function (err) {
            var errors = err.response.data.errors;
            var message = "";

            for (let i = 0; i < errors.length; i++) {
                message += errors[i].message + "\n";
            }

            alert(message);
        });
    }

    function Init() {
        id.value = router.currentRoute.value.params.id;
        getDataById();
    }

    Init();
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">Form Edit Address Book</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitForm()">
            <div class="flex gap-5">
                <div class="mb-4 w-1/2">
                    <label for="code" class="block text-gray-700 text-sm font-bold mb-2">CODE:</label>
                    <input type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="code" placeholder="Code"
                        v-model="data.code">
                </div>
                <div class="mb-4 w-1/2">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">NAME:</label>
                    <input type="text"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" placeholder="Name"
                        v-model="data.name">
                </div>
            </div>
            <div class="flex gap-5">
                <div class="mb-4 w-1/2">
                    <label for="phone_number" class="block text-gray-700 text-sm font-bold mb-2">PHONE NUMBER:</label>
                    <div class="flex">
                        <div class="bg-slate-300 px-5 py-3 rounded-tl-md rounded-bl-md">
                            +62
                        </div>
                        <input type="number"
                            class="shadow appearance-none border rounded-tr-md rounded-br-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone_number" placeholder="Phone Number"
                            v-model="data.phone_number">
                    </div>
                </div>
                <div class="mb-4 w-1/2">
                    <label for="status" class="block text-gray-700 text-sm font-bold mb-2">STATUS:</label>
                    <div class="flex items-center mb-4">
                        <input type="radio" id="active" name="status" value="1"
                            class="form-radio h-4 w-4 text-blue-600"
                            v-model="data.status"
                            :checked="data.status == true">
                        <label for="active" class="ml-2">Active</label>
                    </div>
                    <div class="flex items-center">
                        <input type="radio" id="inactive" name="status" value="0"
                            class="form-radio h-4 w-4 text-red-600"
                            v-model="data.status"
                            :checked="data.status == false">
                        <label for="inactive" class="ml-2">Inactive</label>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                <label for="address" class="block text-gray-700 text-sm font-bold mb-2">ADDRESS:</label>
                <textarea
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="address" placeholder="Address"
                    v-model="data.address"></textarea>
            </div>
            <div class="mb-4">
                <label for="description" class="block text-gray-700 text-sm font-bold mb-2">DESCRIPTION:</label>
                <textarea
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description" placeholder="Description"
                    v-model="data.description"></textarea>
            </div>
            <div class="flex items-center justify-between">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>