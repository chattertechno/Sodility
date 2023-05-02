const HeaderAPI = () => {
  try {
    const TOKEN = JSON.parse(localStorage.getItem("token"));
    return { Accept: "application/json", "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` };
  } catch (error) {
    console.log("error :", error);
  }
};
export default HeaderAPI;
