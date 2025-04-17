import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAdvert, updateAdvert } from "../store/actions/creators";
import State, { Sale } from "../store/state/types";

const UpdateAdvertPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { advert } = useParams();

  const advertId = advert ? advert.split("-")[1] : null;
  const advertDetails = useSelector((state: State) => state.adverts.list[0]);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [tag, setTag] = useState<string[]>([]);
  const [sale, setSale] = useState<Sale>("buy");

  const disabled = !name || !price;

  // Cargar el anuncio al montar
  useEffect(() => {
    if (advertId) {
      // @ts-expect-error lo tipamos más adelante
      dispatch(getAdvert(advertId));
    }
  }, [dispatch, advertId]);

  // Rellenar campos cuando llegue el anuncio
  useEffect(() => {
    if (!advertDetails || advertDetails.id !== advertId) return;

    setName(advertDetails.name);
    setDescription(advertDetails.description || "");
    setPrice(advertDetails.price);
    setImage(advertDetails.image || "");
    setTag(advertDetails.tags?.map((tag) => tag.name) || []);
    setSale(advertDetails.sale);
  }, [advertDetails, advertId]);

  const handleUpdateAdvert = (event: React.FormEvent) => {
    event.preventDefault();

    if (!advertDetails) return;

    const updatedAdvert = {
      id: advertDetails.id,
      name,
      description,
      price,
      image,
      tags: [tag],
      sale
    };

    // @ts-expect-error lo tipamos más adelante
    dispatch(updateAdvert(updatedAdvert));
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
    console.log(event.target.value);
    setTag(event.target.value.split(","));
  };

  const handleSaleAdvertChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (event.target.value === "buy" || event.target.value === "sell") {
      setSale(event.target.value);
    }
  };

  if (!advert || !advertId || !advertDetails?.id) {
    return <p>Loading advert...</p>;
  }

  return (
    <>
      <h2>Update Advert</h2>
      <form onSubmit={handleUpdateAdvert}>
        <div>
          <label htmlFor="name">Name</label>
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
            <option value="">Select a category</option>
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
            <option value="">Select a sale type</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            disabled={disabled}
            onSubmit={handleUpdateAdvert}
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateAdvertPage;
