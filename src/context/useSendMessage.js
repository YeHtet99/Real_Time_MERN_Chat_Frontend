import React, { useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";
import { Cookies } from "react-cookie";
const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();
  const cookies = new Cookies();
  const userId = cookies.get('userId')
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5002/api/message/send/${selectedConversation._id}/${userId}`,
        { message }
      );
      setMessage([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
};

export default useSendMessage;
