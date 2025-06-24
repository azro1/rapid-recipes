import { StyleSheet, View, Text, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const ScreenHeading = ({ showBackButton, navigation, screen }) => {
  return (
    <SafeAreaView style={styles.headingContainer}>
      {showBackButton ? (
        <Pressable onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </Pressable>
      ) : (
        <Pressable onPress={() => navigation.openDrawer()}>
          <Feather name="menu" size={24} color="#fff" />
        </Pressable>
      )}
      <Text style={styles.heading}>{screen}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#44bcb7',
  },
  heading: {
    fontSize: 20,
    fontFamily: 'WorkSans-medium',
    flexShrink: 1,
    color: '#fff',
  }
})



export default ScreenHeading
