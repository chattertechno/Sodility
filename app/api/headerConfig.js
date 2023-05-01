// import {Token} from "./token";
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiY2QwMTIzNCIsImRhc2giOiJkZmFzZGYzMnN3c3dyZmFmZGZmZHdlIiwidXNlcl9pZCI6IjY0NDJkMzQ0ZGNlZGVlZTg4ZmJkOTAyMCIsInJvbGUiOiJjcmVhdG9yIiwiZXhwIjoxNjgyODUzNzIxfQ.vR4JCyYOqblxG7LbTngFAFu0ArEBNkbc0boYrzHAgRI';

const HeaderAPI = () => {
  return { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` };
};
export default HeaderAPI;
