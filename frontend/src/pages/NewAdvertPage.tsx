import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/store";
import { createAdvert } from "../store/actions/creators";
import { Sale } from "../store/state/types";

const NewAdvertPage = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>();
  const [tag, setTag] = useState<string>("");
  const [sale, setSale] = useState<Sale>(undefined);

  const disabled = !name || !price;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleCreateAdvert = async (event: React.FormEvent) => {
    event.preventDefault();

    const advert = { name, description, price, tag, image, sale };

    await dispatch(createAdvert(advert));
    navigate("/adverts");
  };

  const handleNameAdvert = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionAdvert = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handlePriceAdvert = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleImageAdvert = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.value);
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
            value={name}
            onChange={handleNameAdvert}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={handleDescriptionAdvert}
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePriceAdvert}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={handleImageAdvert}
          />
        </div>
        <div>
          <label htmlFor="tags">Category:</label>
          <select
            name="tags"
            id="tags"
            value={tag}
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
          <button
            type="submit"
            disabled={disabled}
            onSubmit={handleCreateAdvert}
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default NewAdvertPage;
