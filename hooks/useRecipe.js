import { useState, useEffect } from 'react';
import { supabase } from '../db/config';

const useRecipe = (category) => {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!category) return;

    const fetchData = async () => {
      try {
        setError(null);
        const { data, error } = await supabase
          .from('dishes')
          .select('*')
          .eq('category', category);
        if (error) throw error;
        setRecipeData(data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      }
    };

    fetchData();

    const channel = supabase
      .channel(`realtime-dishes-${category}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'dishes', filter: `category=eq.${category}` },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [category]);

  return { recipeData, error };
};

export default useRecipe;

