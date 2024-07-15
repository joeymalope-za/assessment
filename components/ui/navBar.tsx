import Link from "next/link";
import { Icons } from "./icons";

export default function NavBar(){
    return <nav className="shadow-gray-300 w-screen h-[10vh] p-16 sm:p-8 shadow-sm">
        <Link href={'/'}>
            <Icons.logo />
        </Link>
    </nav>
    ;
} 