import axios from "axios";
import  HeaderAPI from "../headerConfig";
import { baseUrl  } from "../../../http/index";

export const getUserProfile = () => {
    var authOptions = {
        method: "GET",
        url: baseUrl + "/api/v1/user/profile/",
        headers: HeaderAPI(),
    };
    return axios(authOptions)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error :", error);
        });
};


export const getNotificationSetting = () => {
    var authOptions = {
        method: "GET",
        url: baseUrl + "/api/v1/creator/setting/notification/get",
        headers: HeaderAPI(),
    };
    return axios(authOptions)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error :", error);
        });
};

export const updateNotificationSetting = (data) => {
    var authOptions = {
        method: "PUT",
        url: baseUrl + "/api/v1/creator/setting/notification",
        headers: HeaderAPI(),
        data: data
    };
    return axios(authOptions)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error :", error);
        });
};

export const updateUserProfile = (data) => {
    console.log("datain  :", data);

    var authOptions = {
        method: "PUT",
        url: baseUrl + "/api/v1/user/update",
        headers: HeaderAPI(),
        data: data
    };
    return axios(authOptions)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error :", error);
        });
};