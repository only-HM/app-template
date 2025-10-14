import request from "@/utils/request";

const baseUrl = "/user";

export function login(data) {
  return request({
    url: `${baseUrl}/login`,
    method: "post",
    data,
  });
};

export function getInfo(token) {
  return request({
    url: `${baseUrl}/info`,
    method: "get",
    params: { token },
  });
};

export function logout() {
  return request({
    url: `${baseUrl}/logout`,
    method: "post",
  });
};

export function query(userId) {
  return request({
    url: `${baseUrl}/query`,
    method: "get",
    params: { userId },
  });
};

export function add(data) {
  return request({
    url: `${baseUrl}/add`,
    method: "post",
    data,
  });
};

export function edit(data) {
  return request({
    url: `${baseUrl}/edit`,
    method: "post",
    data,
  });
};

export function djData() {
  return request({
    url: `/dengjieSj`,
    method: "get",
  });
};