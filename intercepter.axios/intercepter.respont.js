import axios from 'axios'
import jwt_decode from 'jwt-decode'  //  jwt-decode (để decode jwt token của bạn) với câu lệnh sau: yarn add axios jwt-decode

const axiosClient = axios.create({
    baseURL: 'api url của bạn'
    headers: {
    'Content-Type': 'application/json',
    },
    withCredentials: true, // Để request gửi kèm cookie
})

axiosClient.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem('accessToken') 

  if(accessToken) {
    const decodedToken = jwt_decode(token)
    if(decodedToken.exp * 1000 < new Date().getTime()) {
      accessToken  = await refreshToken()
      localStorage.setItem('accessToken', accessToken )
      
    }
    config.headers.Authorization = 'Bearer ' + accessToken 
  }
  
  return config
}
// https://hukidev.vercel.app/blog/refresh-jwt-token-voi-axios-interceptors