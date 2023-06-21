import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/lectures`;

const Add = (values) => {
  const config = {
    method: "POST",
    url: endpoint,
    crossdomain: true,
    data: values,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getLectures = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint}/paginated?PageIndex=${pageIndex}&PageSize=${pageSize}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getLecturesByCourseId = (courseId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/courseId/${courseId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const getSearchLectures = (pageIndex, pageSize, query) => {
  const config = {
    method: "GET",
    url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
const getLectureById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint}/${id}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const updateLecture = (updateId, editLectureData) => {
  const config = {
    method: "PUT",
    url: `${endpoint}/${updateId}`,
    data: editLectureData,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

const deleteLecture = (deleteId) => {
  const config = {
    method: "DELETE",
    url: `${endpoint}/${deleteId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };

  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};
export {Add, getLectures, getSearchLectures, getLectureById, updateLecture, deleteLecture, getLecturesByCourseId}