import { useState } from 'react'
import { StyleSheet, View, Text, Pressable, Image, FlatList, ActivityIndicator, TextInput, Alert } from 'react-native'
import Header from '../components/header'
import Card from '../components/card'
import globalStyles from '../styles/global'

const HAVE = [
  { label: 'Chicken', query: 'chicken' },
  { label: 'Beef', query: 'beef' },
  { label: 'Rice', query: 'rice' },
  { label: 'Pasta', query: 'spaghetti' },
  { label: 'Peppers', query: 'green pepper' },
  { label: 'Onion', query: 'onion' },
  { label: 'Tomato', query: 'tomato' },
  { label: 'Potatoes', query: 'potatoes' },
  { label: 'Eggs', query: 'egg' },
  { label: 'Cheese', query: 'cheddar cheese' },
  { label: 'Mushrooms', query: 'mushrooms' },
  { label: 'Garlic', query: 'garlic' },
  { label: 'Carrots', query: 'carrots' },
  { label: 'Salmon', query: 'salmon' },
  { label: 'Prawns', query: 'prawns' },
  { label: 'Bacon', query: 'bacon' },
]

const LEFTOVER = [
  {
    label: 'Roast chicken',
    query: 'chicken',
    cooked: /\b(leftover|left[- ]over|already cooked|pre-?cooked)\s+(roast\s+)?chicken\b|\bcooked chicken\b/i,
    raw: /\b(brown|fry|roast|bake|grill|poach|sauté|saute)\b(?:\s+\w+){0,5}\schicken\b/i,
  },
  {
    label: 'Cooked rice',
    query: 'rice',
    cooked: /\b(leftover|left[- ]over|day[- ]old|cold)\s+rice\b|\bcooked rice\b/i,
    raw: /\b(boil|simmer|rinse)\b(?:\s+\w+){0,5}\srice\b/i,
  },
  {
    label: 'Pasta',
    query: 'spaghetti',
    cooked: /\b(leftover|left[- ]over|already cooked)\s+(pasta|spaghetti|noodles)\b|\bcooked (pasta|spaghetti)\b/i,
    raw: /\b(boil|cook)\b(?:\s+\w+){0,5}\s(pasta|spaghetti)\b/i,
  },
  {
    label: 'Roast potatoes',
    query: 'potatoes',
    cooked: /\b(leftover|left[- ]over|already cooked)\s+(roast\s+)?potatoes\b|\bcooked potatoes\b/i,
    raw: /\b(roast|boil|fry|bake)\b(?:\s+\w+){0,5}\spotatoes\b/i,
  },
  {
    label: 'Roast beef',
    query: 'beef',
    cooked: /\b(leftover|left[- ]over|already cooked)\s+(roast\s+)?beef\b|\bcooked beef\b/i,
    raw: /\b(brown|fry|roast|bake|grill|sear)\b(?:\s+\w+){0,5}\sbeef\b/i,
  },
  {
    label: 'Cooked salmon',
    query: 'salmon',
    cooked: /\b(leftover|left[- ]over|already cooked|flaked)\s+salmon\b|\bcooked salmon\b/i,
    raw: /\b(bake|grill|fry|poach|roast)\b(?:\s+\w+){0,5}\ssalmon\b/i,
  },
  {
    label: 'Bread',
    query: 'bread',
    cooked: /\b(leftover|left[- ]over|stale|day[- ]old)\s+bread\b/i,
    raw: null,
  },
  {
    label: 'Bacon',
    query: 'bacon',
    cooked: /\b(leftover|left[- ]over)\s+bacon\b|\bcooked bacon\b/i,
    raw: /\b(fry|cook|grill|bake)\b(?:\s+\w+){0,5}\sbacon\b/i,
  },
]

const COPY = {
  have: {
    title: 'Use What You Have',
    lead: 'Select the ingredients you have to find recipes that use them.',
    items: HAVE,
  },
  leftover: {
    title: 'Leftover Meals',
    lead: 'Select food you\'ve already cooked and have left over.',
    items: LEFTOVER,
  },
}

const usesCookedFood = (instructions, item) => {
  if (!item.cooked?.test(instructions)) return false
  if (item.raw?.test(instructions)) return false
  return true
}

const recipeInstructions = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  if (!response.ok) throw new Error('Recipe search failed')
  const data = await response.json()
  return data.meals?.[0]?.strInstructions || ''
}

const findRecipes = async (items, leftovers) => {
  const lists = await Promise.all(items.map(async (item) => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(item.query)}`,
    )
    if (!response.ok) throw new Error('Recipe search failed')
    const data = await response.json()
    return { label: item.label, meals: data.meals || [] }
  }))

  const byId = new Map()
  lists.forEach((list) => {
    list.meals.forEach((meal) => {
      const existing = byId.get(meal.idMeal) || {
        id: meal.idMeal,
        dish: meal.strMeal,
        image_url: meal.strMealThumb,
        labels: [],
      }
      existing.labels.push(list.label)
      byId.set(meal.idMeal, existing)
    })
  })

  let matches = [...byId.values()]
    .sort((a, b) => b.labels.length - a.labels.length || a.dish.localeCompare(b.dish))

  if (leftovers) {
    const checked = []
    const candidates = matches.slice(0, 24)
    for (let index = 0; index < candidates.length; index += 4) {
      const chunk = candidates.slice(index, index + 4)
      const details = await Promise.all(chunk.map(async (meal) => {
        const instructions = await recipeInstructions(meal.id)
        const labels = meal.labels.filter((label) => {
          const item = items.find((entry) => entry.label === label)
          return usesCookedFood(instructions, item)
        })
        return { ...meal, labels }
      }))
      checked.push(...details)
    }
    matches = checked.filter((meal) => meal.labels.length > 0)
  }

  return matches.slice(0, 24)
}

export const SustainabilityHome = ({ navigation }) => {
  return (
    <View style={styles.content}>
      <Header fontSize={30} title="Sustainability" align="left" />
      <Text style={styles.lead}>Use the food you already have and help reduce food waste.</Text>
      <Pressable
        onPress={() => navigation.navigate('About', { heading: 'Sustainability' })}
        accessibilityRole="link"
        accessibilityLabel="Why this matters"
      >
        <Text style={styles.aboutLink}>Why this matters</Text>
      </Pressable>
      <Pressable
        style={styles.choice}
        onPress={() => navigation.navigate('Pick', { mode: 'have', heading: 'Use What You Have' })}
        accessibilityRole="button"
        accessibilityLabel="Use What You Have"
      >
        <Text style={styles.choiceTitle}>Use What You Have</Text>
        <Text style={styles.choiceText}>Find recipes using ingredients you haven't used yet.</Text>
      </Pressable>
      <Pressable
        style={styles.choice}
        onPress={() => navigation.navigate('Pick', { mode: 'leftover', heading: 'Leftover Meals' })}
        accessibilityRole="button"
        accessibilityLabel="Leftover Meals"
      >
        <Text style={styles.choiceTitle}>Leftover Meals</Text>
        <Text style={styles.choiceText}>Find recipes using food you've already cooked and have left over.</Text>
      </Pressable>
    </View>
  )
}

export const SustainabilityAbout = () => {
  return (
    <View style={styles.content}>
      <Header fontSize={30} title="What is sustainability?" align="left" />
      <Text style={styles.lead}>
        Sustainability means making choices that help reduce waste and make better use of the resources we have. Rapid Recipes does its bit by helping you find recipes for food you already have, so less food goes to waste.
      </Text>
    </View>
  )
}

export const FoodPick = ({ navigation, route }) => {
  const mode = route.params?.mode
  const copy = COPY[mode]
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState([])
  const [ingredientInput, setIngredientInput] = useState('')

  const pickerItems = [...(copy?.items || []), ...added]

  const addIngredient = () => {
    const name = ingredientInput.trim().replace(/\s+/g, ' ')
    if (!name) return
    const existing = pickerItems.find((item) => item.label.toLowerCase() === name.toLowerCase())
    if (existing) {
      setSelected((current) => current.includes(existing.label) ? current : [...current, existing.label])
    } else {
      const label = name.charAt(0).toUpperCase() + name.slice(1)
      const query = name.toLowerCase()
      const item = { label, query }
      if (mode === 'leftover') {
        const phrase = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        item.cooked = new RegExp(`\\b(leftover|left[- ]over|already cooked|pre-?cooked|cooked)\\s+${phrase}\\b`, 'i')
        item.raw = new RegExp(`\\b(brown|fry|roast|bake|grill|poach|boil|simmer)\\b(?:\\s+\\w+){0,5}\\s${phrase}\\b`, 'i')
      }
      setAdded((current) => [...current, item])
      setSelected((current) => [...current, label])
    }
    setIngredientInput('')
  }

  const deleteIngredient = (label) => {
    Alert.alert('Delete ingredient', `Remove ${label}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setAdded((current) => current.filter((item) => item.label !== label))
          setSelected((current) => current.filter((item) => item !== label))
        },
      },
    ])
  }

  const toggle = (label) => {
    setSelected((current) => (
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    ))
  }

  const search = async () => {
    const items = pickerItems.filter((item) => selected.includes(item.label))
    setLoading(true)
    setError(null)
    try {
      const matches = await findRecipes(items, mode === 'leftover')
      navigation.navigate('Results', {
        heading: copy.title,
        results: matches,
        total: selected.length,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.content}>
            <Header fontSize={30} title={copy.title} align="left" />
            <Text style={styles.lead}>{copy.lead}</Text>
            <View style={styles.ingredientRow}>
              <TextInput
                value={ingredientInput}
                onChangeText={setIngredientInput}
                onSubmitEditing={addIngredient}
                placeholder={mode === 'have' ? 'Add an ingredient' : 'Add a food'}
                accessibilityLabel={mode === 'have' ? 'Add an ingredient' : 'Add a food'}
                placeholderTextColor="#8A8478"
                style={styles.ingredientInput}
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="done"
              />
              <Pressable
                style={styles.addButton}
                onPress={addIngredient}
                accessibilityRole="button"
                accessibilityLabel={mode === 'have' ? 'Add ingredient' : 'Add food'}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </Pressable>
            </View>
            <View style={styles.chips}>
              {pickerItems.map((item) => {
                const on = selected.includes(item.label)
                const custom = added.some((entry) => entry.label === item.label)
                return (
                  <Pressable
                    key={item.label}
                    style={[styles.chip, on && styles.chipOn]}
                    onPress={() => toggle(item.label)}
                    onLongPress={custom ? () => deleteIngredient(item.label) : undefined}
                    accessibilityRole="button"
                    accessibilityLabel={custom ? `${item.label}. Long press to delete` : item.label}
                    accessibilityState={{ selected: on }}
                  >
                    <Text style={[styles.chipText, on && styles.chipTextOn]}>{item.label}</Text>
                  </Pressable>
                )
              })}
            </View>
            {error ? <Text style={globalStyles.error}>{error}</Text> : null}
            <Pressable
              style={[globalStyles.button, styles.button, selected.length === 0 && styles.buttonOff]}
              onPress={search}
              disabled={selected.length === 0 || loading}
              accessibilityRole="button"
              accessibilityLabel="Find recipes"
            >
              {loading
                ? <ActivityIndicator color="#FFFFFF" />
                : <Text style={globalStyles.buttonText}>Find recipes</Text>}
            </Pressable>
    </View>
  )
}

export const FoodResults = ({ navigation, route }) => {
  const { heading, results = [], total = 0 } = route.params || {}

  const openRecipe = (item) => {
    navigation.navigate('Menu', {
      screen: 'Recipe',
      params: { dish: item.dish, id: item.id },
    })
  }

  return (
    <View style={styles.content}>
      <Header fontSize={30} title={heading} align="left" />
      {results.length === 0 ? (
        <Text style={styles.lead}>No matching recipes found. Try selecting different foods.</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => openRecipe(item)}
              accessibilityRole="button"
              accessibilityLabel={item.dish}
            >
              <Card>
                <View style={styles.row}>
                  <Image source={{ uri: item.image_url }} style={styles.image} accessible={false} />
                  <View style={styles.meta}>
                    <Text style={styles.name} numberOfLines={2}>{item.dish}</Text>
                    <Text style={styles.match}>
                      {`Uses ${item.labels.length} of ${total}: ${item.labels.join(', ')}`}
                    </Text>
                  </View>
                </View>
              </Card>
            </Pressable>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginTop: 40,
    paddingHorizontal: 16,
  },
  lead: {
    marginTop: 16,
    fontSize: 17,
    fontFamily: 'WorkSans-Light',
    lineHeight: 26,
    color: '#4A4A4A',
  },
  ingredientRow: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ingredientInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#D9D3C7',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    color: '#4A4A4A',
  },
  addButton: {
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#D94F30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'WorkSans-Bold',
  },
  aboutLink: {
    marginTop: 10,
    fontSize: 15,
    fontFamily: 'WorkSans-Medium',
    color: '#3A5743',
  },
  choice: {
    marginTop: 16,
    backgroundColor: '#F3EEE4',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  choiceTitle: {
    fontSize: 18,
    fontFamily: 'WorkSans-Medium',
    color: '#3A5743',
  },
  choiceText: {
    marginTop: 6,
    fontSize: 16,
    fontFamily: 'WorkSans-Light',
    lineHeight: 24,
    color: '#4A4A4A',
  },
  chips: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E6E0D4',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  chipOn: {
    backgroundColor: '#3A5743',
    borderColor: '#3A5743',
  },
  chipText: {
    fontSize: 15,
    fontFamily: 'WorkSans-Medium',
    color: '#4A4A4A',
  },
  chipTextOn: {
    color: '#FFFFFF',
  },
  button: {
    marginTop: 24,
    alignSelf: 'flex-start',
  },
  buttonOff: {
    opacity: 0.45,
  },
  list: {
    paddingTop: 8,
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
  match: {
    fontSize: 15,
    fontFamily: 'WorkSans-Light',
    lineHeight: 22,
    color: '#4A4A4A',
  },
})

