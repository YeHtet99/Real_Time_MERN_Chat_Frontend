import React, { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";
import { Cookies } from "react-cookie";
import { url } from "../../url.js";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const cookies = new Cookies;
  const userId = cookies.get('userId')

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      const controller = new AbortController();
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `${url}/api/message/get/${selectedConversation._id}/${userId}`,
            { signal: controller.signal }
          );
          setMessage(res.data);
          setLoading(false);
        } catch (error) {
          console.log("Error in getting messages", error);
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);
  return { loading, messages };
};

export default useGetMessage;
