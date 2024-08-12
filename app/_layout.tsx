import { JellyfinProvider } from "@/providers/JellyfinProvider";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Provider as JotaiProvider } from "jotai";
import { useEffect, useRef } from "react";
import { Platform, TouchableOpacity } from "react-native";
import "react-native-reanimated";

import Feather from "@expo/vector-icons/Feather";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { View } from "react-native";
import { Text } from "@/components/common/Text";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Video from "react-native-video";
import { CurrentlyPlayingBar } from "@/components/CurrentlyPlayingBar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(auth)/(tabs)/",
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const queryClientRef = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60,
          refetchOnMount: true,
          refetchOnReconnect: true,
          refetchOnWindowFocus: true,
          retryOnMount: true,
        },
      },
    }),
  );

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <JotaiProvider>
        <JellyfinProvider>
          <StatusBar style="light" backgroundColor="#000" />
          <ThemeProvider value={DarkTheme}>
            <Stack>
              <Stack.Screen
                name="(auth)/(tabs)"
                options={{
                  headerShown: false,
                  title: "Home",
                }}
              />
              <Stack.Screen
                name="(auth)/settings"
                options={{
                  headerShown: true,
                  title: "Settings",
                  headerStyle: { backgroundColor: "black" },
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                name="(auth)/downloads"
                options={{
                  headerShown: true,
                  title: "Downloads",
                  headerStyle: { backgroundColor: "black" },
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                name="(auth)/items/[id]/page"
                options={{
                  title: "",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(auth)/collections/[collection]/page"
                options={{
                  title: "",
                  headerShown: true,
                  headerStyle: { backgroundColor: "black" },
                  headerShadowVisible: false,
                }}
              />
              <Stack.Screen
                name="(auth)/series/[id]/page"
                options={{
                  title: "",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="login"
                options={{ headerShown: false, title: "Login" }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <CurrentlyPlayingBar />
          </ThemeProvider>
        </JellyfinProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
