import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ShowUserAdverts = () => {
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      navigate(`/adverts/user/${inputValue}`);
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search for User adverts..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
      />
      <Link to={`/adverts/user/${inputValue}`}>SEARCH</Link>
    </>
  );
};
