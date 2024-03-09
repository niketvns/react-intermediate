import React from "react";
import StoreCard from "./StoreCard";
import { useGlobalShop } from "../Context/ShopContext";

const AllStores = ({ className }) => {
  const {
    allShop,
    shortByName,
    shortByFeatured,
    shortByPopularity,
    shortByCashback,
    setSearchText,
    setSelectedAlphabet,
  } = useGlobalShop();

  const alphabets = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  const handleSelectChange = (e) => {
    const { value } = e.target;
    switch (value) {
      case "name":
        return shortByName();
      case "featured":
        return shortByFeatured();
      case "popularity":
        return shortByPopularity();
      case "cashback":
        return shortByCashback();
      default:
        return;
    }
  };

  const handleFilterChange = (e) => {
    const { value } = e.target;
    switch (value) {
      case "publish":
        return shortByName();
      case "draft":
        return shortByFeatured();
      case "trash":
        return shortByPopularity();
      default:
        return;
    }
  };

  return (
    <div className={`my-[50px] ${className}`}>
      <div className="flex gap-2 justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <div>
              Filter
              <select
                name=""
                id=""
                className="border-2  outline-none px-4 py-2 rounded-full"
                onChange={handleFilterChange}
                defaultValue={""}
              >
                <option value="" disabled>
                  --Select--
                </option>
                <option value="publish">Publish</option>
                <option value="draft">Draft</option>
                <option value="trash">Trash</option>
              </select>
            </div>
            <input
              type="text"
              placeholder="Search Store..."
              onChange={(e) => setSearchText(e.target.value)}
              className="px-4 py-2 border-2 rounded-md"
            />
          </div>
          <div className="flex gap-2 text-xl p-2 items-center">
            {" "}
            {alphabets.map((alph) => (
              <div
                className="cursor-pointer text-black/50"
                onClick={() => setSelectedAlphabet(alph)}
              >
                {alph}
              </div>
            ))}
          </div>
        </div>
        <div>
          Short By:
          <select
            name=""
            id=""
            className="border-2  outline-none px-4 py-2 rounded-full"
            onChange={handleSelectChange}
            defaultValue={""}
          >
            <option value="" disabled>
              --Select--
            </option>
            <option value="name">Name</option>
            <option value="featured">Featured</option>
            <option value="popularity">Popularity</option>
            <option value="cashback">Cashback</option>
          </select>
        </div>
      </div>
      <ul className={"store_container"}>
        {allShop.length ? (
          allShop?.map((store) => <StoreCard key={store.id} store={store} />)
        ) : (
          <p className="p-4 text-2xl text-blue-300 italic">No Store Found...</p>
        )}
      </ul>
    </div>
  );
};

export default AllStores;
