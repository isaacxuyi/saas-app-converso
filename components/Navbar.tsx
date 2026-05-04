import Link from "next/link"
import Image from "next/image"
import logo from '../public/images/prisma2.png'
import NavItems from "./NavItems"
import { Show, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs"

const Navbar = () => {
  return (
   <nav className="navbar">
    <Link href="/">
        <div className="flex item-center gap-2.5 cursor-pointer">
        <Image 
        src={logo} 
        alt="logo" 
        width={46}
        height={44} 
        />
        </div>
        
   </Link> 

   <div className="flex items-center gap-8">
    <NavItems />
    <Show when="signed-out">
      <SignInButton />
      <SignUpButton />
    </Show>
    <Show when="signed-in">
      <UserButton />
    </Show>
   </div>
   </nav>
   
   
  )
}

export default Navbar
