import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { AdvertUpdate, Sale } from "../store/state/types";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAdvert, getTags, getUi } from "../store/selectors/selectors";
import {
  getAdvert as getAdvertAction,
  updateAdvert
} from "../store/actions/creators";
import TagsDiaglog from "../components/TagsDialog";

const UpdateAdvertPage = () => {
  const tagsContainerRef = useRef<HTMLUListElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();
  const { advert } = useParams();

  const dispatch = useAppDispatch();
  const advertDetails = useAppSelector(getAdvert);

  const tags = useAppSelector(getTags);
  const { error, loading } = useAppSelector(getUi);

  useEffect(() => {
    if (!advert || !advert.includes("-")) {
      navigate("/404");
      return;
    }
    dispatch(getAdvertAction(advert.split("-")[1]));
  }, [advert, dispatch, navigate]);

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
      <TagsDiaglog
        ref={dialogRef}
        handleClose={handleClose}
        handleSelected={handleSelected}
      />
      <h2 className="mb-5">New Advert</h2>
      <form
        onSubmit={handleUpdateAdvert}
        className="mx-auto flex max-w-3xl flex-col justify-center gap-5"
      >
        <div>
          <label htmlFor="name"> Name</label>
          <input
            type="text"
            id="name"
            minLength={3}
            required
            defaultValue={advertDetails?.name}
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
            defaultValue={advertDetails?.price}
            min={0}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="text" id="image" defaultValue={advertDetails?.image} />
        </div>
        <div>
          <h3>PREVIOUS TAGS</h3>
          <ul>{previousTags?.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </div>
        <div>
          <button
            className="cursor-pointer"
            type="button"
            onClick={handleOpenModal}
          >
            UPDATED TAGS
          </button>
          <ul ref={tagsContainerRef} className="hidden">
            {tags.map((tag) => (
              <li title={tag.name} key={tag.id} className="hidden">
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
        <fieldset className="flex justify-around">
          <div>
            <input
              className="cursor-pointer"
              type="radio"
              id="buy"
              name="sale"
              value="buy"
              defaultChecked={checkedBuy}
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
              defaultChecked={!checkedBuy}
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
              onSubmit={handleUpdateAdvert}
            >
              Update
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default UpdateAdvertPage;
