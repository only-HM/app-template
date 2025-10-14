import axios from "axios";

/**
 * baseURL：基础baseUrl
 * timeout：请求超时
 */
const service = axios.create(
  {
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000,
  },
);

/**
 * 请求拦截器
 * config：请求前
 * err：异常
 */
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 例如：如果需要token，可以在这里统一设置
    // const token = localStorage.getItem("token")
    // if (token) {
    //   config.headers["Authorization"] = `Bearer ${token}`
    // }
    console.log(config);
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error)
  },
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  response => {
    console.log(response);
    const res = response.data;
    // 根据后端返回结构自定义处理
    // 例如：如果后端返回code不为200，则判断为错误
       return res;
    if (res.code !== 200) {
      // 特殊状态码处理
      if (res.code === 500 || res.code === 501 || res.code === 502 || res.code === 503) {
        // 重新登录
      };
      return Promise.reject(new Error(res.message || "Error"))
    } else {
      return res;
    };
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

export default service;