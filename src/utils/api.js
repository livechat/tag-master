import config from "./config";
import axios from "axios";

const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";

const { cansAPI, livechatAPI } = config;

const createApiRequest = (method, route, accessToken, serverUrl, data) => {
  const headers = { Authorization: "Bearer " + accessToken };

  if (serverUrl === cansAPI) {
    headers["X-API-Version"] = "2";
  }

  if (serverUrl === livechatAPI) {
    headers["Content-Type"] = "application/json";
    headers["accept"] = "application/json";
  }

  return axios({
    method,
    url: serverUrl + route,
    headers,
    data,
  }).catch(function (error) {
    console.error(error);
  });
};

const api = {
  fetchCans: (accessToken) =>
    createApiRequest(GET, "/cans", accessToken, cansAPI),

  fetchTags: (accessToken) =>
    createApiRequest(
      POST,
      "/v3.5/configuration/action/list_tags",
      accessToken,
      livechatAPI,
      {}
    ),

  removeTag: (name, accessToken) =>
    createApiRequest(
      POST,
      "/v3.5/configuration/action/delete_tag",
      accessToken,
      livechatAPI,
      {
        name,
      }
    ),

  removeCan: (id, accessToken) =>
    createApiRequest(DELETE, "/cans", accessToken, cansAPI, {
      token: accessToken,
      id,
    }),

  createCan: (content, tags, accessToken) =>
    createApiRequest(POST, "/cans", accessToken, cansAPI, {
      data: {
        token: accessToken,
        tags,
        text: content,
      },
    }),

  createTag: (tag, accessToken) =>
    createApiRequest(
      POST,
      "/v3.5/configuration/action/create_tag",
      accessToken,
      livechatAPI,
      {
        name: tag,
      }
    ),

  updateCan: (id, content, tags, accessToken) =>
    createApiRequest(PUT, "/cans", accessToken, cansAPI, {
      data: {
        token: accessToken,
        tags,
        text: content,
        id,
      },
    }),
};

export default api;
