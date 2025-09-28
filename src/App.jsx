// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AgeVerificationModal from "./components/ageverification";
import UnderageRestriction from "./components/underageverification";
import Captcha from "./components/Captcha";
import MainApp from "./components/MainApp";
import OneToOneChat from "./components/OneToOneChat";

function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [underage, setUnderage] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // 1v1 chat state
  const [currentRoom, setCurrentRoom] = useState("");
  const [roomName, setRoomName] = useState("");

  // Dummy notification function (replace with your toast or alert system)
  const showNotification = (message, type = "info") => {
    console.log(type, message);
  };

  useEffect(() => {
    const storedAge = localStorage.getItem("ageVerified");
    if (storedAge === "true") setAgeVerified(true);
    if (storedAge === "underage") setUnderage(true);
  }, []);

  if (underage) return <UnderageRestriction />;

  if (!ageVerified)
    return (
      <AgeVerificationModal
        onVerified={() => {
          setAgeVerified(true);
          localStorage.setItem("ageVerified", "true");
        }}
        onUnderage={() => {
          setUnderage(true);
          localStorage.setItem("ageVerified", "underage");
        }}
      />
    );

  if (ageVerified && !captchaVerified)
    return <Captcha onVerified={() => setCaptchaVerified(true)} />;

  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route
        path="/one-to-one"
        element={
          <OneToOneChat
            showNotification={showNotification}
            roomNameSetter={setRoomName}
            currentRoomSetter={setCurrentRoom}
          />
        }
      />
    </Routes>
  );
}

export default App;
