import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Sale } from "../store/state/types";
import { useAppDispatch } from "../store/store";
import { createAdvert } from "../store/actions/creators";
import TagsDiaglog from "../components/TagsDialog";

const NewAdvertPage = () => {
  const workRef = useRef<HTMLParagraphElement>(null);
  const motorRef = useRef<HTMLParagraphElement>(null);
  const mobileRef = useRef<HTMLParagraphElement>(null);
  const lifestyleRef = useRef<HTMLParagraphElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
            <input type="radio" id="buy" name="sale" value="buy" />
            <label htmlFor="buy">Buy</label>
          </div>
          <div>
            <input type="radio" id="sell" name="sale" value="sell" />
            <label htmlFor="sell">Sell</label>
          </div>
        </fieldset>
        <div>
          <button type="submit" onSubmit={handleCreateAdvert}>
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default NewAdvertPage;
