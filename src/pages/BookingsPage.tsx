import {Container} from "@/components/ui/container.tsx";
import {Header} from "@/components/header.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useBookings} from "@/hooks/useBookings.ts";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useProperty} from "@/hooks/useProperty.ts";

const _Placeholder = ({loading}: { loading: boolean }) => {
  const numberOfSkeletons = loading ? 12 : 0;
  return Array.from({length: numberOfSkeletons}).map((_, index) => (
    <div key={index} className="flex gap-1 flex-col bg-white p-4 shadow rounded-lg">
      <Skeleton className="w-full h-32"/>
      <Skeleton className="w-full h-7"/>
      <Skeleton className="w-full h-12"/>
      <Skeleton className="w-full h-6"/>
      <Skeleton className="w-full h-10"/>
    </div>
  ));
}
const _Property = ({id}: { id: number }) => {
  const {property, error, loading} = useProperty(id);
  if(error) return <p className="text-red-500">{error}</p>;
  return loading ? <Skeleton className="w-full h-4"></Skeleton> : <p>{property?.name}</p>;
}
export const BookingsPage = () => {
  const {bookings, error, loading} = useBookings();
  return (
    <>
      <Header/>
      <Container>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reservation</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          {!loading && !error ? <TableBody>
            {bookings.map(booking => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">INV{booking.id}</TableCell>
                <TableCell><_Property id={booking.propertyId}/></TableCell>
                <TableCell>{booking.startDate.toDateString()} - {booking.endDate.toDateString()}</TableCell>
                <TableCell>{booking.status}</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
              </TableRow>
            ))}
          </TableBody> : null}
        </Table>
        {loading && !error ? <_Placeholder loading={loading}/> : null}
        {error ? <p className="text-red-500">{error}</p> : null}
      </Container>
    </>
  );
}