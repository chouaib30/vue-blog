import axios from 'axios'
import NProgress from 'nprogress'

//Creating an instance of axios with a custom config.
const apiClient = axios.create({
  baseURL: '//localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

const authClient = axios.create({
  baseURL: '//localhost:4000',
  headers: {
    withCredentials: true
  }
})

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(response => {
  NProgress.done()
  return response
})

export default {
  //FETCH POSTS
  getPosts(perPage, page) {
    return apiClient.get('/posts?_limit=' + perPage + '&_page=' + page)
  },
  //FETCH SINGLE POST
  getPost(id) {
    return apiClient.get('/posts/' + id)
  },
  //REGISTER NEW USER
  userRegister(formData) {
    return authClient.post('/register', formData)
  },
  //USER LOGIN
  userLogin(formData) {
    return authClient.post('/login', formData)
  },
  //CREATE POST
  createPost(post) {
    return apiClient.post('/posts', post)
  }
}
