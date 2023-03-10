import axios from 'axios'


const clienteAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_APP_URL
})

export default clienteAxios