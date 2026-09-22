import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, Pressable, useWindowDimensions } from 'react-native';

import Header from '../components/header';
import Card from './card';

const maxColumns = 5;
const gap = 20; // space between items

const DishList = ({ name, dishes, getDish }) => {
  const [query, setQuery] = useState('');
  const { width: screenWidth } = useWindowDimensions();
  const filtered = dishes.filter((item) =>
    item.dish.toLowerCase().includes(query.trim().toLowerCase())
  );

  const responsiveColumns = Math.min(
    Math.floor(screenWidth / 380),
    maxColumns
  ) || 1;

  // Calculate item width by subtracting total gaps from width, then dividing by columns
  const totalGapWidth = gap * (responsiveColumns - 1);
  const itemWidth = (screenWidth - totalGapWidth - 32) / responsiveColumns;

  return (
    <View style={styles.dishesContainer}>
      <Header 
        marginTop={16} 
        fontSize={28} 
        title={`Our ${name} Dishes`} 
      />
      <Text style={styles.leadText}>
        Explore our delicious collection of {name} dishes with easy-to-follow recipes bursting with flavor!
      </Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search dishes"
        placeholderTextColor="#8A8478"
        style={styles.search}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        clearButtonMode="while-editing"
      />
      <View style={styles.flatlistWrapper}>
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No dishes match your search.</Text>
        ) : null}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.dish_id}
          numColumns={responsiveColumns}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={responsiveColumns > 1 ? { justifyContent: 'flex-start', gap } : undefined}
          renderItem={({ item }) => (
            <Pressable style={[styles.dishList, { width: itemWidth }]} onPress={() => getDish(item.dish, item.dish_id)}>
              <Card>
                <Image style={styles.thumbnail} source={{ uri: item.image_url }} resizeMode="cover" />
                <Text style={styles.dishName} numberOfLines={1} ellipsizeMode="tail">
                  {item.dish}
                </Text>
              </Card>
            </Pressable>
          )}
          style={{ flex: 1, width: '100%', maxWidth: responsiveColumns * itemWidth + gap * (responsiveColumns - 1) }}
          key={responsiveColumns} // re-render on column change
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dishesContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  search: {
    height: 44,
    marginBottom: 16,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D3C7',
    backgroundColor: '#fff',
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    color: '#4A4A4A',
  },
  empty: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'WorkSans-Light',
    color: '#4A4A4A',
  },
  leadText: {
    paddingTop: 10,
    paddingBottom: 16,
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'WorkSans-Light',
    lineHeight: 24,
    color: '#4A4A4A',
  },
  flatlistWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  dishList: {
    marginBottom: 40,
  },
  thumbnail: {
    width: '100%',
    height: 350,
    alignSelf: 'center',
  },
  dishName: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    padding: 10,
    color: '#4A4A4A',
  },
});

export default DishList;

