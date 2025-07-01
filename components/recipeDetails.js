import { ScrollView, View, Text, Image, StyleSheet, Dimensions, Pressable, Linking } from 'react-native'

// get width and height of device window from Dimensions component to allow elements occupy full width and height of device in their containers 
// const width = Dimensions.get('window').width; 
// const height = Dimensions.get('window').height;

const RecipeDetails = ({ recipeData }) => {
  const getIngredients = (item) => item.ingredients || [];

  return (
    <ScrollView contentContainerStyle={styles.recipeWrapper}>
      {recipeData.map((item) => (
        <View key={item.recipe_id} style={styles.recipeList}>
          <View style={styles.categoryWrapper}>
            <Text style={styles.header}>Category:</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.recipeImage}
              source={{ uri: item.strMealThumb || item.image_url }}
            />
          </View>
          <View style={styles.recipeInfo}>
            <Text style={styles.header}>Ingredients</Text>
            <View style={styles.sectionList}>
              {getIngredients(item).map((ingredient, idx) => (
                <Text key={idx} style={styles.sectionItem}>{`\u2022 ${ingredient}`}</Text>
              ))}
            </View>
            <View style={styles.instructionsContainer}>
              <Text style={styles.header}>Instructions:</Text>
              <View style={styles.instructions}>
                {item.instructions.split('\n').filter(p => p.trim() !== '').map((para, i) => (
                  <Text key={i} style={styles.instructionsText}>{para}</Text>
                ))}
              </View>
            </View>
            {item.source_url && (
              <View style={styles.linkContainer}>
                <Text style={styles.header}>Source:</Text>
                <View style={styles.linkWrapper}>
                  <Pressable onPress={() => Linking.openURL(item.source_url)}>
                    <Text style={styles.link}>{item.source_url}</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {item.youtube_url && (
              <View style={styles.linkContainer}>
                <Text style={styles.header}>Video:</Text>
                <View style={styles.linkWrapper}>
                  <Pressable onPress={() => Linking.openURL(item.youtube_url)}>
                    <Text style={styles.link}>{item.youtube_url}</Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recipeWrapper: {
    paddingHorizontal: 12,
    maxWidth: 1960,
    marginHorizontal: 'auto',
    width: '100%',
    flexGrow: 1,
  },
  recipeList: {
    paddingBottom: 40,
    width: '100%'
  },
  categoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
    paddingBottom: 8,
  },
  category: {
    fontFamily: 'WorkSans-Light',
    fontSize: 16,
    color: '#4A4A4A',
  },
  imageWrapper: {
    maxWidth: 380,
    width: '100%',
  },
  recipeImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  recipeInfo: {
    marginTop: 8,
  },
  header: {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: '#4A4A4A',
  },
  sectionList: {
    marginTop: 20,
    gap: 8,
  },
  sectionItem: {
    fontSize: 16,
    fontFamily: 'WorkSans-Light',
    color: '#4A4A4A',
  },
  instructionsContainer: {
    marginTop: 30,
    gap: 6
  },
  instructions: {
  },
  instructionsText: {
    fontSize: 16,
    fontFamily: 'WorkSans-Light',
    lineHeight: 24,
    flexWrap: 'wrap',
    flexShrink: 1,
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
    color: '#4A4A4A',
  },
  linkContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    flexWrap: 'wrap',
  },
  linkWrapper: {
    flexShrink: 1,
    overflowWrap: 'break-word',
    wordBreak: 'break-word',
  },
  link: {
    fontSize: 16,
    fontFamily: 'WorkSans-Light',
    lineHeight: 22,
    color: '#3366BB'
  },
});

export default RecipeDetails;
