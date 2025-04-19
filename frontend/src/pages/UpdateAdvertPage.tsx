import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Sale } from "../store/state/types";
import { useAppDispatch, useAppSelector } from "../store/store";
import { getAdvert } from "../store/selectors/selectors";
import {
  createAdvert,
  getAdvert as getAdvertAction
} from "../store/actions/creators";
import TagsDiaglog from "../components/TagsDialog";

const UpdateAdvertPage = () => {
  const workRef = useRef<HTMLParagraphElement>(null);
  const motorRef = useRef<HTMLParagraphElement>(null);
  const mobileRef = useRef<HTMLParagraphElement>(null);
  const lifestyleRef = useRef<HTMLParagraphElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const navigate = useNavigate();
  const { advert } = useParams();

  const dispatch = useAppDispatch();
  const advertDetails = useAppSelector(getAdvert);

  useEffect(() => {
    if (!advert || !advert.includes("-")) {
      navigate("/404");
      return;
    }
    dispatch(getAdvertAction(advert.split("-")[1]));
  }, [advert, dispatch, navigate]);

  const checkedBuy = advertDetails?.sale === "buy";

  const previousTags = advertDetails?.tags.map((tag) => tag.name);

  if (
    motorRef.current?.textContent &&
    previousTags.includes(motorRef.current.textContent)
  ) {
    motorRef.current.classList.remove("hidden");
  }
  if (
    workRef.current?.textContent &&
    previousTags.includes(workRef.current.textContent)
  ) {
    workRef.current.classList.remove("hidden");
  }
  if (
    mobileRef.current?.textContent &&
    previousTags.includes(mobileRef.current.textContent)
  ) {
    mobileRef.current.classList.remove("hidden");
  }
  if (
    lifestyleRef.current?.textContent &&
    previousTags.includes(lifestyleRef.current.textContent)
  ) {
    lifestyleRef.current.classList.remove("hidden");
  }

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
  };

  const handleClose = () => {
    dialogRef.current?.close();
  };

  const handleSelected = (event: React.MouseEvent) => {
    event.currentTarget.toggleAttribute("selected");
    event.currentTarget.classList.toggle("bg-yellow-200");
    if (motorRef.current?.textContent === event.currentTarget.textContent) {
      motorRef.current.classList.toggle("hidden");
    }
    if (workRef.current?.textContent === event.currentTarget.textContent) {
      workRef.current.classList.toggle("hidden");
    }
    if (mobileRef.current?.textContent === event.currentTarget.textContent) {
      mobileRef.current.classList.toggle("hidden");
    }
    if (lifestyleRef.current?.textContent === event.currentTarget.textContent) {
      lifestyleRef.current.classList.toggle("hidden");
    }
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
        <button type="button" onClick={handleOpenModal}>
          TAGS
        </button>
        <div className="flex justify-around">
          <div>
            <p ref={motorRef} className="hidden">
              motor
            </p>
            <p ref={workRef} className="hidden">
              work
            </p>
          </div>
          <div>
            <p ref={mobileRef} className="hidden">
              mobile
            </p>
            <p ref={lifestyleRef} className="hidden">
              lifestyle
            </p>
          </div>
        </div>
        <fieldset className="flex justify-around">
          <div>
            <input
              type="radio"
              id="buy"
              name="sale"
              value="buy"
              defaultChecked={checkedBuy}
            />
            <label htmlFor="buy">Buy</label>
          </div>
          <div>
            <input
              type="radio"
              id="sell"
              name="sale"
              value="sell"
              defaultChecked={!checkedBuy}
            />
            <label htmlFor="sell">Sell</label>
          </div>
        </fieldset>
        <div>
          <button type="submit" onSubmit={handleCreateAdvert}>
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateAdvertPage;
