import axios from 'axios'

export const instance = axios.create(
  {
    baseURL: "http://localhost:5000/",
    headers: {
      'Content-Type': 'application/json',
    },
  }
)

export const setAuthToken = token => {
  if (token) {
    //applying token
    instance.defaults.headers.Authorization = `Bearer ${token}`
  } else {
    //deleting the token from header
    delete instance.defaults.headers.common['Authorization']
  }
 }

export const auth = {
  login: body => instance.post('/login', body),
  signup: body => instance.post('/signup', body)
}

export const post = {
  createPost: body => instance.post('/post', body),
  getPostsByUser: user => instance.get('/user/' + user + '/post')
}