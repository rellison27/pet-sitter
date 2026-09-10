import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Booking } from "@pet-sitting/shared";
import { Table } from "@/components/ui/table";

type BookinTablePrps = {
  bookings: Booking[];
};

export default function BookingTable({ bookings }: BookinTablePrps) {
  return (
    <div className="space-y-6 px-6 py-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Past Bookings</h1>

        <p className="text-sm text-muted-foreground">
          View all pet sitting bookings.
        </p>
      </div>

      <Card className="border border-border/60 bg-card shadow-sm">
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
          <CardDescription>All submitted pet sitting requests.</CardDescription>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Pet</TableHead>
                <TableHead>Service date</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.firstName} {booking.lastName}
                  </TableCell>

                  <TableCell>{booking.petName}</TableCell>

                  <TableCell>{booking.dateOfService}</TableCell>

                  <TableCell>{booking.hoursRequired}</TableCell>

                  <TableCell>{booking.petType}</TableCell>

                  <TableCell className="text-right font-medium">
                    ${booking.totalPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
