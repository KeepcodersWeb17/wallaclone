import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Sale } from "../store/state/types";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createAdvert } from "../store/actions/creators";
import TagsDiaglog from "../components/TagsDialog";
import { getTags, getUi } from "../store/selectors/selectors";

const NewAdvertPage = () => {
  const tagsContainerRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tags = useAppSelector(getTags);
  const { error, loading } = useAppSelector(getUi);

  const handleCreateAdvert = async (event: React.FormEvent) => {
    event.preventDefault();

    const name =
      event.currentTarget.querySelector<HTMLInputElement>("#name")?.value;
    const price =
      event.currentTarget.querySelector<HTMLInputElement>("#price")?.value;
    const description =
      event.currentTarget.querySelector<HTMLInputElement>(
        "#description"
      )?.value;
    const image =
      event.currentTarget.querySelector<HTMLInputElement>("#image")?.value;

    const tagsArray = Array.from(
      dialogRef.current!.querySelectorAll("li[selected]")
    ).map((element) => element.getAttribute("id"));

    const saleElement = event.currentTarget.querySelector<HTMLInputElement>(
      "input[name='sale']:checked"
    );

    if (!name || !price || !tagsArray.length || !saleElement?.value) return;

    const tags = tagsArray.join("-").toLowerCase();

    const sale = saleElement.value as Sale;

    const advert = { name, price: +price, description, image, tags, sale };

    await dispatch(createAdvert(advert, navigate));
  };

  const handleOpenModal = async () => {
    dialogRef.current?.showModal();
    dialogRef.current?.focus();
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  const handleSelected = (event: React.MouseEvent) => {
    event.currentTarget.toggleAttribute("selected");
    event.currentTarget.classList.toggle("bg-yellow-200");

    const tagsSelected = Array.from(
      dialogRef.current!.querySelectorAll("li[selected]")
    );

    if (tagsSelected.length) {
      tagsContainerRef.current?.classList.remove("hidden");
    } else {
      tagsContainerRef.current?.classList.add("hidden");
    }

    const selectedTag = tagsContainerRef.current?.querySelector(
      `li[title="${event.currentTarget.textContent}"]`
    );

    selectedTag?.classList.toggle("hidden");
  };

  return (
    <>
      <TagsDiaglog
        ref={dialogRef}
        handleClose={handleClose}
        handleSelected={handleSelected}
      />
      <h2 className="mb-5">New Advert</h2>
      <form
        onSubmit={handleCreateAdvert}
        className="mx-auto flex max-w-3xl flex-col justify-center gap-5"
      >
        <div>
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            id="name"
            minLength={3}
            required
            placeholder="Name of the advert"
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" rows={3}></textarea>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            required
            placeholder="Price of the advert"
            min={0}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="text" id="image" placeholder="Image URL of the advert" />
        </div>
        <button
          className="cursor-pointer"
          type="button"
          onClick={handleOpenModal}
        >
          TAGS
        </button>
        <ul ref={tagsContainerRef} className="hidden">
          {tags.map((tag) => (
            <li
              title={tag.name}
              key={tag.id}
              className="hidden cursor-pointer rounded hover:bg-gray-100"
            >
              {tag.name}
            </li>
          ))}
        </ul>
        <fieldset className="flex justify-around">
          <div>
            <input
              className="cursor-pointer"
              type="radio"
              id="buy"
              name="sale"
              value="buy"
            />
            <label className="cursor-pointer" htmlFor="buy">
              Buy
            </label>
          </div>
          <div>
            <input
              className="cursor-pointer"
              type="radio"
              id="sell"
              name="sale"
              value="sell"
            />
            <label className="cursor-pointer" htmlFor="sell">
              Sell
            </label>
          </div>
        </fieldset>
        {error && <p className="text-red-500">{error.join(", ")}</p>}
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button
              className="cursor-pointer"
              type="submit"
              onSubmit={handleCreateAdvert}
            >
              Create
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default NewAdvertPage;
