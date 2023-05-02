import axios from "axios";
import  HeaderAPI from "../headerConfig";

export const getUserProfile = () => {
    var authOptions = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/user/profile/",
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
        url: process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/creator/setting/notification/get",
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
    console.log("datain  :", data);

    var authOptions = {
        method: "PUT",
        url: process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/creator/setting/notification",
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