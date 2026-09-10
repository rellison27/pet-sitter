"use client";

import { useForm } from "@tanstack/react-form";
import { BookingInput, bookingSchema, formatError } from "@pet-sitting/shared";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookingFormApi } from "../_hooks/booking-form";

type BookingFormProps = {
  form: BookingFormApi;
};

export default function BookingForm({ form }: BookingFormProps) {
  return (
    <Card className="w-full max-w-3xl rounded-4xl border border-border/60 bg-card shadow-sm">
      <CardHeader className="space-y-2 px-7 pt-7 pb-4">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Book a sitter
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground">
          Tell us about your pet and when you need care.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-7"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <form.Field name="firstName">
              {(field) => (
                <div className="space-y-2.5">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    First name
                  </Label>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="John"
                    className="h-11 rounded-lg border-border/70 bg-background px-3 shadow-none transition focus-visible:ring-2 focus-visible:ring-primary/30"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="lastName">
              {(field) => (
                <div className="space-y-2.5">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Last name
                  </Label>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Smith"
                    className="h-11 rounded-lg border-border/70 bg-background px-3 shadow-none transition focus-visible:ring-2 focus-visible:ring-primary/30"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <form.Field name="petName">
            {(field) => (
              <div className="space-y-2.5">
                <Label htmlFor={field.name} className="text-sm font-medium">
                  Pet name
                </Label>

                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  placeholder="Max"
                  className="h-11 rounded-lg border-border/70 bg-background px-3 shadow-none transition focus-visible:ring-2 focus-visible:ring-primary/30"
                />

                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-destructive">
                    {field.state.meta.errors[0]?.message}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="petType">
            {(field) => (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Pet type</Label>

                <RadioGroup
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(value as "dog" | "cat" | "pig")
                  }
                  className="grid gap-3 sm:grid-cols-3"
                >
                  {(["dog", "cat", "pig"] as const).map((petType) => {
                    const isSelected = field.state.value === petType;

                    return (
                      <label
                        key={petType}
                        htmlFor={petType}
                        className={`
                          flex cursor-pointer items-center gap-3
                          rounded-xl border p-4 transition
                          ${
                            isSelected
                              ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                              : "border-border/70 bg-background hover:border-primary/40 hover:bg-accent/40"
                          }
                        `}
                      >
                        <RadioGroupItem value={petType} id={petType} />

                        <span className="font-medium capitalize">
                          {petType}
                        </span>
                      </label>
                    );
                  })}
                </RadioGroup>
              </div>
            )}
          </form.Field>

          <div className="grid gap-5 md:grid-cols-2">
            <form.Field name="hoursRequired">
              {(field) => (
                <div className="space-y-2.5">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Hours needed
                  </Label>

                  <Select
                    value={String(field.state.value)}
                    onValueChange={(value) => field.handleChange(Number(value))}
                  >
                    <SelectTrigger
                      id={field.name}
                      className="h-11! w-full rounded-lg border-border/70 bg-background px-3 shadow-none focus:ring-2 focus:ring-primary/30"
                    >
                      <SelectValue placeholder="Select hours" />
                    </SelectTrigger>

                    <SelectContent>
                      {[2, 3, 4, 5, 6, 7, 8].map((hours) => (
                        <SelectItem key={hours} value={String(hours)}>
                          {hours} hours
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field name="dateOfService">
              {(field) => (
                <div className="space-y-2.5">
                  <Label htmlFor={field.name} className="text-sm font-medium">
                    Date of service
                  </Label>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="date"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="h-11 rounded-lg border-border/70 bg-background px-3 shadow-none transition focus-visible:ring-2 focus-visible:ring-primary/30"
                  />

                  {field.state.meta.errors.length > 0 && (
                    <p className="text-sm text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex justify-end pt-2">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="h-11 rounded-lg px-6 text-sm font-medium shadow-sm"
                >
                  {isSubmitting ? "Submitting..." : "Book Pet Sitter"}
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
