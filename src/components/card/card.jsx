import { useState } from "react";
import PropTypes from "prop-types";
import "./card.css";

const Card = ({ propTitle, title, placeholder1, placeholder2, label1, label2 }) => {
  const [secondCardTitle, setSecondCardTitle] = useState(propTitle || "");

  const handleInputChange = (event) => {
    setSecondCardTitle(event.target.value);
  };

  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <h2 className="card-title-2">{secondCardTitle}</h2>
      <label>
        {label1}
        <input type="text" placeholder={placeholder1} onChange={handleInputChange} />
      </label>
      <label>
        {label2}
        <input type="text" placeholder={placeholder2} />
      </label>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder1: PropTypes.string,
  placeholder2: PropTypes.string,
  label1: PropTypes.string,
  label2: PropTypes.string,
  propTitle: PropTypes.string,
};

export default Card;
