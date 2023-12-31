import { useState } from "react";
import Chatmain from "./components/chatmain/Chatmain";
import { useEffect } from "react";
import { getCookies } from "./utils/APIs";
import Authenticate from "./components/authentication/Authentication";
import Chatleftbar from "./components/chatLeftSection/Chatleftbar";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userIdValue = getCookies("userId");
    if (userIdValue !== "null") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <div className="font-montserrat h-screen overflow-hidden">
          <Authenticate isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <div className="font-montserrat h-screen overflow-hidden flex">
          <Chatleftbar />
          <Chatmain />
        </div>
      </BrowserRouter>
    </>
  );
}
