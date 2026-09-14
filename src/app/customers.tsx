import { ThemedText } from "@/components/themed-text";
import { Button, FlatList, Text, TextInput} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomerRow } from "@/components/customer-row";
import { SEED } from "@/data/customers";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

export default function CustomersScreen() {
    const theme = useTheme();
    const [customers, setCustomers] = useState(SEED);
    const [query, setQuery] = useState("");
    const shown = customers.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())
);
    const total = shown.reduce((sum, c) => sum + c.balance, 0);

    function addWalkin() {
        const id = String(Date.now());
        const walkIn = {id, name: "Walk-in", balance: 0, lastPaid: "Never"};
        setCustomers([...customers, walkIn]);
    }

    return (
        <SafeAreaView style={{ flex: 1, padding: 24, gap: 12}}>
            <ThemedText style={{ fontSize: 28, fontWeight: "600"}}>Customers</ThemedText>
            <TextInput
            placeholderTextColor={'#ffffff'}
             value={query}
             onChangeText={setQuery}
             placeholder="Search Customers"
             style={{ borderWidth: 1, borderRadius: 8, padding: 12, color: theme.text}}
             />
            <ThemedText style={{ fontSize: 18 }}>Total owed: p {total.toFixed(2)}</ThemedText>
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














































































































