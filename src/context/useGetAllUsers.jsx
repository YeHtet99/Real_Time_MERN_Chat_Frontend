import React, { useEffect, useState } from "react";
import axios from "axios";
import { Cookies } from "react-cookie";
function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();
  const userId = cookies.get('userId')
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        // const token = Cookies.get("jwt");
        const response = await axios.get(`http://localhost:5002/api/user/allusers/${userId}`, {
          credentials: "include",
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        });
        setAllUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error in useGetAllUsers: " + error);
      }
    };
    getUsers();
  }, []);
  return [allUsers, loading];
}

export default useGetAllUsers;
