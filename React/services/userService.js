import axios from "axios";
import * as helper from "./serviceHelpers";
import logger from "monefi-debug";

const endpoint = `${helper.API_HOST_PREFIX}/api/users`;
const _logger = logger.extend("App");

let { REACT_APP_VERBOSE: isVerbose } = process.env;
isVerbose = isVerbose === "true" ? true : false;

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

export { getAllBaseUsers };
