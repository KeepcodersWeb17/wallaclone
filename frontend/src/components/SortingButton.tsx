import { useState } from "react";

const SortingButton = ({
  setSearchParams,
  queryParam
}: {
  setSearchParams: (queryParam: string) => void;
  queryParam: string;
}) => {
  const [param, setParam] = useState(queryParam);

  const handleClick = () => {
    setSearchParams(param);

    setParam((prevParam) =>
      prevParam.includes("-asc")
        ? prevParam.replace("-asc", "-desc")
        : prevParam.replace("-desc", "-asc")
    );
  };

  return (
    <button type="button" onClick={handleClick} className="uppercase">
      SORTING: {param}
    </button>
  );
};

export default SortingButton;
