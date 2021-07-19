import axios from "axios";
const endpoint = "http://localhost:9995/my-shop/api/v1";

const tokenEm = getCookie("em") !== "" ? JSON.parse(getCookie("em")).token : "";
const tokenCus = getCookie("cus") !== "" ? JSON.parse(getCookie("cus")).token : "";

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function getPublic(url) {
  var config = {
    method: "get",
    url: `${endpoint}/${url}`,
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios(config);
}

export function postPublic(url, body) {
  var config = {
    method: "post",
    url: `${endpoint}/${url}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  };
  return axios(config);
}

export function get(url) {
  var config = {
    method: "get",
    url: `${endpoint}/${url}`,
    headers: {
      Authorization: `Bearer ${tokenEm}`,
      "Content-Type": "application/json",
    },
  };
  return axios(config);
}

export function post(url, body) {
  var config = {
    method: "post",
    url: `${endpoint}/${url}`,
    headers: {
      Authorization: `Bearer ${tokenEm}`,
      "Content-Type": "application/json",
    },
    data: body,
  };
  return axios(config);
}

export function put(url, body) {
  var config = {
    method: "put",
    url: `${endpoint}/${url}`,
    headers: {
      Authorization: `Bearer ${tokenEm}`,
      "Content-Type": "application/json",
    },
    data: body,
  };
  return axios(config);
}

export function del(url) {
  var config = {
    method: "delete",
    url: `${endpoint}/${url}`,
    headers: {
      Authorization: `Bearer ${tokenEm}`,
      "Content-Type": "application/json",
    },
  };
  return axios(config);
}

export function getCus(url) {
  var config = {
    method: "get",
    url: `${endpoint}/${url}`,
    headers: {
      Authorization: `Bearer ${tokenCus}`,
      "Content-Type": "application/json",
    },
  };
  return axios(config);
}

export function postCus(url, body) {
  var config = {
    method: "post",
    url: `${endpoint}/${url}`,
    headers: {
      Authorization: `Bearer ${tokenCus}`,
      "Content-Type": "application/json",
    },
    data: body,
  };
  return axios(config);
}

export function putCus(url, body) {
  var config = {
    method: "put",
    url: `${endpoint}/${url}`,
    headers: {
      Authorization: `Bearer ${tokenCus}`,
      "Content-Type": "application/json",
    },
    data: body,
  };
  return axios(config);
}

export function delCus(url) {
  var config = {
    method: "delete",
    url: `${endpoint}/${url}`,
    headers: {
      Authorization: `Bearer ${tokenCus}`,
      "Content-Type": "application/json",
    },
  };
  return axios(config);
}
