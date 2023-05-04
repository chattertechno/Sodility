import axios from "axios";

export const getAllCreatorList = () => {
    var authOptions = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/creator/all"
    };
    return axios(authOptions)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("error :", error);
        });
};