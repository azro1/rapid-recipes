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

const Recipe = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { dish, id } = route.params;
  const { isFavourite, toggleFavourite } = useFavourites();
  const saved = isFavourite(id);

  const { recipeData, error } = useRecipeDetails(id)

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
    const triggerEdgeFuction = async () => {
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
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false);
      }
    }
    triggerEdgeFuction();
  }, [id])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      <Pressable style={styles.saveButton} onPress={onSave}>
        <Ionicons name={saved ? 'heart' : 'heart-outline'} size={20} color="#D94F30" />
        <Text style={styles.saveLabel}>{saved ? 'Saved' : 'Save'}</Text>
      </Pressable>
      {error && <Text style={globalStyles.error}>{error}</Text>}
      {recipeData && <RecipeDetails recipeData={recipeData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    flex: 1,
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
})



export default Recipe
