import { StyleSheet, View, Text, Pressable } from 'react-native'

import Header from '../components/header'

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header
          fontSize={30}
          title="Welcome to Rapid Recipes"
        />
        <Pressable
          style={styles.choice}
          onPress={() => navigation.navigate('Categories')}
          accessibilityRole="button"
          accessibilityLabel="Choose a category"
        >
          <Text style={styles.choiceTitle}>Choose a Category</Text>
          <Text style={styles.choiceText}>Browse recipes by category.</Text>
        </Pressable>
        <Text style={styles.or}>OR</Text>
        <Pressable
          style={styles.choice}
          onPress={() => navigation.navigate('Recipe', { picked: true, pickNow: Date.now() })}
          accessibilityRole="button"
          accessibilityLabel="Pick for me"
        >
          <Text style={styles.choiceTitle}>Pick for Me</Text>
          <Text style={styles.choiceText}>Not sure what to cook? We'll choose a recipe for you.</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    marginTop: 48,
  },
  choice: {
    marginTop: 20,
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
  or: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'WorkSans-Medium',
    letterSpacing: 1,
    color: '#8A8478',
  },
})

export default Welcome
