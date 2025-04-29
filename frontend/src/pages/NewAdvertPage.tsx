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
      <div className="md:mx-auto md:max-w-4xl md:px-6">
        <TagsDiaglog
          ref={dialogRef}
          handleClose={handleClose}
          handleSelected={handleSelected}
        />

        <h2 className="mb-6 text-xl font-bold text-black md:text-2xl">
          New Advert
        </h2>

        <form
          onSubmit={handleCreateAdvert}
          className="space-y-6 rounded-lg bg-white p-4 shadow md:p-6"
        >
          {/* Name */}
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm text-black">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              minLength={3}
              required
              placeholder="Name of the advert"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label htmlFor="description" className="text-sm text-black">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              placeholder="Advert description"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label htmlFor="price" className="text-sm text-black">
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min={0}
              required
              placeholder="Price of the advert"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Image */}
          <div className="space-y-1">
            <label htmlFor="image" className="text-sm text-black">
              Image URL
            </label>
            <input
              id="image"
              name="image"
              type="text"
              placeholder="Image URL of the advert"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={handleOpenModal}
              className="cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-50"
            >
              Select Tags
            </button>
            <ul
              ref={tagsContainerRef}
              className="mt-2 flex hidden flex-wrap gap-2"
            >
              {tags.map((t) => (
                <li
                  key={t.id}
                  id={t.id}
                  title={t.name}
                  className="hidden rounded bg-gray-100 px-2 py-1 text-sm text-gray-900"
                >
                  {t.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Sale Type */}
          <fieldset className="flex space-x-6">
            <label className="flex items-center space-x-2 text-sm text-black">
              <input type="radio" name="sale" value="buy" defaultChecked />
              <span>Buy</span>
            </label>
            <label className="flex items-center space-x-2 text-sm text-black">
              <input type="radio" name="sale" value="sell" />
              <span>Sell</span>
            </label>
          </fieldset>

          {/* Feedback */}
          {error?.length && (
            <p className="text-sm text-red-600">{error.join(", ")}</p>
          )}
          {loading && <p className="text-sm text-black">Loading...</p>}

          {/* Submit */}
          {!loading && (
            <button
              type="submit"
              className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-gray-50 md:inline-block md:w-auto"
            >
              Create
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default NewAdvertPage;
