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

export default request