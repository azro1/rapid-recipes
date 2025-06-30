import { StyleSheet, Text, Pressable, Image, useWindowDimensions, FlatList } from 'react-native';
import Card from './card';

const CARD_WIDTH = 180;
const GAP = 20;

const CategoryList = ({ recipeData, getCatTitle }) => {
  const { width: screenWidth } = useWindowDimensions();

  // Calculate number of columns that fit based on fixed card width + gaps
  const responsiveColumns = Math.floor((screenWidth + GAP) / (CARD_WIDTH + GAP)) || 1;

  return (
    <FlatList
      data={recipeData}
      keyExtractor={(item) => item.category_id}
      numColumns={responsiveColumns}
      contentContainerStyle={styles.listWrapper}
      columnWrapperStyle={responsiveColumns > 1 ? { justifyContent: 'flex-start', gap: GAP } : undefined}
      style={{ flex: 1 }} 
      renderItem={({ item }) => (
        <Pressable style={[styles.previewItem, { width: CARD_WIDTH }]} onPress={() => getCatTitle(item.title)}>
          <Card>
            <Image style={styles.previewImage} source={{ uri: item.image_url }} resizeMode="contain" />
          </Card>
          <Text style={styles.previewTitle}>{item.title}</Text>
        </Pressable>
      )}
      key={responsiveColumns} // rerender on column count change
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    paddingHorizontal: GAP / 1.5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  previewItem: {
    marginBottom: GAP,
  },
  previewImage: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
  },
  previewTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    marginTop: 8,
  },
});

export default CategoryList;
