import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { bookingSchema, type BookingInput } from "@pet-sitting/shared";
import { ThemedView } from "@/components/themed-view";
import BookingForm from "@/components/booking-form";

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
        <BookingForm
          form={form}
          errors={errors}
          handleSubmit={handleSubmit}
          updateField={updateField}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

// function capitalize(value: string) {
//   return value.charAt(0).toUpperCase() + value.slice(1);
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
  },
});
