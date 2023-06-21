import axios from "axios";
import * as helper from "./serviceHelpers";
import logger from "sabio-debug";

const endpoint = `${helper.API_HOST_PREFIX}/api/users`;
const _logger = logger.extend("App");

let { REACT_APP_VERBOSE: isVerbose } = process.env;
isVerbose = isVerbose === "true" ? true : false;

const login = (payload) => {
    const config = {
        method: "POST",
        url: `${endpoint}/login`,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onLogInSuccess).catch(onErrorResponse);
};

const confirm = (token) => {
    if (token === null) return false;
    const config = {
        method: "POST",
        url: `${endpoint}/confirm/${token}`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(onLogInSuccess).catch(onErrorResponse);
};

const onLogInSuccess = (response) => {
    if (isVerbose) {
        _logger("Success for", {
            url: response.config.url,
            method: response.config.method,
        });
    }
    return response;
};

const logout = () => {
    const config = {
        method: "GET",
        url: `${endpoint}/logout`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const add = (payload) => {
    const config = {
        method: "POST",
        url: endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getCurrent = () => {
    const config = {
        method: "GET",
        url: `${endpoint}/current`,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const getAllBaseUsers = () => {
    const config = {
        method: "GET",
        url: endpoint,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
    };
    return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const onErrorResponse = (response) => {
    _logger("Error Response for", {
        url: response.config.url,
        method: response.config.method,
    });

    return Promise.reject(response);
};

const updateEmail = (payload) =>{
  const config = {
    method: "PUT",
    url: `${endpoint}/email`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updatePassword = (payload) =>{
  const config = {
    method: "PUT",
    url: `${endpoint}/password`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export { add, logout, login, getCurrent, getAllBaseUsers, confirm, updateEmail, updatePassword };
