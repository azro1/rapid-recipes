import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'rapid-recipes-favourites';
const FavouritesContext = createContext(null);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setFavourites(JSON.parse(stored));
      } catch (err) {
        console.log(err.message);
      }
    };

    load();
  }, []);

  const isFavourite = (id) => favourites.some((item) => String(item.id) === String(id));

  const toggleFavourite = async (recipe) => {
    const exists = isFavourite(recipe.id);
    const next = exists
      ? favourites.filter((item) => String(item.id) !== String(recipe.id))
      : [{ ...recipe, id: recipe.id }, ...favourites];

    setFavourites(next);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
