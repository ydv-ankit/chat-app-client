import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatArea from "../chatArea/chatArea";
import Chatleftbar from "../chatLeftSection/Chatleftbar";
import ChatBlank from "../chatBlank/ChatBlank";
import {Profile} from "../profile/Profile";
import { useEffect, useState } from "react";
import { getCookies } from "../../utils/APIs";
import axios from "axios";

export default function Chatmain() {

  const [userData, setUserData] = useState(null);
  const [chatsList, setChatsList] = useState(null);

  const getUserProfileData = async () => {
    // fetch user data from backend using axios
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/users/id/${getCookies("userId")}`);
    setUserData(response.data.data);
  }

  const getChatsList = async () => {
    // fetch user data from backend using axios
    const response = await axios.get(`${import.meta.env.VITE_SERVER_URI}/chats`);
    setChatsList(response.data);
  }

  useEffect(() => {
    if (getCookies("userId") === 'null') {
      window.location.href = "/";
    }
    getUserProfileData();
    getChatsList();
  }, [])

  if(userData === null || chatsList === null) {
    return (
      <div className="">Loading...</div>
    )
  }

  return (
    <div className="w-screen flex h-full">
      <Chatleftbar userData={userData} chatsList={chatsList}/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatBlank />} />
          <Route path="/profile" element={<Profile userData={userData}/>} />
          <Route path="/:id" element={<ChatArea />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
