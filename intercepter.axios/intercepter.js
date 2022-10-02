import { getJwtToken, setUserCart,setUserIdCart, setUserName } from "@/utils/helpers";
import { toastError } from "@/utils/toast";
import axios from "axios";
import { store } from "../stores";
import router from "@/router";


const API_URL = "http://localhost:8081";

const requestUnauthorized = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

requestUnauthorized.interceptors.request.use(
  (request) => {
    //gui token author /authen len serve
    const token = getJwtToken();
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

requestUnauthorized.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config
    // nhan du lieu neu respon tra ve thanh cong
    if(response?.data?.user?.email && response?.data?.user?.id && response?.data?.user?.name){
      setUserCart(response.data.user.email)
      setUserIdCart(response.data.user.id)
      setUserName(response.data.user.name)
    }

    return response.data;
  },
  (error) => {

    // xet cac truong hop that bai,
    // neu token het han, tao ham set refesh token moi roi gui len de lay token khac
    if (
      error?.response?.data?.error_message?.includes("The Token has expired") ||
      error?.response?.status === 403
    ) {
      sessionStorage.removeItem("jwt");
      toastError("Session Expired");
      store.commit("CHECK_IS_LOGIN");
      // router.push(('/login'));  day ve trang login

    }
    return Promise.reject(error);
  }
);
export default requestUnauthorized;
