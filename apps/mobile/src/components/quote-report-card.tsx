import { QuoteResponse } from "@pet-sitting/shared";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { StyleSheet } from "react-native";
import { Spacing } from "@/constants/theme";

type QuoteReportCardProps = {
  quote?: QuoteResponse;
};
export default function QuoteReportCard({ quote }: QuoteReportCardProps) {
  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <ThemedText type="subtitle">Live Quote</ThemedText>
      <ThemedText type="small">
        As you change your options give us a second to adjust the price
      </ThemedText>
      <ThemedText>
        Base services: {quote ? `$${quote?.basePrice}` : ""}
      </ThemedText>
      <ThemedText>
        Pet sitting:
        {quote
          ? `${quote?.hourlyRate} x ${quote?.hours} hours $${quote?.hourlyRate * quote?.hours}`
          : ""}
      </ThemedText>
      <ThemedText>Total: {quote ? `$${quote?.totalPrice}` : ""}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.four,
  },
});
