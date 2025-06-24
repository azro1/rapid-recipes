import { StyleSheet, View, Text, ScrollView, Image, Dimensions, Pressable } from 'react-native'

// components
import Header from '../components/header';
import Card from './card';

// get width and height of device window from Dimensions component to allow elements occupy full width and height of device in their containers 
// const width = Dimensions.get('window').width; 
// const height = Dimensions.get('window').height;

const DishList = ({ name, dishes, getDish }) => {

  return (
    <View style={styles.dishesContainer}>
      <Header
        marginTop={16}
        fontSize={30}
        title={`Our ${name} Dishes`}
      />
      <Text style={styles.leadText}>Explore our delicious collection of {name} dishes with easy-to-follow recipes bursting with flavor!</Text>
      <ScrollView contentContainerStyle={styles.dishListWrapper}>
        {dishes.map((item) => (
          <Pressable key={item.dish_id} style={styles.dishList} onPress={() => getDish(item.dish, item.dish_id)} >
            <Card>
              <Image style={styles.thumbnail} source={{ uri: item.image_url}} />
              <Text style={styles.dishName} numberOfLines={1} ellipsizeMode="tail">{item.dish}</Text>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  dishesContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  leadText: {
    paddingTop: 6,
    paddingBottom: 16,
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'WorkSans-Light',
    lineHeight: 25
  },
  dishListWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20
  },
  dishList: {
    width: '100%',
    maxWidth: 380,
    marginBottom: 40,
  },
  thumbnail: {
    width: "100%",
    height: 350,
    objectFit: 'contain',
    alignSelf: 'center'
  },
  dishName: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    padding: 10
  },
});

export default DishList
