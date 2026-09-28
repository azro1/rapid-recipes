import { useState } from 'react'
import { StyleSheet, View, Text, Pressable, Linking, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ScreenHeading from '../components/screenHeading'
import Header from '../components/header'

const SUPPORT_EMAIL = 'rapidrecipies.support@gmail.com'
const APP_VERSION = '1.0.0'

const privacy = [
  'This policy explains what information is involved when you use Rapid Recipes.',
  'Rapid Recipes is operated by Simon Sutherland. You can contact us at rapidrecipies.support@gmail.com.',
  'We do not ask you to create an account. We do not ask for your name, email address, or phone number inside the app.',
  'Recipes you save are stored on your device only. They are not sent to us. Removing a saved recipe deletes it from that device. Uninstalling the app deletes the saved recipes stored on that device.',
  'When you open a category or a recipe, the app requests that content so it can be shown to you. The request is handled by our service provider, Supabase, which retrieves recipe information from TheMealDB. Those providers may process technical information, such as an IP address, in order to deliver the request.',
  'If you email us, we receive the address you write from and the message you send. We use that information to reply to you.',
  'A recipe may include a link to a source page or a video. If you open that link, you leave Rapid Recipes. The other site\'s own policy then applies.',
  'We do not sell your information. We do not show advertising in the app. We do not use Rapid Recipes to follow you across other companies\' apps or websites.',
  'Rapid Recipes is not directed at children under 13.',
  'We may update this policy. When we do, the date at the top of this page will change.',
]

const About = ({ navigation }) => {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const insets = useSafeAreaInsets()
  const headingNavigation = showPrivacy
    ? { ...navigation, goBack: () => setShowPrivacy(false) }
    : navigation

  return (
    <View style={styles.container}>
      <ScreenHeading
        showBackButton={true}
        navigation={headingNavigation}
        screen={showPrivacy ? 'Privacy Policy' : 'About Us'}
      />
      <ScrollView contentContainerStyle={[styles.intro, { paddingBottom: insets.bottom + 32 }]}>
        {showPrivacy ? (
          <>
            <Header fontSize={30} title="Privacy policy" align="left" />
            <Text style={styles.note}>Rapid Recipes · Last updated 25 September 2026</Text>
            {privacy.map((paragraph) => (
              <Text key={paragraph} style={styles.text}>{paragraph}</Text>
            ))}
            <Pressable
              onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
              accessibilityRole="link"
              accessibilityLabel={`Email ${SUPPORT_EMAIL}`}
            >
              <Text style={styles.link}>Questions about this policy can be sent to {SUPPORT_EMAIL}</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Header fontSize={30} title="About Rapid Recipes" align="left" />
            <Text style={styles.text}>At Rapid Recipes, we believe cooking should be simple, quick, and enjoyable.</Text>
            <Text style={styles.text}>We’re here to make it easier to find great recipes without the hassle. From quick meals to everyday favourites, Rapid Recipes gives you clear instructions and straightforward recipes designed to help you get cooking and get on with your day.</Text>
            <Text style={styles.text}>No complicated techniques or unnecessary fuss — just good recipes and simple guidance.</Text>
            <View style={[styles.fact, styles.firstFact]}>
              <Text style={styles.label}>Version</Text>
              <Text style={styles.value}>{APP_VERSION}</Text>
            </View>
            <View style={styles.fact}>
              <Text style={styles.label}>Developer</Text>
              <Text style={styles.value}>Simon Sutherland / Rapid Recipes</Text>
            </View>
            <View style={styles.fact}>
              <Text style={styles.label}>Contact</Text>
              <Pressable
                onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
                accessibilityRole="link"
                accessibilityLabel={`Email ${SUPPORT_EMAIL}`}
              >
                <Text style={[styles.value, styles.underline]}>{SUPPORT_EMAIL}</Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => setShowPrivacy(true)}
              accessibilityRole="button"
              accessibilityLabel="Open privacy policy"
            >
              <Text style={[styles.value, styles.underline]}>Privacy Policy</Text>
            </Pressable>
            <View style={styles.fact}>
              <Text style={styles.label}>Updates</Text>
              <Text style={styles.text}>Updates are delivered through Google Play.</Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  intro: {
    gap: 20,
    paddingTop: 40,
    maxWidth: 1960,
    marginHorizontal: 'auto',
    width: '100%',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'left',
    fontSize: 17,
    fontFamily: 'WorkSans-Light',
    lineHeight: 28,
    color: '#4A4A4A',
  },
  note: {
    fontSize: 16,
    fontFamily: 'WorkSans-Light',
    color: '#4A4A4A',
  },
  fact: {
    gap: 4,
  },
  firstFact: {
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: 'WorkSans-Medium',
    color: '#4A4A4A',
  },
  value: {
    fontSize: 17,
    fontFamily: 'WorkSans-Light',
    lineHeight: 28,
    color: '#4A4A4A',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  link: {
    fontSize: 17,
    fontFamily: 'WorkSans-Medium',
    color: '#3A5743',
  },
})

export default About
