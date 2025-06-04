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