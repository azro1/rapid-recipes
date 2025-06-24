import { StyleSheet, View, Text, FlatList, Image } from 'react-native'
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

const Recipe = ({ route }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { dish, id } = route.params;

  const { recipeData, error } = useRecipeDetails(id)  
  
  useEffect(() => {
    const triggerEdgeFuction = async () => {
      try {
        const response = await fetch('https://mxhuwjcxhcluuofyhjys.supabase.co/functions/v1/upsert-recipe-details', {
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
        <ActivityIndicator size={50} color="#44bcb7" />
      </View>
    )
  }
  
  return (
    <View style={styles.recipeContainer}>
      <Header 
        marginTop={16}
        paddingBottom={14}
        fontSize={30}
        title={dish} 
      />
      {error && <Text style={globalStyles.error}>{error}</Text>}
      {recipeData && <RecipeDetails recipeData={recipeData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  recipeContainer: {
    flex: 1
  },
})



export default Recipe
