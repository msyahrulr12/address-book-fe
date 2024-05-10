import './assets/main.css'
import './assets/index.css'

import { ref, createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCryptojs from 'vue-cryptojs'
import axios from 'axios'
import App from './App.vue'
import router from './router'
import CryptoJS from 'crypto-js'

const url = ref(import.meta.env.VITE_API_URL)
const clientId = ref(import.meta.env.VITE_CLIENT_ID)
const secretKey = ref(import.meta.env.VITE_SECRET_KEY)
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueCryptojs)

function generateTimestamp() {
    const dateNow= new Date();
    const year = dateNow.getFullYear();
    const month = '0'+(dateNow.getMonth() + 1);
    const date = dateNow.getDate();
    const hour = dateNow.getHours();
    const minute = '0'+(dateNow.getMinutes());
    const second = dateNow.getSeconds();

    return year+''+month+''+date+''+hour+''+minute+''+second;
}

function generateSignature() {
    var timestamp = generateTimestamp();
    
    // generate signature
    var signature = CryptoJS.HmacSHA256(clientId.value+timestamp, secretKey.value).toString(CryptoJS.enc.Hex);
    signature = clientId.value+':'+signature;

    return signature;
}

function init() {
    // Generate Timestamp
    var timestamp = generateTimestamp();
    
    // GenerateSignature
    var signature = generateSignature();

    // Axios
    axios.defaults.baseURL = url.value;
    axios.defaults.headers.common['X-Signature'] = signature;
    axios.defaults.headers.common['Timestamp'] = timestamp;
}

init();

app.mount('#app')
