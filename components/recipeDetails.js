import { useState } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Pressable, Linking, FlatList } from 'react-native'
import { ChevronLeft, ChevronRight } from 'lucide-react-native'

const isStepMarker = (line) => /^(?:step\s*)?\d+\s*[:.)\-–—]*\s*$/i.test(line)

const UNIT = /^(tbs|tbsp|tsp|cup|cups|oz|lb|lbs|g|kg|ml|clove|cloves|medium|small|large|inch|inches|can|cans|tin|packet|packets|tablespoon|tablespoons|teaspoon|teaspoons|ounce|ounces|pound|pounds|salted)$/i

const stripStepPrefix = (step) => {
  const withoutLabel = step.replace(/^(?:step\s+\d+\s*[:.)\-–—]*|\d+\s*[:.)])\s*/i, '').trim()
  const inline = withoutLabel.match(/^(\d{1,2})\s+([A-Z].*)$/)
  if (!inline) return withoutLabel
  const firstWord = inline[2].split(/\s+/)[0].replace(/[^A-Za-z]/g, '')
  if (UNIT.test(firstWord)) return withoutLabel
  return inline[2].trim()
}

const finishStep = (step) => step
  .replace(/:(?=\s|$)/g, '.')
  .replace(/[ \t]+\./g, '.')
  .replace(/\.{2,}/g, '.')
  .trim()

const getSteps = (instructions) => {
  if (!instructions || !String(instructions).trim()) return []
  const lines = String(instructions).replace(/\r\n/g, '\n').split('\n').map((line) => line.trim())
  const hasMarkers = lines.some((line) => isStepMarker(line))

  if (hasMarkers) {
    const steps = []
    let current = []
    const flush = () => {
      const body = stripStepPrefix(current.join('\n').replace(/\n{3,}/g, '\n\n').trim())
      current = []
      if (body && !isStepMarker(body)) steps.push(body)
    }
    lines.forEach((line) => {
      if (isStepMarker(line)) flush()
      else if (line) current.push(line)
    })
    flush()
    if (steps.length) return steps.map(finishStep).filter(Boolean)
  }

  const paragraphs = lines.map((line) => stripStepPrefix(line)).filter((line) => line && !isStepMarker(line))
  if (paragraphs.length > 1) return paragraphs.map(finishStep).filter(Boolean)
  if (paragraphs.length === 1) {
    const sentences = paragraphs[0].split(/(?<=[.!?])\s+(?=[A-Z])/).map((part) => part.trim()).filter(Boolean)
    if (sentences.length > 1) return sentences.map(finishStep).filter(Boolean)
  }
  return paragraphs.map(finishStep).filter(Boolean)
}

const InstructionCards = ({ instructions }) => {
  const steps = getSteps(instructions)
  const [pageWidth, setPageWidth] = useState(0)

  if (!steps.length) return null

  return (
    <View style={styles.instructionsContainer}>
      <Text style={styles.header}>Instructions</Text>
      <View style={styles.stepBlock} onLayout={(event) => setPageWidth(event.nativeEvent.layout.width)}>
        {pageWidth > 0 && (
          <FlatList
            data={steps}
            horizontal
            pagingEnabled
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.stepList}
            keyExtractor={(_, index) => String(index)}
            renderItem={({ item, index }) => (
              <View
                style={[styles.stepPage, { width: pageWidth }]}
                accessible
                accessibilityLabel={`Step ${index + 1} of ${steps.length}. ${item}`}
              >
                <Text style={styles.stepText}>{`${index + 1}. ${item}`}</Text>
              </View>
            )}
          />
        )}
        {steps.length > 1 ? (
          <View style={styles.stepHint} accessibilityLabel="Swipe">
            <ChevronLeft size={18} color="#4A4A4A" />
            <ChevronRight size={18} color="#4A4A4A" />
          </View>
        ) : null}
      </View>
    </View>
  )
}

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
            <InstructionCards instructions={item.instructions} />
            {item.source_url && (
              <View style={styles.linkContainer}>
                <Text style={styles.header}>Source:</Text>
                <View style={styles.linkWrapper}>
                  <Pressable
                    onPress={() => Linking.openURL(item.source_url)}
                    accessibilityRole="link"
                    accessibilityLabel="Open source article"
                  >
                    <Text style={styles.link}>{item.source_url}</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {item.youtube_url && (
              <View style={styles.linkContainer}>
                <Text style={styles.header}>Video:</Text>
                <View style={styles.linkWrapper}>
                  <Pressable
                    onPress={() => Linking.openURL(item.youtube_url)}
                    accessibilityRole="link"
                    accessibilityLabel="Open recipe video"
                  >
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
    paddingHorizontal: 16,
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
    gap: 10,
  },
  stepBlock: {
    width: '100%',
  },
  stepList: {
    flexGrow: 0,
  },
  stepPage: {
    backgroundColor: '#F3EEE4',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  stepText: {
    fontSize: 17,
    fontFamily: 'WorkSans-Light',
    lineHeight: 26,
    color: '#4A4A4A',
  },
  stepHint: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
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
