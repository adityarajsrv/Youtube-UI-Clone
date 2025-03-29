/* eslint-disable react/prop-types */
import "./customAlert.css";

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert-overlay">
      <div className="custom-alert-box">
        <p className="custom-alert-message">{message}</p>
        <button className="custom-alert-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
