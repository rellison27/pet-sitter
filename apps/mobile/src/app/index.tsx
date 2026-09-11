import { useState, useEffect } from "react";
import { Alert, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  bookingSchema,
  QuoteResponse,
  type BookingInput,
} from "@pet-sitting/shared";
import { ThemedView } from "@/components/themed-view";
import BookingForm from "@/components/booking-form";
import QuoteReportCard from "@/components/quote-report-card";
import { MaxContentWidth, Spacing, BottomTabInset } from "@/constants/theme";

export type FormErrors = Partial<Record<keyof BookingInput, string>>;
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function HomeScreen() {
  const [form, setForm] = useState<BookingInput>({
    firstName: "",
    lastName: "",
    petName: "",
    petType: "dog",
    hoursRequired: 2,
    dateOfService: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [quote, setQuote] = useState<QuoteResponse>();

  function updateField<T extends keyof BookingInput>(
    field: T,
    value: BookingInput[T],
  ) {
    setForm((formValues) => ({
      ...formValues,
      [field]: value,
    }));

    setErrors((formValues) => ({
      ...formValues,
      [field]: undefined,
    }));
  }

  useEffect(() => {
    async function getQuote() {
      if (!API_URL) return;

      try {
        const response = await fetch(
          `${API_URL}/api/pricing?animalType=${form.petType}&hours=${form.hoursRequired}`,
        );

        if (!response.ok) {
          throw new Error("Failed to get quote");
        }

        const data: QuoteResponse = await response.json();

        setQuote(data);
      } catch (error) {
        console.error("Quote request failed:", error);
      }
    }

    getQuote();
  }, [form.petType, form.hoursRequired]);

  console.log("errors", errors);
  async function handleSubmit() {
    const result = bookingSchema.safeParse(form);

    if (!result.success) {
      const newErrors: FormErrors = {};

      for (const errors of result.error.issues) {
        const field = errors.path[0];

        if (typeof field === "string" && !(field in newErrors)) {
          newErrors[field as keyof BookingInput] = errors.message;
        }
      }

      setErrors(newErrors);
      return;
    }

    setErrors({});

    // We'll replace this with the API call next.
    if (!API_URL) {
      Alert.alert(
        "Configuration error",
        "Create you .env file with neccessary info",
      );
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const booking = await response.json();
      console.log("Booking created:", booking);

      Alert.alert(
        "Booking created",
        "Your pet sitting request was submitted successfully.",
      );
    } catch (err) {
      console.error("Booking submission failed:", err);

      Alert.alert("Unable to create booking");
    }
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollContent}>
          <ThemedView style={{ gap: Spacing.four }}>
            <BookingForm
              form={form}
              errors={errors}
              handleSubmit={handleSubmit}
              updateField={updateField}
            />
            <QuoteReportCard quote={quote} />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },
  scrollContent: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.five,
    gap: Spacing.four,
  },
});
