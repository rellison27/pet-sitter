import { View, StyleSheet } from "react-native";
import { ThemedText } from "./themed-text";
import { Spacing, Colors } from "@/constants/theme";

export default function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <ThemedText>{label}</ThemedText>

      {children}

      {error && (
        <ThemedText type="small" style={styles.errorText}>
          {error}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: Spacing.two,
  },

  errorText: {
    color: Colors.light.error,
  },
});
