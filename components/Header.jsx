import Link from "next/link";
import { Button } from "@/components/ui/button";

// composants
import Nav from "@/components/Nav";
import MobileNav from "@/components/MobileNav"

const Header = () => {
  return (
    <header className="py-8 text-white xl:py-12">
      <div className="container flex items-center justify-between">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Mathieu
            <span className="text-accent"></span>
          </h1>
        </Link>
        {/* navigation pour desktop et bouton 'Hire me' */}
        <div className="items-center hidden gap-8 xl:flex">
          <Nav />
          <Link href="/contact">
          </Link>
        </div>

        {/* navigation pour mobile */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
