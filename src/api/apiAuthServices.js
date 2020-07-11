import axios from 'axios'

const authClient = axios.create({
  baseURL: '//localhost:4000',
  headers: {
    withCredentials: true
  }
})

export default {
  //REGISTER NEW USER
  userRegister(formData) {
    return authClient.post('/register', formData)
  },
  //USER LOGIN
  userLogin(formData) {
    return authClient.post('/login', formData)
  }
}
