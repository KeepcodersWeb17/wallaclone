import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Advert, AdvertUpdate, Sale } from "../store/state/types";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAdvert, getTags, getUi } from "../store/selectors/selectors";
import { updateAdvert } from "../store/actions/creators";
import TagsDiaglog from "../components/TagsDialog";

const UpdateAdvertPage = () => {
  const tagsContainerRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();
  const { advert } = useParams();

  const advertId = advert?.split("-")[1] || "";

  const dispatch = useAppDispatch();
  const advertDetails = useAppSelector(getAdvert(advertId)) as Advert;

  const tags = useAppSelector(getTags);
  const { loading } = useAppSelector(getUi);

  const checkedBuy = advertDetails?.sale === "buy";

  const previousTags = advertDetails?.tags.map((tag) => tag.name);

  const handleUpdateAdvert = async (event: React.FormEvent) => {
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

    const sale = event.currentTarget.querySelector<HTMLInputElement>(
      "input[name='sale']:checked"
    )?.value as Sale;

    const tags = tagsArray.join("-").toLowerCase();

    const advertToAPI: AdvertUpdate = {};

    if (name) advertToAPI.name = name;
    if (price) advertToAPI.price = +price;
    if (description) advertToAPI.description = description;
    if (image) advertToAPI.image = image;
    if (tags) advertToAPI.tags = tags;
    if (sale) advertToAPI.sale = sale;

    await dispatch(updateAdvert(advertToAPI, advert!.split("-")[1], navigate));
  };

  const handleOpenModal = async () => {
    dialogRef.current?.showModal();
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
      <div className="w-full sm:m-auto sm:w-7/8">
        <TagsDiaglog
          ref={dialogRef}
          handleClose={handleClose}
          handleSelected={handleSelected}
        />

        <button
          onClick={() => navigate(-1)}
          className="mb-6 cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          ← Go back
        </button>

        <h2 className="mb-6 text-xl font-bold text-black md:text-2xl">
          Update Advert
        </h2>

        <form
          onSubmit={handleUpdateAdvert}
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
              defaultValue={advertDetails.name}
              required
              minLength={3}
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
              defaultValue={advertDetails.description}
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
              defaultValue={advertDetails.price}
              required
              min={0}
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
              defaultValue={advertDetails.image}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
          </div>
          {/* Previous Tags */}
          {previousTags.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm text-black">Previous Tags</p>
              <ul className="flex flex-wrap gap-2">
                {previousTags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-900"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Select Tags */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={handleOpenModal}
              className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-500 transition duration-150 hover:bg-black hover:text-white active:scale-95"
            >
              Select Tags
            </button>
            <ul ref={tagsContainerRef} className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  id={tag.id}
                  title={tag.name}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-900"
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Sale Type */}
          <fieldset className="flex justify-center space-x-4">
            {["buy", "sell"].map((val) => (
              <label key={val} className="cursor-pointer">
                <input
                  type="radio"
                  name="sale"
                  value={val}
                  defaultChecked={val === (checkedBuy ? "buy" : "sell")}
                  className="peer sr-only"
                />
                <div
                  className={`rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-500 transition peer-checked:border-black peer-checked:bg-black peer-checked:text-white`}
                >
                  {val.charAt(0).toUpperCase() + val.slice(1)}
                </div>
              </label>
            ))}
          </fieldset>
          {/* Feedback */}
          {loading ? (
            <p className="w-full transform cursor-pointer rounded-lg border border-gray-400 bg-black py-2.5 text-center text-xs text-white transition duration-150 active:scale-99 sm:text-sm">
              Loading...
            </p>
          ) : (
            <button
              className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-black hover:text-white active:scale-95"
              type="submit"
            >
              Update
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateAdvertPage;
