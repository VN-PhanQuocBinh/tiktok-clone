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
   

   
   // if (response.status !== 200) {
   //    throw Error("Network response was not ok! - LOG IN")
   // }

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


export const getComments = async (path, option = {}) => {
   const response = await request.get(path, {}, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - GET COMMENTS")
   }

   return response.data
}

export const likeComment = async (path, option = {}) => {
   const response = await request.post(path, {}, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - LIKE COMMENT")
   }

   return response.data
}

export const unlikeComment = async (path, option = {}) => {
   const response = await request.post(path, {}, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - LIKE COMMENT")
   }

   return response.data
}

export const createComment = async (path, data = {}, config = {}) => {
   const response = await request.post(path, data, config)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - CREATE COMMENT")
   }

   return response.data
}

export const deleteComment = async (path, config = {}) => {
   const response = await request.delete(path, config)
   

   if (![200, 204].includes(response.status)) {
      throw Error("Network response was not ok! - DELETE COMMENT")
   }

   return response.data
}

export const likeVideo = async (path, option = {}) => {
   const response = await request.post(path, {}, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - LIKE VIDEO")
   }

   return response.data
}

export const unlikeVideo = async (path, option = {}) => {
   const response = await request.post(path, {}, option)

   if (response.status !== 200) {
      throw Error("Network response was not ok! - LIKE VIDEO")
   }

   return response.data
}

export default request

