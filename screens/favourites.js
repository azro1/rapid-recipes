import { StyleSheet, View, Text, Pressable, Image, FlatList } from 'react-native';
import ScreenHeading from '../components/screenHeading';
import Header from '../components/header';
import Card from '../components/card';
import { useFavourites } from '../context/FavouritesContext';

const Favourites = ({ navigation }) => {
  const { favourites } = useFavourites();

  const openRecipe = (item) => {
    navigation.navigate('Menu', {
      screen: 'Recipe',
      params: {
        dish: item.dish,
        id: item.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScreenHeading
        showBackButton={true}
        navigation={navigation}
        screen="Favourites"
      />
      <View style={styles.content}>
        <Header
          fontSize={30}
          title="Favourites"
          align="left"
        />
        {favourites.length === 0 ? (
          <Text style={styles.empty}>Recipes you save will appear here.</Text>
        ) : (
          <FlatList
            data={favourites}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <Pressable onPress={() => openRecipe(item)}>
                <Card>
                  <View style={styles.row}>
                    {item.image_url ? (
                      <Image source={{ uri: item.image_url }} style={styles.image} />
                    ) : (
                      <View style={styles.image} />
                    )}
                    <View style={styles.meta}>
                      <Text style={styles.name} numberOfLines={2}>{item.dish}</Text>
                      {item.category ? <Text style={styles.category}>{item.category}</Text> : null}
                    </View>
                  </View>
                </Card>
              </Pressable>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  empty: {
    marginTop: 20,
    fontSize: 17,
    fontFamily: 'WorkSans-Light',
    lineHeight: 26,
    color: '#4A4A4A',
  },
  list: {
    paddingTop: 20,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 84,
    height: 84,
    borderRadius: 4,
    backgroundColor: '#E7E2D8',
  },
  meta: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: '#4A4A4A',
  },
  category: {
    fontSize: 15,
    fontFamily: 'WorkSans-Light',
    color: '#4A4A4A',
  },
});

export default Favourites;
