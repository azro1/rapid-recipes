import { StyleSheet, View, Text, FlatList, Image, Pressable, useWindowDimensions } from 'react-native';

import Header from '../components/header';
import Card from './card';

const maxColumns = 5;
const gap = 20; // space between items

const DishList = ({ name, dishes, getDish }) => {
  const { width: screenWidth } = useWindowDimensions();

  const responsiveColumns = Math.min(
    Math.floor(screenWidth / 380),
    maxColumns
  ) || 1;

  // Calculate item width by subtracting total gaps from width, then dividing by columns
  const totalGapWidth = gap * (responsiveColumns - 1);
  const itemWidth = (screenWidth - totalGapWidth - 24 /* paddingHorizontal from container */) / responsiveColumns;

  return (
    <View style={styles.dishesContainer}>
      <Header 
        marginTop={16} 
        fontSize={30} 
        title={`Our ${name} Dishes`} 
      />
      <Text style={styles.leadText}>
        Explore our delicious collection of {name} dishes with easy-to-follow recipes bursting with flavor!
      </Text>
      <View style={styles.flatlistWrapper}>
        <FlatList
          data={dishes}
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
    paddingHorizontal: 12,
  },
  leadText: {
    paddingTop: 6,
    paddingBottom: 16,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'WorkSans-Light',
    lineHeight: 25,
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
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    padding: 10,
  },
});

export default DishList;

