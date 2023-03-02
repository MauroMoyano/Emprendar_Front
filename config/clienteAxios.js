import axios from 'axios'


const clienteAxios = axios.create({
    baseURL: 'http://localhost:3001'
})

export default clienteAxios