import { useState } from "react";

const SortingButton = ({
  setSearchParams,
  queryParam
}: {
  setSearchParams: (queryParam: string) => void;
  queryParam: string;
}) => {
  const [param, setParam] = useState(queryParam);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSearchParams(param);

    event.currentTarget.setAttribute("selected", "true");

    setParam((prevParam) =>
      prevParam.includes("-asc")
        ? prevParam.replace("-asc", "-desc")
        : prevParam.replace("-desc", "-asc")
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="h-10 w-1/3 transform cursor-pointer rounded-lg border border-gray-400 p-1.5 px-4 text-xs text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-95"
    >
      {param === "date-asc" && "Newest first"}
      {param === "date-desc" && "Oldest first"}
      {param === "name-asc" && "A-Z"}
      {param === "name-desc" && "Z-A"}
      {param === "price-asc" && "Lowest price first"}
      {param === "price-desc" && "Highest price first"}
      {/* SORTING: {param} */}
    </button>
  );
};

export default SortingButton;
