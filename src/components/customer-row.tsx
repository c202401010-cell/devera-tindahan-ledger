import{ Pressable, Text, View} from "react-native";
import{ useState } from "react";
import{ ThemedText } from "@/components/themed-text";

type CustomerRowProps = { name:string; balance: number; lastPaid: string};

export function CustomerRow({ name, balance, lastPaid}: CustomerRowProps) {
    const [expanded, setExpanded] = useState(false);
    return (
        <Pressable
        onPress={() => setExpanded(!expanded)}
        style={{ paddingVertical: 14, borderBottomWidth: 1, borderColor: "#ddd"}}>
            <ThemedText style={{ fontSize: 18}}>{name}</ThemedText>
            <ThemedText>P {balance.toFixed(2)}</ThemedText>
            {expanded && <ThemedText>Last paid {lastPaid}</ThemedText>}
        </Pressable>
    );
}