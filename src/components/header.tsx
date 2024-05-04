import {Container} from "@/components/ui/container.tsx";
import {Link, useLocation} from "react-router-dom";
import {cn} from "@/lib/utils.ts";


export const Header = () => {
  const location = useLocation();
  return (
    <header className="bg-gray-800 p-4">
      <Container noPadding={true} className="flex-row justify-between">
        <h1 className="text-white text-xl">Hostfully</h1>
        <div className="flex gap-4">
          <Link className={cn(`text-white text-md opacity-80 hover:opacity-90`, location.pathname === "/" && "opacity-100")} to="/">Properties</Link>
          <Link className={cn(`text-white text-md opacity-80 hover:opacity-90`, location.pathname === "/bookings" && "opacity-100")} to="/bookings">My bookings</Link>
        </div>
      </Container>
    </header>
  )
}