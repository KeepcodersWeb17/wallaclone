import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getTags } from "../store/selectors/selectors";
import { getAllTags } from "../store/actions/creators";
import CloseIcon from "./icons/Close";

interface Props extends React.ComponentProps<"dialog"> {
  handleClose: () => void;
  handleSelected: (event: React.MouseEvent) => void;
}

const TagsDiaglog = ({ handleClose, handleSelected, ref }: Props) => {
  const tags = useAppSelector(getTags);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  return (
    <dialog ref={ref} className="h-full w-full">
      <button
        className="absolute top-5 right-5 cursor-pointer"
        onClick={handleClose}
      >
        <CloseIcon />
      </button>
      <h2 className="">Categories</h2>
      <ul className="flex w-full flex-col gap-5 text-center">
        {tags.map((tag) => (
          <li
            id={tag.id}
            key={tag.id}
            className="cursor-pointer rounded hover:bg-gray-100"
            onClick={handleSelected}
          >
            {tag.name}
          </li>
        ))}
      </ul>
      <button className="cursor-pointer" onClick={handleClose}>
        Confirm
      </button>
    </dialog>
  );
};

export default TagsDiaglog;
