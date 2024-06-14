import Link from "next/link";
import { Button } from "@/components/ui/button"; // Correction du chemin d'importation pour Button

// components
import Nav from "@/components/Nav"; // Correction du chemin d'importation pour Nav
import MobileNav from "@/components/MobileNav"; // Correction du chemin d'importation pour MobileNav

const Header = () => {
  return (
    <header className="py-8 xl:py-12 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Mathieu<span className="text-accent"></span>
          </h1>
        </Link>

        {/* navigation pour desktop et bouton 'Hire me' */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>Me contacter</Button>
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
