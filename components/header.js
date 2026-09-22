import {StyleSheet, View, Text} from 'react-native'

const Header = ({ marginTop, paddingBottom, fontSize, lineHeight, title, align = 'center', fit = false }) => {
  return (
    <View style={{ marginTop: marginTop, paddingBottom: paddingBottom, width: fit ? '100%' : undefined }}>
       <Text
         numberOfLines={fit ? 1 : undefined}
         adjustsFontSizeToFit={fit}
         minimumFontScale={0.8}
         style={[
           styles.headerText,
           fontSize ? { fontSize } : null,
           lineHeight ? { lineHeight } : null,
           { textAlign: align, paddingHorizontal: align === 'left' ? 0 : 12 },
           fit ? { width: '100%', paddingHorizontal: 6 } : null,
         ]}
       >{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontFamily: 'WorkSans-ExtraBold',
    fontSize: 40,
    color: "#3A5743",
  }
})

export default Header
