import {StyleSheet, View, Text} from 'react-native'

const Header = ({ marginTop, paddingBottom, fontSize, title }) => {
  return (
    <View style={{ marginTop: marginTop, paddingBottom: paddingBottom }}>
       <Text style={[styles.headerText, fontSize ? { fontSize } : null]}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    paddingHorizontal: 12,
    textAlign: 'center',
    fontFamily: 'WorkSans-ExtraBold',
    fontSize: 40,
    color: "#5F9EA0",
  }
})

export default Header
