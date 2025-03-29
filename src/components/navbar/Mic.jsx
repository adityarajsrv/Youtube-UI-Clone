/* eslint-disable react/prop-types */
import { RiMicFill } from "@remixicon/react";
import "./Mic.css";

const Mic = ({ isListening, onClose }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p className="custom-alert-message">
          {isListening ? "Listening..." : "Press the mic to start listening."}
        </p>
        <div className="mic-animation-container">
          <button className="mic-button-animated" disabled>
            <RiMicFill
              style={{
                width: "50px",
                height: "50px",
                color: "#ff5252",
                margin: "20px 10px 0px 5px"
              }}
              className={`mic-icon ${isListening ? "listening-animation" : ""}`}
            />
          </button>
        </div>
        <button className="custom-alert-button" onClick={onClose}>
          Stop Listening
        </button>
      </div>
    </div>
  );
};

export default Mic;
