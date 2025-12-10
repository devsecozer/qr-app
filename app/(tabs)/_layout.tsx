// app/tabs/_layout.tsx
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"         // app/tabs/index.tsx
        options={{ title: "Home", tabBarIcon: () => <MaterialIcons name="home" size={20} /> }}
      />
      <Tabs.Screen
        name="generate"      // app/tabs/generate.tsx (aşağıda oluştur)
        options={{ title: "Generate", tabBarIcon: () => <MaterialIcons name="qr-code" size={20} /> }}
      />
      <Tabs.Screen
        name="scanner"         // app/tabs/index.tsx
        options={{ title: "Scanner", tabBarIcon: () => <MaterialIcons name="qr-code-scanner" size={20} /> }}
      />
      
    </Tabs>
  );
}
