/* بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ ﷺ InshaAllah */

import * as Linking from 'expo-linking';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { s } from './lib/strings';
import { colors } from './lib/theme';

import ContactScreen from './screens/ContactScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NaatDetailScreen from './screens/NaatDetailScreen';
import NewNaatsScreen from './screens/NewNaatsScreen';
import PopularScreen from './screens/PopularScreen';
import RegisterScreen from './screens/RegisterScreen';
import SearchScreen from './screens/SearchScreen';

import RegistrationSuccessScreen from './screens/RegistrationSuccessScreen';
import { tokenService } from './lib/tokenService';
import { useTokenStore } from './lib/token.store';
import { useEffect, useState } from 'react';
import NaatLoadingScreen from './components/NaatLoadingScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const navTheme = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.bg, primary: colors.emerald, card: colors.bg, text: colors.ink } };
const headerStyle = {
  headerStyle: { backgroundColor: colors.bg },
  headerShadowVisible: false,
  headerTintColor: colors.emerald,
  headerTitleStyle: { color: colors.ink, fontWeight: '700' },
};

const TAB_ICONS = {
  Home: ['home', 'home-outline'],
  New: ['sparkles', 'sparkles-outline'],
  Popular: ['flame', 'flame-outline'],
  Favorites: ['bookmark', 'bookmark-outline'],
  Contact: ['call', 'call-outline'],
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...headerStyle,
        lazy: true,
        headerShown: route.name !== 'Home',
        tabBarActiveTintColor: colors.emerald,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons name={TAB_ICONS[route.name][focused ? 0 : 1]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: s.home }} />
      <Tab.Screen name="New" component={NewNaatsScreen} options={{ title: s.new }} />
      <Tab.Screen name="Popular" component={PopularScreen} options={{ title: s.popular }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ title: s.favorites }} />
      <Tab.Screen name="Contact" component={ContactScreen} options={{ title: s.contact }} />
    </Tab.Navigator>
  );
}

// Logout button shown in every admin header.
const adminOptions = ({ navigation }) => ({
  headerRight: () => (
    <Pressable hitSlop={8} accessibilityLabel={s.logout} onPress={() => navigation.popToTop()}>
      <Ionicons name="log-out-outline" size={24} color={colors.emerald} />
    </Pressable>
  ),
});

const linking = {
  prefixes: [Linking.createURL('/'), 'banglanaat://'],
  config: {
    screens: {
      RegistrationSuccess: 'registration-success',
    },
  },
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const isLoggedOut = useTokenStore(state => state.isLoggedOut);
  const Loggout = useTokenStore(state => state.Loggout);
  const Login = useTokenStore(state => state.Login);

  useEffect(() => {
    setTimeout(() => {
      let token = tokenService.getBearerToken();
      if (!token) Loggout();
      else Login(token);
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) return <NaatLoadingScreen />;
  

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer theme={navTheme} linking={linking}>
        <Stack.Navigator screenOptions={headerStyle}  >
          {
            isLoggedOut ?
              (
                <>
                  <Stack.Screen name="Register" component={RegisterScreen} options={{ title: s.register }} />
                  <Stack.Screen name="Login" component={LoginScreen} options={{ title: s.login }} />
                  <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: s.forgot }} />
                  <Stack.Screen name='RegistrationSuccess' component={RegistrationSuccessScreen} options={{ title: 'Registration SuccessFul' }} />
                </>
              )
              :
              (
                <>
                  <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
                  <Stack.Screen name="Search" component={SearchScreen} options={{ title: s.search }} />
                  <Stack.Screen name="NaatDetail" component={NaatDetailScreen} options={{ title: '' }} />
                </>
              )
          }

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
