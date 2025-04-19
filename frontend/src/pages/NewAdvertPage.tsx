import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { createAdvert } from "../store/actions/creators";
import { Sale } from "../store/state/types";

const NewAdvertPage = () => {
  const [tags, setTag] = useState<string>("");
  const [sale, setSale] = useState<Sale>(undefined);

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

    if (!name || !price) return;

    const advert = { name, price: +price, description, image, tags, sale };

    await dispatch(createAdvert(advert, navigate));
  };

  const handleTagsAdvertChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTag(event.target.value);
  };

  const handleSaleAdvertChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value === "buy" || event.target.value === "sell") {
      setSale(event.target.value);
    }
  };

  return (
    <>
      <h2>New Advert</h2>
      <form onSubmit={handleCreateAdvert}>
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
        <div>
          <label htmlFor="tags">Category:</label>
          <select
            name="tags"
            id="tags"
            value={tags}
            onChange={handleTagsAdvertChange}
          >
            <option value="work">Select a category</option>
            <option value="work">Work</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="motor">Motor</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <div>
          <label htmlFor="sale">Sale:</label>
          <select
            name="sale"
            id="sale"
            value={sale}
            onChange={handleSaleAdvertChange}
          >
            <option value="buy">Select a category</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
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
