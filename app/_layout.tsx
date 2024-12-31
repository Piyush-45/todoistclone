import { Stack, useRouter, useSegments, usePathname, useNavigationContainerRef } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Suspense, useEffect } from 'react';
import { View, ActivityIndicator, LogBox } from 'react-native';
import { Colors } from '@/constants/Colors';
import { tokenCache } from '@/utils/cache';
import { Toaster } from 'sonner-native';
import migrations from '@/drizzle/migrations';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { SQLiteProvider, openDatabaseSync } from 'expo-sqlite';
import { useDrizzleStudio } from "expo-drizzle-studio-plugin"
import { addDummyData } from '@/utils/addDummyData';


import { PaperProvider } from 'react-native-paper';


const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY as string;
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}
LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys']);

const InitialLayout = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;
    const inAuthGroup = segments[0] === '(authenticated)';

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/today');
    } else if (!isSignedIn && pathname !== '/') {
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
    </Stack>
  );
};

function Loading() {
  return <ActivityIndicator size="large" color={Colors.primary} />;
}

const RootLayoutNav = () => {
  // !1. Creating the SQLite Database:
  const expoDb = openDatabaseSync('todos.db');
  const db = drizzle(expoDb);
  const { success, error } = useMigrations(db, migrations);
  
  useEffect(() => {
    if (!success) return;
    addDummyData(db);
  }, [success]);

useDrizzleStudio(db);
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Suspense fallback={<Loading />}>
          <SQLiteProvider
            databaseName="todos.db"
            options={{ enableChangeListener: true }}
            useSuspense>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <PaperProvider>
                <Toaster />
                <InitialLayout />
              </PaperProvider>
            </GestureHandlerRootView>
          </SQLiteProvider>
        </Suspense>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayoutNav