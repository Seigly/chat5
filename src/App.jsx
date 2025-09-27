import { useState } from "react";
import AgeVerificationModal from "./components/ageverification";
import UnderageRestriction from "./components/underageverification";
import Captcha from "./components/Captcha";

function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [underage, setUnderage] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  if (underage) return <UnderageRestriction />;

  return (
    <>
      {!ageVerified && (
        <AgeVerificationModal
          onVerified={() => setAgeVerified(true)}
          onUnderage={() => setUnderage(true)}
        />
      )}

      {ageVerified && !captchaVerified && (
        <Captcha onVerified={() => setCaptchaVerified(true)} />
      )}

      {ageVerified && captchaVerified && (
        <div>
          <h1>🎉 Welcome to the App!</h1>
          <p>Main app content goes here...</p>
        </div>
      )}
    </>
  );
}

export default App;
