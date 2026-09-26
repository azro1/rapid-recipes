import { StyleSheet, Text, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const ScreenHeading = ({ showBackButton, navigation, screen }) => {
  return (
    <SafeAreaView style={styles.headingContainer}>
      {showBackButton ? (
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={12}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </Pressable>
      ) : null}
      <Text style={styles.heading}>{screen}</Text>
      <Pressable
        onPress={() => navigation.openDrawer()}
        accessibilityRole="button"
        accessibilityLabel="Open menu"
        hitSlop={12}
      >
        <Feather name="menu" size={24} color="#fff" />
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headingContainer: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#3A5743',
  },
  heading: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'WorkSans-Regular',
    color: '#fff',
  }
})

export default ScreenHeading
