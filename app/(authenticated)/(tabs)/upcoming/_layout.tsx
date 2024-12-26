import { Stack } from 'expo-router';


const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShadowVisible: false,
          title: 'Upcoming',
          headerLargeTitle:true
          // headerRight: () => <MoreButton pageName="Upcoming" />,
        }}
      />
    </Stack>
  );
};
export default Layout;