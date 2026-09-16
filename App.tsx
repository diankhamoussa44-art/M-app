import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, ActivityIndicator } from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen';
import CoursesScreen from './screens/CoursesScreen';
import CourseDetailScreen from './screens/CourseDetailScreen';
import LessonScreen from './screens/LessonScreen';
import QuizScreen from './screens/QuizScreen';
import ProgressScreen from './screens/ProgressScreen';
import ProfileScreen from './screens/ProfileScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Cours: { selectedCategory?: string } | undefined;
  CourseDetail: { courseId: string };
  Lesson: { courseId: string; lessonId: string };
  Quiz: { courseId: string };
  Progress: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="Lesson" component={LessonScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}

function CoursesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cours" component={CoursesScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="Lesson" component={LessonScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
}

function ProgressStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Progress" component={ProgressScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' }}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={{ marginTop: 12, fontSize: 14, color: '#9CA3AF' }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#6366F1',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '600',
            marginTop: 2,
          },
          tabBarIcon: ({ color, size, focused }) => {
            let iconName: string = 'home';
            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cours') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Progression') {
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName as any} size={size + 2} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Accueil" component={HomeStack} />
        <Tab.Screen name="Cours" component={CoursesStack} />
        <Tab.Screen name="Progression" component={ProgressStack} />
        <Tab.Screen name="Profil" component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
