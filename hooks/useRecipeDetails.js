import { useState, useEffect } from 'react';
import { supabase } from '../db/config';

const useRecipeDetails = (id) => {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setError(null);
        const { data, error } = await supabase
          .from('recipes')
          .select('*')
          .eq('recipe_id', id)
          .select()

        if (error) throw error;
        setRecipeData(data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      }
    };

    fetchData();

    const channel = supabase
      .channel(`realtime-recipes-${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'recipes', filter: `recipe_id=eq.${id}` },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  return { recipeData, error };
};

export default useRecipeDetails;