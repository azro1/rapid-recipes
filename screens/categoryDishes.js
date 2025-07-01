import { View, Text } from 'react-native'
import { useState, useEffect } from 'react';
import { SUPABASE_ANON_KEY } from '@env';
import { ActivityIndicator } from 'react-native';

// hooks
import useRecipe from '../hooks/useRecipe';

// styles
import globalStyles from '../styles/global';

// components
import DishList from '../components/dishList';

const CategoryDishes = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { name } = route.params;
  
  const { recipeData, error } = useRecipe(name)  
  
  useEffect(() => {
    const triggerEdgeFunction = async () => {
      try {
        const response = await fetch('https://mxhuwjcxhcluuofyhjys.supabase.co/functions/v1/upsert-meal-dishes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
          },
          body: JSON.stringify({ 
            category: name 
          })
        });

        const edgeResponse = await response.json();
        if (!edgeResponse.success) {
          throw new Error('Edge function request failed');
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    triggerEdgeFunction();
  }, [name]);

  const getDish = (dish, id) => {
    navigation.navigate('Recipe', {
      dish: dish,
      id: id
    })
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color="#3A5743" />
      </View>
    )
  }

  return (
    <>
      {error && <Text style={globalStyles.error}>{error}</Text>}
      {recipeData && <DishList name={name} dishes={recipeData} getDish={getDish} />}
    </>
  )
}

export default CategoryDishes
