import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../statemanage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation } = useConversation();

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-slate-900 text-gray-300">
      {/* if no chat selected */}
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Chat header */}
          <Chatuser />

          {/* Messages should flex & scroll */}
          <div className="flex-1 overflow-y-auto">
            <Messages />
          </div>

          {/* Input field fixed bottom */}
          <Typesend />
        </>
      )}
    </div>
  );
}
export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-semibold text-xl">
              {authUser.user.fullname}
            </span>
            <br />
            No chat selected, please start conversation by selecting anyone to
            your contacts
          </h1>
        </div>
      </div>
    </>
  );
};
