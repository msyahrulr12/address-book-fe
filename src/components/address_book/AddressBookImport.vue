<script setup>
    import { ref } from 'vue'
    import axios from 'axios'
    import { useAddressBookStore } from '@/stores/addressBook';
    import router from '../../router'

    const data = ref({});

    function submitForm() {
        axios.defaults.headers.common['Content-Type'] = 'multipart/form-data';
        axios.post('/address-books/import', {
            'file': data.file
        })
        .then(function (res) {
            alert(res.data.message);
            router.push({ name: 'address_books_list' });
        })
        .catch(function (err) {
            console.log(err)
            var errors = err.response.data.errors;
            var message = "";

            for (let i = 0; i < errors.length; i++) {
                message += errors[i].message + "\n";
            }

            alert(message);
        });
    }

    function onFileChanged($event) {
        const target = $event.target;
        if (target && target.files) {
            data.file = target.files[0];
        }
    }
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-4">Form Import Address Book</h1>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submitForm()">
            <div class="mb-4">
                <label for="file" class="block text-gray-700 text-sm font-bold mb-2">Choose File:</label>
                <input type="file" id="file"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" accept=".csv"
                    @change="onFileChanged($event)">
            </div>
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Upload
            </button>
        </form>
    </div>
</template>