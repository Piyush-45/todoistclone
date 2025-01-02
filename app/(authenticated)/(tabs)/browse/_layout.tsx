import { Link, router, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Image, TouchableOpacity } from 'react-native';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native';

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        contentStyle: { backgroundColor: Colors.backgroundAlt },
      }}>
       <Stack.Screen
        name="index"
        options={{
          title: 'Browse', 
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight />,
        }}
      />
       <Stack.Screen
        name="settings"
        options={{
          title: 'Settings',
          presentation: 'modal',
          headerTransparent: true,
          headerRight: () => (
            <Button title="Done" onPress={() => router.dismiss()} color={Colors.primary} />
          ),
        }}
      />
      <Stack.Screen
        name="newproject"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
     
    </Stack>
  );
};

const HeaderLeft = () => {
  const { user } = useUser();

  return (
    <TouchableOpacity onPress={()=>console.log("profie clicked")} >
      <Image source={{ uri: user?.imageUrl }} style={{ width: 32, height: 32, borderRadius: 16 ,zIndex:1000}} />
    </TouchableOpacity>
  );
};

const HeaderRight = () => {
  return (
<Link href="/browse/settings" asChild>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </Link>
  );
};
export default Layout;