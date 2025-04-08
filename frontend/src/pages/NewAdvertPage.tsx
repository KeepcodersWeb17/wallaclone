import { useState } from "react";

const NewAdvertPage = () => {
  const [nameAdvert, setNameAdvert] = useState<string>("");
  const [descriptionAdvert, setDescriptionAdvert] = useState<string>("");
  const [priceAdvert, setPriceAdvert] = useState<number>(0);
  const [tagsAdvert, setTagsAdvert] = useState<string>("");
  const [imageAdvert, setImageAdvert] = useState<string>();

  const handleNameAdvert = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameAdvert(event.target.value);
  };

  const handleDescriptionAdvert = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescriptionAdvert(event.target.value);
  };

  const handlePriceAdvert = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceAdvert(Number(event.target.value));
  };

  const handleImageAdvert = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageAdvert(event.target.value);
  };

  const handleTagsAdvertChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTagsAdvert(event.target.value);
  };

  return (
    <>
      <h2>New Advert</h2>
      <form>
        <div>
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={nameAdvert}
            onChange={handleNameAdvert}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows={3}
            value={descriptionAdvert}
            onChange={handleDescriptionAdvert}
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={priceAdvert}
            onChange={handlePriceAdvert}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            value={imageAdvert}
            onChange={handleImageAdvert}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="tags">
            <span>Category:</span>
          </label>
          <select
            name="tags"
            id="tags"
            value={tagsAdvert}
            onChange={handleTagsAdvertChange}
          >
            <option value="work">Select a category</option>
            <option value="work">Work</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="motor">Motor</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default NewAdvertPage;
