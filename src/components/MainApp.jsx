// src/components/MainApp.jsx
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { generateFunnyName } from "../utils/usernameGenerator";
import "./mainapp.css";

const MainApp = () => {
  const [username, setUsername] = useState("Anonymous");
  const [isEditing, setIsEditing] = useState(false);
  const [inputName, setInputName] = useState("");
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const menuRef = useRef(null);

  // 👉 replace with real login system later
  const isLoggedIn = true;

  useEffect(() => {
    let storedName = localStorage.getItem("hideout_username");
    if (!storedName) {
      storedName = generateFunnyName();
      localStorage.setItem("hideout_username", storedName);
    }
    setUsername(storedName);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowAccountMenu(false);
      }
    };

    if (showAccountMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAccountMenu]);

  const handleSave = () => {
    if (inputName.trim() !== "") {
      localStorage.setItem("hideout_username", inputName.trim());
      setUsername(inputName.trim());
    }
    setIsEditing(false);
    setShowAccountMenu(false);
  };

  return (
    <div id="main-app">
      {/* Header */}
      <div className="header">
        <div className="logo">Hideout</div>

        <div className="user-info">
          <img className="user-avatar" src="#" alt="Avatar" />

          {isEditing ? (
            <div className="edit-username">
              <input
                type="text"
                value={inputName}
                placeholder="Enter new name"
                onChange={(e) => setInputName(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <>
              <span className="user-name">{username}</span>

              {/* Account Corner */}
              <div
                className="account-corner"
                onClick={() => setShowAccountMenu(!showAccountMenu)}
              >
                ⚙️
              </div>

              {showAccountMenu && (
                <div className="account-menu" ref={menuRef}>
                  {isLoggedIn && (
                    <button
                      onClick={() => {
                        setInputName(username);
                        setIsEditing(true);
                        setShowAccountMenu(false);
                      }}
                    >
                      ✏️ Edit Username
                    </button>
                  )}
                  {isLoggedIn && <button>🔒 Logout</button>}
                  {!isLoggedIn && <button>🔑 Login</button>}
                </div>
              )}
            </>
          )}

          <div className="online-indicator">
            <i className="fas fa-circle"></i>
          </div>
        </div>
      </div>

      {/* Mode Selection */}
      <div id="mode-selection">
        <div className="welcome-text">
          <h1>Welcome to Hideout</h1>
          <p>
            Connect with people worldwide. Choose your chat experience and start
            meaningful conversations.
          </p>
          <div className="server-stats" id="server-stats">
            <span className="stat-item">
              <span id="online-count">0</span> online
            </span>
            <span className="stat-item">
              <span id="rooms-count">0</span> active rooms
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="mode-buttons">
          <Link to="/private" className="mode-card">
            <div className="mode-title">Private Room</div>
            <div className="mode-description">
              Create or join a private room with a custom code. Great for
              chatting with friends or small groups.
            </div>
          </Link>

          <Link to="/interest" className="mode-card">
            <div className="mode-title">Interest Based</div>
            <div className="mode-description">
              Find people who share your interests. Connect based on topics
              you're passionate about.
            </div>
          </Link>

          <Link to="/one-to-one" className="mode-card">
            <div className="mode-title">1 vs 1 Chat</div>
            <div className="mode-description">
              Get paired with one person for private conversation. Perfect for
              making new connections one-on-one.
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>Made with ❤️ for connecting people worldwide</p>
          <div className="footer-links">
            <Link to="/terms">Terms of Service</Link> |{" "}
            <Link to="/privacy">Privacy Policy</Link> |{" "}
            <Link to="/guidelines">Community Guidelines</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
