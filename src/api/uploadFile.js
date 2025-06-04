import request from "@/utils/request";

/**
 * 文件上传
 * @param {*} url 
 * @param {*} file 
 * @param {*} onUploadProgress 
 * @returns 
 */
export function uploadFile(url, file, onUploadProgress = null) {
  const formData = new FormData()
  formData.append("file", file)
  return request({
    url,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};