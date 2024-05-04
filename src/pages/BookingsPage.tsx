import {Container} from "@/components/ui/container.tsx";
import {Header} from "@/components/header.tsx";


export const BookingsPage = () => {
  return (
    <>
      <Header/>
      <Container>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <div className="mt-6">
        </div>
      </Container>
    </>
  );
}