/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import Mic from "./Mic";
import "./navbar.css";
import { RiMicFill, RiSearchLine } from "@remixicon/react";

const Navbar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [showMicAlert, setShowMicAlert] = useState(false);
  const recognitionRef = useRef(null); // Persistent reference for SpeechRecognition

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const query = encodeURIComponent(searchQuery.trim());
      window.location.href = `https://www.youtube.com/results?search_query=${query}`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const startVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    if (!recognitionRef.current) {
      // Initialize SpeechRecognition only once
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setShowMicAlert(true); // Show the mic alert when recognition starts
        console.log("Speech recognition started");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized speech:", transcript);
        setSearchQuery((prev) => prev + " " + transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended");
        // Do not hide the mic alert here, leave it open until the user clicks stop
      };

      recognitionRef.current = recognition; // Save the instance
    }

    recognitionRef.current.start(); // Start listening
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop listening
    }
    setIsListening(false);
    setShowMicAlert(false); // Close the mic alert only when the user clicks "Stop Listening"
  };

  return (
    <div className="nav">
      <div className="sidebar" onClick={toggleSidebar}>
        <img src="/assets/burger-menu.png" alt="sidebar" className="burger-menu" />
      </div>
      <div className="logo">
        <img src="/assets/logo.png" alt="Logo" className="logo-image" />
        <h1>
          YouTube<sup className="superscript">IN</sup>
        </h1>
      </div>
      <div className="search-container">
        <input
          type="text"
          id="search"
          placeholder="Search"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={handleSearch}>
          <RiSearchLine className="search-icon" />
        </button>
      </div>
      <div className="mic">
        <button onClick={startVoiceSearch} className="mic-button">
          <RiMicFill className="mic-icon" />
        </button>
      </div>
      <div className="profile">
        <img src="/assets/notification-bell.png" alt="notification" className="notification-icon" />
        <img src="/assets/profile.png" alt="profile" className="profile-icon" />
      </div>
      {/* Render the Mic component if showMicAlert is true */}
      {showMicAlert && <Mic isListening={isListening} onClose={stopListening} />}
    </div>
  );
};

export default Navbar;
