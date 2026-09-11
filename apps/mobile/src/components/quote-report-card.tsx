import { QuoteResponse } from "@pet-sitting/shared";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { StyleSheet, View } from "react-native";
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
      <View style={styles.quoteRow}>
        <ThemedText>Base services:</ThemedText>
        <ThemedText>{quote ? `$${quote?.basePrice}` : ""}</ThemedText>
      </View>

      <View>
        <ThemedText>Pet sitting:</ThemedText>
        <View style={styles.quoteRow}>
          <ThemedText>
            {quote ? `${quote?.hourlyRate} x ${quote?.hours} hours` : ""}
          </ThemedText>
          <ThemedText>
            {quote ? `$${quote?.hourlyRate * quote?.hours}` : ""}
          </ThemedText>
        </View>
      </View>
      <View style={styles.quoteRow}>
        <ThemedText>Total: </ThemedText>
        <ThemedText>{quote ? `$${quote?.totalPrice}` : ""}</ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.four,
  },
  quoteRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
});
