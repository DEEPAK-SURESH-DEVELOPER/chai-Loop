import axios from 'axios'

const axiousInstance = axios.create({
    baseURL: 'https://chai-loop-backend.onrender.com',
    timeout: 5000
})

axiousInstance.interceptors.response.use(
    (response) => {
        console.log('API response recieved!!!')
        return response
    },
    (error) => {
        if (error.response) {
            const status = error.response.status

            if (status === 401) {
                console.log('Unauthorized Access - Redirect to Login Page!')
            } else if (status === 404) {
                console.log('API not Found!')
            } else if (status === 500) {
                console.log('Something went wrong...Try again later')
            }
        } else if (error.request) {
            console.log('NO response from server')
        } else {
            console.log('Error:' + error.message)
        }

        return Promise.reject(error)
    }
)

export default axiousInstance