import React, { InputHTMLAttributes, memo } from "react";

type InputProps = InputHTMLAttributes<HTMLElement> & {
  label: string;
};

const Input: React.FC<InputProps> = memo(
  ({ label, ...props }) => {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text ">{label}</span>
        </div>
        <input
          type="text"
          aria-label={label}
          className="form-control"
          {...props}
        />
      </div>
    );
  },
  (preProps, nextProps) => {
    if (preProps.label !== nextProps.label) {
      return false;
    }
    if (preProps.value !== nextProps.value) {
      return false;
    }
    return true;
  },
);

export default Input;
