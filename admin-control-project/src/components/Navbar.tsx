import React from 'react'
import { ModeToggle } from './toggle-dark'
import { SigninButton } from './SigninButton'
import { cn } from '@/lib/utils'

export interface NavbarProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const Navbar = React.forwardRef<HTMLInputElement, NavbarProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <nav className={cn(
                'flex fixed top-0 w-full h-20 z-[69] bg-background  px-2 lg:px-4 justify-between items-center shadow-sm border-b-2',
                className)} >
                {/* <div className=" flex flex-row w-full h-[15vh] bg-cyan-700 p-2  justify-center items-center "> */}
                <div className=' w-[20%]'>
                    <img src="/logo1.png" alt="logo" className="w-16 h-16" />
                </div>
                
                <SigninButton></SigninButton>
                {/* </div> */}
            </nav>
        )
    }
)

Navbar.displayName = "Navbar"
export { Navbar }



