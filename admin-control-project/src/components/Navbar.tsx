import React from 'react'
import { ModeToggle } from './toggle-dark'
import { SigninButton } from './SigninButton'

export const Navbar = () => {
    return (
            <nav className=' flex fixed top-0 w-full h-14 z-[49] bg-[#252731]
            px-2 lg:px-4 justify-between items-center shadow-sm '>
                {/* <div className=" flex flex-row w-full h-[15vh] bg-cyan-700 p-2  justify-center items-center "> */}
                    <div className=' w-[10%]'>UN LOGO</div>
                    <ModeToggle />
                    <SigninButton></SigninButton>
                {/* </div> */}
            </nav>
    )
}



