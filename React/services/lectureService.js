import axios from "axios";
import * as helper from "./serviceHelpers";

const endpoint = `${helper.API_HOST_PREFIX}/api/lectures`;

const getLecturesByCourseId = (courseId) => {
  const config = {
    method: "GET",
    url: `${endpoint}/courseId/${courseId}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(helper.onGlobalSuccess).catch(helper.onGlobalError);
};

export {getLecturesByCourseId}
