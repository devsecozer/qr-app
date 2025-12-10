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
        options={{ title: "Scan", tabBarIcon: () => <MaterialIcons name="qr-code-scanner" size={20} /> }}
      />
      <Tabs.Screen
        name="generate"      // app/tabs/generate.tsx (aşağıda oluştur)
        options={{ title: "Generate", tabBarIcon: () => <MaterialIcons name="qr-code" size={20} /> }}
      />
      <Tabs.Screen
        name="../model"      // opsiyonel: tabs içinden modal açmak istersen
        options={{ title: "Model", tabBarButton: () => null }}
      />
    </Tabs>
  );
}
