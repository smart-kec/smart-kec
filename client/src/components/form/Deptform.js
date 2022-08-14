import "./Deptform.css";
import { useState } from "react";
const Deptform = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label className="dept-label">{label}</label>
      <input
        className="dept-input"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="dept-span">{errorMessage}</span>
    </div>
  );
};

export default Deptform;
