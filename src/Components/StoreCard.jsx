import React from "react";
import { FaHeart } from "react-icons/fa";
import { useGlobalShop } from "../Context/ShopContext";

const StoreCard = ({ store }) => {
  const { isInFavorite } = useGlobalShop();

  return (
    <li className="store_card relative">
      <button className="absolute top-2 right-2">
        <FaHeart
          className={`${
            isInFavorite(store.id) ? "text-red-500" : "text-blue-300"
          } size-5 cursor-pointer`}
        />
      </button>
      <img src={store.logo} alt={store.slug} />
      <div>{store.name}</div>
      <div className="flex gap-1 items-center">
        {store.cashback_enabled ? (
          <p className="text-[#e6936b] text-lg font-semibold">
            {store.rate_type}{" "}
            {store.amount_type === "fixed"
              ? `$${store.cashback_amount.toFixed(2)}`
              : `${store.cashback_amount.toFixed(2)}%`}{" "}
            cashback
          </p>
        ) : (
          "No cashback available"
        )}
      </div>
    </li>
  );
};

export default StoreCard;
