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
    <dialog
      ref={ref}
      className="absolute top-1/2 left-1/2 z-200 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-5 shadow-lg"
    >
      <div className="flex w-full flex-col items-center justify-between gap-4">
        <div className="flex w-full flex-row items-center justify-between">
          <h3 className="text-lg leading-10 font-bold">Categories</h3>
          <button className="cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </button>
        </div>

        <ul className="flex w-full flex-col gap-1 text-center">
          {tags.map((tag) => (
            <li
              id={tag.id}
              key={tag.id}
              className="cursor-pointer rounded leading-8 capitalize hover:bg-gray-100"
              onClick={handleSelected}
            >
              {tag.name}
            </li>
          ))}
        </ul>

        <button
          className="w-full cursor-pointer rounded-lg border border-gray-400 px-5 py-1.5 text-xs text-gray-400 hover:bg-black hover:text-white"
          onClick={handleClose}
        >
          Confirm
        </button>
      </div>
    </dialog>
  );
};

export default TagsDiaglog;
