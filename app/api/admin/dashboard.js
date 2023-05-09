import axios from "axios";
import  HeaderAPI from "../headerConfig";
import { userService } from "../../../service/authService";
import { baseUrl  } from "../../../http/index";

export const getAllContents = () => {
    var authOptions = {
        method: "GET",
        url: baseUrl + "/api/v1/creator/all/content",
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
            if(error && error.response.status == 401){
                userService.logout()
            }
            console.log("error :", error);
        });
};


export const getSupporterTransactions = (userId) => {
    var authOptions = {
        method: "GET",
        url: baseUrl + `/api/v1/creator/${userId}/supporters/record`,
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


export const getAllContentsForSupporter = () => {
    var authOptions = {
        method: "GET",
        url: baseUrl + "/api/v1/content/all",
    };
    return axios(authOptions)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error :", error);
        });
};
