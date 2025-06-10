import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "@/pages/Home";
import About from "@/pages/about";
import Rumah from "@/pages/rumah/rumah";
import Penghuni from "@/pages/penghuni/Penghuni";

function Navbar() {
  return (
    <div>
      <nav className="border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold">MyApp</div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                  <NavigationMenuLink className="px-4 py-2" asChild >
                    <Link to="/penghuni">Penghuni</Link>
                  </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <NavigationMenuLink className="px-4 py-2" asChild>
                    <Link to="/rumah">Rumah</Link>
                  </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <NavigationMenuLink className="px-4 py-2" asChild>
                    <Link to="/pembayaran">Pembayaran</Link>
                  </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <NavigationMenuLink className="px-4 py-2" asChild>
                    <Link to="/pengeluaran">Pengeluaran</Link>
                  </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                  <NavigationMenuLink className="px-4 py-2" asChild>
                    <Link to="/laporan">Laporan</Link>
                  </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
