import {StyleSheet, View, Text} from 'react-native'
import { supabase } from '../db/config';
import { ActivityIndicator } from 'react-native';

// styles
import globalStyles from '../styles/global';

// components
import Header from '../components/header';
import CategoryList from '../components/categoryList';
import { useState, useEffect } from 'react';

const Categories = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [categories, setCategories] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setError(null);
        const { data, error } = await supabase.from('categories').select('*');
        if (error) throw error;
        setCategories(data);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setIsLoading(false)
      }
    };

    fetchCategories();
  }, [])
  
  const getCatTitle = (name) => {
    navigation.navigate('CategoryDishes', {
      name: name
    })
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={50} color="#44bcb7" />
      </View>
    )
  }
  
  return (
    <View style={styles.categoriesContainer}>
      <Header
        marginTop={16}
        fontSize={30}
        title='Select a Category'
      />
      <Text style={styles.leadText}>Choose from our recipe categories to find your next delicious meal</Text>
      {error && <Text style={globalStyles.error}>{error}</Text>}
      {categories && <CategoryList recipeData={categories} getCatTitle={getCatTitle} />}
    </View>
  )
}

const styles = StyleSheet.create({
  categoriesContainer: {
    flex: 1,
  },
  leadText: {
    paddingTop: 6,
    paddingBottom: 12,
    paddingHorizontal: 12,
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'WorkSans-Light',
    lineHeight: 25
  }
})

export default Categories
