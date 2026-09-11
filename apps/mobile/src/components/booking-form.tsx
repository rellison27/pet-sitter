import { BookingInput } from "@pet-sitting/shared";
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  useColorScheme,
  Platform,
} from "react-native";
import FormField from "./form-field";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { Spacing, Colors } from "@/constants/theme";
import { FormErrors } from "@/app";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { formatDate, parseLocalDate } from "./helpers/utils";

type BookingFormProps = {
  updateField: <T extends keyof BookingInput>(v: T, y: BookingInput[T]) => void;
  form: BookingInput;
  errors: FormErrors;
  handleSubmit: () => void;
};

export default function BookingForm({
  form,
  updateField,
  errors,
  handleSubmit,
}: BookingFormProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? "dark" : "light";
  const colors = Colors[theme];
  const animalTypes = [
    { type: "dog", emoji: "🐶" },
    { type: "cat", emoji: "🐱" },
    { type: "pig", emoji: "🐷" },
  ] as const;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const hasErrors = Object.values(errors).some((err) => err !== undefined);

  return (
    <>
      <View style={styles.header}>
        <ThemedText type="title">Book a Pet Sitter</ThemedText>

        <ThemedText type="small">
          Tell us about your pet and when you need a sitter.
        </ThemedText>
      </View>

      <ThemedView type="backgroundElement" style={styles.card}>
        <FormField label="First name" error={errors.firstName}>
          <TextInput
            value={form.firstName}
            onChangeText={(value) => updateField("firstName", value)}
            placeholder="John"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              {
                color: colors.text,
                borderColor: colors.textSecondary,
                backgroundColor: colors.background,
              },
            ]}
          />
        </FormField>

        <FormField label="Last name" error={errors.lastName}>
          <TextInput
            value={form.lastName}
            onChangeText={(value) => updateField("lastName", value)}
            placeholder="Smith"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              {
                color: colors.text,
                borderColor: colors.textSecondary,
                backgroundColor: colors.background,
              },
            ]}
          />
        </FormField>

        <FormField label="Pet name" error={errors.petName}>
          <TextInput
            value={form.petName}
            onChangeText={(value) => updateField("petName", value)}
            placeholder="Max"
            placeholderTextColor={colors.textSecondary}
            style={[
              styles.input,
              {
                color: colors.text,
                borderColor: colors.textSecondary,
                backgroundColor: colors.background,
              },
            ]}
          />
        </FormField>

        <FormField label="Pet type" error={errors.petType}>
          <View style={styles.optionRow}>
            {animalTypes.map(({ type, emoji }) => {
              const selected = form.petType === type;

              return (
                <Pressable
                  key={type}
                  onPress={() => updateField("petType", type)}
                  style={[
                    styles.optionButton,
                    {
                      borderColor: selected
                        ? colors.primary
                        : colors.textSecondary,
                      backgroundColor: selected
                        ? colors.primary
                        : colors.background,
                    },
                  ]}
                >
                  <ThemedText style={styles.animalEmoji}>{emoji}</ThemedText>
                </Pressable>
              );
            })}
          </View>
        </FormField>

        <FormField label="Hours needed" error={errors.hoursRequired}>
          <View style={styles.hoursRow}>
            {[2, 3, 4, 5, 6, 7, 8].map((hours) => {
              const selected = form.hoursRequired === hours;

              return (
                <Pressable
                  key={hours}
                  onPress={() => updateField("hoursRequired", hours)}
                  style={[
                    styles.hourButton,
                    {
                      borderColor: selected
                        ? colors.primary
                        : colors.textSecondary,
                      backgroundColor: selected
                        ? colors.primary
                        : colors.background,
                    },
                  ]}
                >
                  <ThemedText
                    style={selected ? styles.selectedOptionText : undefined}
                  >
                    {hours}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </FormField>

        <FormField label="Date of service" error={errors.dateOfService}>
          {Platform.OS === "ios" ? (
            <View style={styles.iosDateRow}>
              <DateTimePicker
                value={
                  form.dateOfService
                    ? parseLocalDate(form.dateOfService)
                    : new Date()
                }
                mode="date"
                minimumDate={new Date()}
                // I don't like how ios stays open even if accidentally clicked
                // and you can't select the same selection to close the calendar
                display="compact"
                onValueChange={(_, selectedDate) => {
                  updateField("dateOfService", formatDate(selectedDate));
                  setShowDatePicker(false);
                }}
                onDismiss={() => setShowDatePicker(false)}
              />
            </View>
          ) : (
            <>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Select date of service"
                onPress={() => setShowDatePicker(true)}
                style={[
                  styles.input,
                  styles.dateInput,
                  {
                    borderColor: colors.textSecondary,
                    backgroundColor: colors.background,
                  },
                ]}
              >
                <ThemedText
                  style={
                    !form.dateOfService
                      ? { color: colors.textSecondary }
                      : undefined
                  }
                >
                  {form.dateOfService ? form.dateOfService : "Select a date"}
                </ThemedText>
                {/* <TextInput
              value={form.dateOfService}
              onChangeText={(value) => updateField("dateOfService", value)}
              placeholder="mm/dd/yyy"
              placeholderTextColor={colors.textSecondary}
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.textSecondary,
                  backgroundColor: colors.background,
                },
              ]}
            /> */}
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={
                    form.dateOfService
                      ? parseLocalDate(form.dateOfService)
                      : new Date()
                  }
                  mode="date"
                  minimumDate={new Date()}
                  // I don't like how ios stays open even if accidentally clicked
                  // and you can't select the same selection to close the calendar
                  display="default"
                  onValueChange={(_, selectedDate) => {
                    updateField("dateOfService", formatDate(selectedDate));
                    setShowDatePicker(false);
                  }}
                  onDismiss={() => setShowDatePicker(false)}
                />
              )}
            </>
          )}
        </FormField>

        <Pressable
          onPress={handleSubmit}
          disabled={hasErrors}
          style={[
            styles.submitButton,
            {
              backgroundColor: hasErrors
                ? colors.button.disabled
                : colors.primary,
            },
          ]}
        >
          <ThemedText
            style={[
              styles.submitButtonText,
              {
                color: hasErrors
                  ? colors.button.disabledText
                  : colors.primaryForeground,
              },
            ]}
          >
            Book Pet Sitter
          </ThemedText>
        </Pressable>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Spacing.two,
  },

  card: {
    borderRadius: 20,
    padding: Spacing.four,
    gap: Spacing.four,
  },

  field: {
    gap: Spacing.two,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: Spacing.three,
    fontSize: 16,
  },

  optionRow: {
    flexDirection: "row",
    gap: Spacing.two,
  },

  optionButton: {
    flex: 1,
    minHeight: 44,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedOptionText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  hoursRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },

  hourButton: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  submitButton: {
    minHeight: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.two,
  },

  submitButtonText: {
    fontWeight: "700",
  },
  animalEmoji: { fontSize: 28 },
  dateInput: {
    justifyContent: "center",
  },
  iosDateRow: {
    marginLeft: -12,
    alignItems: "flex-start",
  },
});
