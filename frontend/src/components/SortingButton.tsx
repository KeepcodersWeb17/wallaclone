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
      className="w-1/3 cursor-pointer rounded-lg border border-gray-400 p-1 text-[10px] text-gray-500 hover:bg-black hover:text-white md:text-[0.85rem]"
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
