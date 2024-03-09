import React, { useEffect, useState } from "react";
import { useGlobalShop } from "../Context/ShopContext";

const Categories = ({ className }) => {
  const [categories, setCategories] = useState([]);
  const { setSelectedCat } = useGlobalShop();

  const getAllCategories = async () => {
    const res = await fetch("http://localhost:3001/categories");
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className={`${className} my-[50px] flex flex-col gap-4`}>
      <h2 className="text-2xl px-4">Store Categories</h2>
      <div className="bg-[#f3f3f3] rounded-2xl p-4 mx-2 flex flex-col gap-2 text-lg cursor-pointer">
        <div onClick={() => setSelectedCat(null)}>All</div>
        {categories.map((cat) => (
          <div key={cat.id} onClick={() => setSelectedCat(cat.id)}>
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
