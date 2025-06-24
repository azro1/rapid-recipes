import { StyleSheet, Text, Pressable, Image, ScrollView } from 'react-native'

// components
import Card from './card';

const CategoryList = ({ recipeData, getCatTitle }) => {

  return (
    <ScrollView contentContainerStyle={styles.previewList}>
      {recipeData.map((item) => (
        <Pressable key={item.category_id} style={styles.previewItem} onPress={() => getCatTitle(item.title)}>
          <Card>
            <Image style={styles.previewImage} source={{ uri: item.image_url }} />
          </Card>
          <Text style={styles.previewTitle}>{item.title}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  previewList: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  previewItem: {
    marginHorizontal: 12,
    marginBottom: 20,
  },
  previewImage: {
    width: 150, 
    height: 150,
    objectFit: "contain",
    alignSelf: "center"
  },
  previewTitle: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
  }
})

export default CategoryList
