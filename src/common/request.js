import axios from "axios";

/**
 * 请求地址
 */
const BASE_URL = `https://dev-service.hz.api-gw.cn/xaiservice`;
/**
 * Get请求
 * @param {String} module 模块名
 * @param {String} action 接口名
 * @param {*} data 请求数据
 * @returns
 */
export const http_get = (module, action, data) => {
  let headers = { "Content-Type": "application/x-www-form-urlencoded" };
  headers = { ...headers };
  const token = localStorage.getItem("token");
  // let headers = {};
  if (token) {
    headers = { ...headers, Authorization: token };
  }
  return new Promise((resolve, reject) => {
    if (action != "") {
      axios
        .get(`${BASE_URL}/${module}/${action}`, { params: data, headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    } else {
      axios
        .get(`${BASE_URL}/${module}`, { params: data, headers })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    }
  });
};
/**
 * Post请求
 * @param {String} module 模块名
 * @param {String} action 接口名
 * @param {*} data 请求数据
 * @returns
 */
export const http_post = (module, action, data) => {
  const token = localStorage.getItem("token");

  let headers = {};
  if (token) {
    headers = { ...headers, Authorization: token };
  }
  return new Promise((resolve, reject) => {
    if (action != "") {
      axios
        .post(`${BASE_URL}/${module}/${action}`, data, {
          headers,
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    } else {
      axios
        .post(`${BASE_URL}/${module}`, data, {
          headers,
        })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    }
  });
};

/**
 * 自定义地址
 */

export const http_all = (url, data) => {
  const token = localStorage.getItem("token");
  let headers = { "Content-Type": "multipart/form-data" };
  if (token) {
    headers = { ...headers, authorization: token };
  }
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, {
        headers,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

/**
 * 上传图片的方法
 */

export const file_post = (data) => {
  const token = localStorage.getItem("token");
  let headers = { "Content-Type": "multipart/form-data" };
  if (token) {
    headers = { ...headers, authorization: token };
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}/upload/img`, data, {
        headers,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
