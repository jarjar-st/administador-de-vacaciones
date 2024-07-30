// "use client"
// import { useState, useEffect } from 'react';
// import { DataTableRol } from "./data-table"
// import { Backend_URL } from '@/lib/constants';
// import { Usuarios, columns } from './columns';

// async function getData(): Promise<Usuarios[]> {
//     try {
//         const response = await fetch(`${Backend_URL}/usuarios`);
//       if (!response.ok) {
//         throw new Error(`Error: ${response.status} ${response.statusText}`);
//       }
//       const data: Usuarios[] = await response.json();
//       console.log(data);
//       return data;
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       return []; 
//     }
//   }
  
//   export default function TablaRoles() {
//     const [data, setData] = useState<Usuarios[]>([]);
  
//     const loadData = async () => {
//       const newData = await getData();
//       setData(newData);
//     }
  
//     useEffect(() => {
//       loadData();
//     }, []);
  
//     return (
//       <DataTableRol columns={columns} data={data} />
//     )
//   }
