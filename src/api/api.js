import req from '@/utils/axios.js'
const getToken=(username,password)=>{
      return req.post('/login/login',{username,password})
    //
}
export{getToken}