import { StyleSheet, View, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react';
import { SUPABASE_ANON_KEY } from '@env';
import { ActivityIndicator } from 'react-native';


// hooks
import useRecipeDetails from '../hooks/useRecipeDetails';

// global styles
import globalStyles from '../styles/global';

// components
import Header from '../components/header';
import RecipeDetails from '../components/recipeDetails';
import { useFavourites } from '../context/FavouritesContext';
import fetchRandomMeal from '../utils/randomMeal';

const Recipe = ({ route, navigation }) => {
  const [edgeError, setEdgeError] = useState(null)
  const [picking, setPicking] = useState(false)
  const [pickError, setPickError] = useState(null)
  const { dish, id, picked } = route.params || {};
  const { isFavourite, toggleFavourite } = useFavourites();
  const saved = isFavourite(id);

  const { recipeData, error, refetch } = useRecipeDetails(id)
  const shownId = recipeData?.[0]?.recipe_id
  const hasRecipe = shownId != null && String(shownId) === String(id)

  const pickAgain = async () => {
    if (picking) return
    setPicking(true)
    setPickError(null)
    try {
      const meal = await fetchRandomMeal(id)
      navigation.setParams({ dish: meal.dish, id: meal.id, picked: true })
    } catch (err) {
      setPickError(err.message)
    } finally {
      setPicking(false)
    }
  }

  const onSave = () => {
    const item = recipeData?.[0];
    toggleFavourite({
      id,
      dish,
      image_url: item?.image_url || item?.strMealThumb || null,
      category: item?.category || null,
    });
  };  
  
  useEffect(() => {
    if (!route.params?.pickNow) return
    let cancelled = false

    const choose = async () => {
      setPickError(null)
      try {
        const meal = await fetchRandomMeal()
        if (cancelled) return
        navigation.setParams({
          dish: meal.dish,
          id: meal.id,
          picked: true,
          pickNow: false,
        })
      } catch (err) {
        if (!cancelled) setPickError(err.message)
      }
    }

    choose()
    return () => { cancelled = true }
  }, [route.params?.pickNow])

  useEffect(() => {
    if (!id) return
    let active = true

    const triggerEdgeFuction = async () => {
      setEdgeError(null)
      try {
        const response = await fetch('https://ypsvljptutcivzktmcad.supabase.co/functions/v1/upsert-recipe-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + SUPABASE_ANON_KEY
          },
          body: JSON.stringify({
            id: id
          })  
        });
       
        const edgeResponse = await response.json();
        if (!edgeResponse.success) {
          throw new Error('Edge function request failed');
        }
        if (active) refetch()
      } catch (error) {
        if (!active) return
        setEdgeError(error.message)
        console.log(error.message)
      }
    }
    triggerEdgeFuction();
    return () => { active = false }
  }, [id])

  if (!pickError && (picking || (!hasRecipe && !edgeError && !error))) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={50} color="#3A5743" />
      </View>
    )
  }
  
  return (
    <View style={styles.recipeContainer}>
      <Header 
        marginTop={16}
        paddingBottom={8}
        fontSize={28}
        title={dish} 
      />
      <Pressable
        style={styles.saveButton}
        onPress={onSave}
        accessibilityRole="button"
        accessibilityLabel={saved ? 'Remove from favourites' : 'Save recipe'}
        accessibilityState={{ selected: saved }}
      >
        <Ionicons name={saved ? 'heart' : 'heart-outline'} size={20} color="#D94F30" />
        <Text style={styles.saveLabel}>{saved ? 'Saved' : 'Save'}</Text>
      </Pressable>
      {picked ? (
        <Pressable
          style={[globalStyles.button, styles.againButton]}
          onPress={pickAgain}
          disabled={picking}
          accessibilityRole="button"
          accessibilityLabel="Try again"
        >
          <Text style={globalStyles.buttonText}>Try again</Text>
        </Pressable>
      ) : null}
      {(error || edgeError || pickError) && (
        <Text style={globalStyles.error}>{error || edgeError || pickError}</Text>
      )}
      {recipeData && <RecipeDetails recipeData={recipeData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFCF5',
  },
  saveButton: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  saveLabel: {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: '#3A5743',
  },
  againButton: {
    alignSelf: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
})



export default Recipe
