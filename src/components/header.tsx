import {Container} from "@/components/ui/container.tsx";
import {Link} from "react-router-dom";


export const Header = () => {
  return (
    <header className="bg-gray-800 p-4">
      <Container noPadding={true} className="flex-row justify-between">
        <h1 className="text-white text-xl">Hostfully</h1>
        <div className="flex gap-4">
          <Link className="text-white text-md opacity-80 hover:opacity-90" to="/">Properties</Link>
          <Link className="text-white text-md opacity-80 hover:opacity-90" to="/bookings">My bookings</Link>
        </div>
      </Container>
    </header>
  )
}