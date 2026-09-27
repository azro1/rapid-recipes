import { useState, useEffect, useRef } from 'react';
import { supabase } from '../db/config';

const useRecipeDetails = (id) => {
  const [recipeData, setRecipeData] = useState(null);
  const [error, setError] = useState(null);
  const requestRef = useRef(0);
  const idRef = useRef(id);
  idRef.current = id;

  const fetchData = async (recipeId = idRef.current) => {
    if (!recipeId) return;
    const request = ++requestRef.current;
    try {
      setError(null);
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('recipe_id', recipeId);

      if (request !== requestRef.current) return;
      if (error) throw error;
      setRecipeData(data);
    } catch (err) {
      if (request !== requestRef.current) return;
      setError(err.message);
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (!id) return;

    fetchData(id);

    const channel = supabase
      .channel(`realtime-recipes-${id}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'recipes', filter: `recipe_id=eq.${id}` },
        () => fetchData(id)
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'recipes', filter: `recipe_id=eq.${id}` },
        () => fetchData(id)
      )
      .subscribe();

    return () => {
      requestRef.current += 1;
      supabase.removeChannel(channel);
    };
  }, [id]);

  return { recipeData, error, refetch: () => fetchData(idRef.current) };
};

export default useRecipeDetails;