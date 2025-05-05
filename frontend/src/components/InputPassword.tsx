import { useState } from "react";
import HidePasswordIcon from "./icons/Hide";
import UnhidePasswordIcon from "./icons/Unhide";

const InputPassword = ({ placeholder = "Enter your password" }) => {
  const [isHidden, setIsHidden] = useState(true);

  const toogleType = isHidden ? "password" : "text";

  const togglePasswordVisibility = () => {
    setIsHidden((prev) => !prev);
  };
  return (
    <>
      <input
        className="h-10 w-full rounded-lg border border-gray-400 p-1 px-4 placeholder:text-xs placeholder:text-gray-500 placeholder:italic focus:ring-1 focus:ring-gray-500 focus:outline-none sm:placeholder:text-sm"
        type={toogleType}
        name="password"
        minLength={6}
        placeholder={placeholder}
        required
      />
      {isHidden ? (
        <button
          className="absolute top-2 right-4 cursor-pointer"
          onClick={togglePasswordVisibility}
          type="button"
        >
          <HidePasswordIcon />
        </button>
      ) : (
        <button
          className="absolute top-2 right-4 cursor-pointer"
          onClick={togglePasswordVisibility}
          type="button"
        >
          <UnhidePasswordIcon />
        </button>
      )}
    </>
  );
};

export default InputPassword;
