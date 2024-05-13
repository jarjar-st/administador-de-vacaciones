import React, { Suspense } from 'react'
// import Navbar from './_components/navbar'
// import { SidebarSkeleton, Sidebar } from './_components/sidebar';
import Container from './_components/container';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from './_components/sidebar';

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <Navbar />
            <div className=' flex h-full pt-14'>
                {/* <Suspense fallback={<SidebarSkeleton/>}>
                    <Sidebar />
                </Suspense> */}
                <Sidebar/>
                <Container>
                    {children}
                </Container>
            </div>
        </>

    );
}



export default BrowseLayout;