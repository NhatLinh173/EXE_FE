import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../assets/css/ChatBox.css"; // Import CSS file

const ChatBox = () => {
  const [showChatBox, setShowChatBox] = useState(true);

  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  return (
    <>
      {showChatBox && (
        <div className="chat-box">
          <div className="chat-header">
            <h3>Hộp trò chuyện</h3>
            <button className="close-btn" onClick={toggleChatBox}>
              <FontAwesomeIcon icon={faTimes} style={{ color: "#fff" }} />
            </button>
          </div>
          <div className="chat-body"></div>
          <div className="chat-footer">
            <input type="text" placeholder="Nhập tin nhắn..." />
            <button>Gửi</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
