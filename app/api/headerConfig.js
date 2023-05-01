// import {Token} from "./token";
//const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcmlvbSIsImRhc2giOiJkZmFzZGYzMnN3c3dyZmFmZGZkd2VlIiwidXNlcl9pZCI6IjY0NGY3ZDg3MjIwNWZmZDU0ODhjYjI1ZiIsInJvbGUiOiJjcmVhdGVyIiwiZXhwIjoxNjgzMDE4OTIwfQ.9CFfPTLAGcdrqT23t5SOMErf5EHkXgx_D04BUlbBqIk';
import { getLocaleData } from "../../service/authService";

const TOKEN = getLocaleData("token");
const HeaderAPI = () => {
  return { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` };
};
export default HeaderAPI;
