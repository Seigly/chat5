import { useEffect, useState } from "react";
import './ageveri.css';


export default function AgeVerificationModal({ onVerified, onUnderage }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ageVerified");
    if (stored) {
      try {
        const verification = JSON.parse(stored);
        if (verification.verified && Date.now() < verification.expires) {
          onVerified();
          return;
        }
      } catch {
        localStorage.removeItem("ageVerified");
      }
    }
    setShow(true);
  }, []);

  const confirmAge = (isAdult) => {
    if (isAdult) {
      const verification = {
        verified: true,
        timestamp: Date.now(),
        expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      localStorage.setItem("ageVerified", JSON.stringify(verification));
      setShow(false);
      onVerified();
    } else {
      setShow(false);
      onUnderage();
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content age-verification">
        <div className="modal-header">
          <i className="fas fa-shield-alt"></i>
          <h2>Age Verification Required</h2>
        </div>
        <div className="modal-body">
          <p>This chat platform is intended for users 18 years and older.</p>
          <div className="age-buttons">
            <button
              className="age-btn confirm-btn"
              onClick={() => confirmAge(true)}
            >
              <i className="fas fa-check"></i> Yes, I am 18+
            </button>
            <button
              className="age-btn deny-btn"
              onClick={() => confirmAge(false)}
            >
              <i className="fas fa-times"></i> No, I am under 18
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

