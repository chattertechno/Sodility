import axios from "axios";
import { baseUrl  } from "../../../http/index";

export const getAllCreatorList = () => {
    var authOptions = {
        method: "GET",
        url: baseUrl + "/api/v1/creator/all"
    };
    return axios(authOptions)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error :", error);
        });
};