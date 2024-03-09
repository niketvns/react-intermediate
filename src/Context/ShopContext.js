import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ShopContext = createContext("");

const ShopProvider = ({ children }) => {
  const [allShop, setAllShop] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [selectedAlphabet, setSelectedAlphabet] = useState(null);
  const [favorite, setFavorite] = useState([]);

  const addToFavorite = (storeId) => {
    setFavorite((prev) => [...prev, storeId]);
  };

  const removeFromFavorite = (storeId) => {
    setFavorite((prev) => prev.filter((item) => item !== storeId));
  };

  const isInFavorite = (storeId) => {
    return favorite.some((id) => id === storeId);
  };

  const getCatShops = useCallback(async () => {
    if (selectedCat) {
      const res = await fetch(
        `http://localhost:3001/stores?cats=${selectedCat}`
      );
      const data = await res.json();
      setAllShop(data);
    } else {
      const res = await fetch("http://localhost:3001/stores");
      const data = await res.json();
      setAllShop(data);
    }
  }, [selectedCat]);

  const shortByName = async () => {
    const res = await fetch("http://localhost:3001/stores?_sort=name");
    const data = await res.json();
    console.log(data);
    setAllShop(data);
  };

  const shortByFeatured = async () => {
    const res = await fetch(
      "http://localhost:3001/stores?_sort=featured&order=desc"
    );
    const data = await res.json();
    setAllShop(data);
  };

  const shortByPopularity = async () => {
    const res = await fetch(
      "http://localhost:3001/stores?_sort=clicks&_order=desc"
    );
    const data = await res.json();
    setAllShop(data);
  };

  const shortByCashback = async () => {
    const res = await fetch(
      "http://localhost:3001/stores?_sort=amount_type,cashback_amount&_order=asc,desc"
    );
    const data = await res.json();
    setAllShop(data);
  };

  const handleSearch = useCallback(async () => {
    const res = await fetch(
      `http://localhost:3001/stores?name_like=${searchText}`
    );
    const data = await res.json();
    setAllShop(data);
  }, [searchText]);

  const handleAlphabeticalSearch = useCallback(async () => {
    if (selectedAlphabet) {
      const res = await fetch(
        `http://localhost:3001/stores?name_like=^${selectedAlphabet}`
      );
      const data = await res.json();
      setAllShop(data);
    }
  }, [selectedAlphabet]);

  useEffect(() => {
    getCatShops();
    handleSearch();
    handleAlphabeticalSearch();
  }, [getCatShops, handleSearch, handleAlphabeticalSearch]);

  return (
    <ShopContext.Provider
      value={{
        allShop,
        setSelectedCat,
        shortByName,
        shortByFeatured,
        shortByPopularity,
        shortByCashback,
        setSearchText,
        setSelectedAlphabet,
        addToFavorite,
        removeFromFavorite,
        isInFavorite,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

const useGlobalShop = () => useContext(ShopContext);

export { ShopProvider, useGlobalShop };
