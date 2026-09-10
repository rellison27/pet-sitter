"use client";

import { QuoteResponse } from "@pet-sitting/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type QuoteRerportProps = { quote?: QuoteResponse };
export default function QuoteReport({ quote }: QuoteRerportProps) {
  return (
    <Card className="w-full max-w-3xl rounded-4xl border border-border/60 bg-card shadow-sm">
      <CardHeader className="space-y-2 px-7 pt-7 pb-4">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Live Quote
        </CardTitle>

        <CardDescription className="text-sm text-muted-foreground">
          As you change your options give us a second to adjust the price
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <p className="font-semibold pb-2">Price Breakdown</p>
        <Separator />

        <div className="grid gap-5 md:grid-cols-2 py-6">
          Base service {quote && <p>${quote?.basePrice}</p>}
        </div>

        <div>Pet sitting</div>
        <div className="grid gap-5 md:grid-cols-2 pb-2">
          {quote && (
            <>
              {" "}
              <p>
                {quote?.hourlyRate} x {quote.hours} hours
              </p>
              <p>${quote?.hourlyRate * quote?.hours}</p>
            </>
          )}
        </div>
        <Separator />

        <div className="grid gap-5 md:grid-cols-2  pt-2">
          <p className="font-semibold">Total</p>
          {quote && <p>${quote?.totalPrice}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
