import { CustomerRow } from "@/components/customer-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Customer, fetchCustomers } from "@/data/customers";
import { problemFor, Status } from "@/data/problem";
import { useTheme } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomersScreen() {
  const theme = useTheme();

  const [status, setStatus] = useState<Status>("loading");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [problem, setProblem] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setStatus("loading");
     fetchCustomers()
      .then((rows) => {
     setCustomers(rows);
    setStatus(rows.length === 0 ? "empty" : "content");
  })
.catch((e) => {
  setProblem(problemFor(e));
 setStatus("error");
 });
}, [attempt]);

 
  function addWalkin() {
    const id = String(Date.now());
    const walkIn = { id, name: "Walk-in", balance: 0, lastPaid: "Never" };
    setCustomers([...customers, walkIn]);
  }

  if (status === "loading") 
    return (
      <ThemedView style={styles.middle}>
        <ActivityIndicator />
      </ThemedView>
    );
  

  if (status === "error") 
    return (
      <ThemedView style={styles.middle}>
        <ThemedText>{problem}</ThemedText>
        <Button title="Try again" onPress={() => setAttempt(attempt + 1)} />
      </ThemedView>
    );
  

  if (status === "empty") 
    return (
      <ThemedView style={styles.middle}>
        <ThemedText>No customers yet.</ThemedText>
      </ThemedView>
    );
  
   const shown = customers.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );
  const total = shown.reduce((sum, c) => sum + c.balance, 0);
  return (
    <SafeAreaView style={{ flex: 1, padding: 24, gap: 12 }}>
      <ThemedText style={{ fontSize: 28, fontWeight: "600" }}>Customers</ThemedText>
      <TextInput
        placeholderTextColor={'#ffffff'}
        value={query}
        onChangeText={setQuery}
        placeholder="Search Customers"
        style={{ borderWidth: 1, borderRadius: 8, padding: 12, color: theme.text }}
      />
      <ThemedText style={{ fontSize: 18 }}>Total owed: ₱ {total.toFixed(2)}</ThemedText>
      <Button title="Add Walk-in" onPress={addWalkin} />
      <FlatList 
        data={shown}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => <CustomerRow {...item}/>}
        ListEmptyComponent={<ThemedText>No customers match "{query}".</ThemedText>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  middle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});