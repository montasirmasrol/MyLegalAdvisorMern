import axios from 'axios';

const axiosPublic = axios.create({
   baseURL: `${import.meta.env.VITE_AXIOS_API}`,
})


const useAxiosPublic = () => {

  return axiosPublic;
};

export default useAxiosPublic;