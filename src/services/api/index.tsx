import axios from 'axios'

const urlBase = 'https://projetos-fulltech-api.vercel.app'

const Api = axios.create({
	baseURL: urlBase,
})

export { urlBase, Api }
