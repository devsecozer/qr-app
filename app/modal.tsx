// app/modal.tsx
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      <Button title="Close" onPress={() => router.back()} />

      <View style={{ height: 10 }} />

      <Button title="return tabs" onPress={() => router.push("/(tabs)/generate")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1, alignItems:'center', justifyContent:'center', padding:20
  },
  title: {
    fontSize:18, fontWeight:'700'
  }
});
