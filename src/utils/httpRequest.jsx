import axios from "axios";

const request = axios.create({
   baseURL: import.meta.env.VITE_BASE_URL,
})

export const get = async (path, option = {}) => {
   const response = await request.get(path, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok!")
   }

   return response.data
}

export const getUserSuggested = async (path, option = {}) => {
   const response = await request.get(path, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok!")
   }
   
   return response.data
}

export const getVideo = async (path, option = {})=> {
   const response = await request.get(path, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok!")
   }

   return response.data
}

export const register = async (path, option = {}) => {
   const response = await request.post(path, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - REGISTER")
   }

   return response
}

export const login = async (path, option = {}) => {
   const response = await request.post(path, option)

   // console.log(response);
   

   if (response.status !== 200) {
      throw Error("Network response was not ok! - LOG IN")
   }

   return response
}

export const getCurrentUser = async (path, option = {}) => {
   const response = await request.get(path, option)

   // console.log(response);

   if (response.status !== 200) {
      throw Error("Network response was not ok! - GET CURRENT USER")
   }

   return response
}

export const getUser = async (path, option = {}) => {
   const response = await request.get(path, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - GET USER")
   }

   return response.data
}


export const getUserVideo = async (path, option = {}) => {
   const response = await request.get(path, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - GET USER")
   }

   return response.data
}


export const getFollowingList = async (path, option = {}) => {
   const response = await request.get(path, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - GET FOLLOWING LIST")
   }

   return response.data
}

// 
// axios.post(url, data, config);
// 
export const follow = async (path, option = {}) => {
   const response = await request.post(path, {}, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - FOLLOW AN USER")
   }

   return response.data
}

export const unfollow = async (path, option = {}) => {
   const response = await request.post(path, {}, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - UNFOLLOW AN USER")
   }

   return response.data
}

export default request