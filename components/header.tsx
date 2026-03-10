import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return <header className="w-full px-8 py-3 pb-2.5 border-b border-star-dust-700">
    <div className="container mx-auto flex items-center justify-between">
      <Link href="/" className="w-44" >
        <Image src="/logo.png" alt="Mystik Logo" width={150} height={70} className="w-full object-cover" />
      </Link>
      <nav></nav>
      <Button className="uppercase">
        Begin here
      </Button>
    </div>
  </header>
}