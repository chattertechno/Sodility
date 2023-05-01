import axios from "axios";
import  HeaderAPI from "../headerConfig";

export const getAllContents = () => {
    var authOptions = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/creator/all/content",
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


export const getSupporterTransactions = (userId) => {
    var authOptions = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_BASE_URL + `/api/v1/creator/${userId}/supporters/record`,
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

