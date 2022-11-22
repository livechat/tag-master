import config from "./config";
import axios from "axios";

const POST = "POST";

const { livechatAPI } = config;

const createApiRequest = (method, route, accessToken, data) => {
  return axios({
    method,
    url: livechatAPI + route,
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    data,
  }).catch(function (error) {
    console.error(error);
  });
};

const api = {
  fetchTags: (accessToken) =>
    createApiRequest(
      POST,
      "/v3.5/configuration/action/list_tags",
      accessToken,
      {}
    ),

  removeTag: (name, accessToken) =>
    createApiRequest(
      POST,
      "/v3.5/configuration/action/delete_tag",
      accessToken,
      {
        name,
      }
    ),

  createTag: (tag, accessToken) =>
    createApiRequest(
      POST,
      "/v3.5/configuration/action/create_tag",
      accessToken,
      {
        name: tag,
      }
    ),
};

export default api;
