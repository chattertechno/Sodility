import axios from "axios";
import  HeaderAPI from "../headerConfig";



export const getAllCreatorList = () => {
    var authOptions = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/creator/get",
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