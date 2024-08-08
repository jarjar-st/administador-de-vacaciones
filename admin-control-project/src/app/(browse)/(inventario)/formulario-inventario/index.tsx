"use client"
import { useState, useEffect } from 'react';
import { DataTable } from "./data-table"
import { Backend_URL } from '@/lib/constants';
import { Inventario, columns } from './columns';

async function getData(): Promise<Inventario[]> {
    try {
        const response = await fetch(`${Backend_URL}/inventario`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data: Inventario[] = await response.json();
      console.log('ESTOS SON LOS USUARIOS', data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Retorna un arreglo vacío o maneja el error como prefieras
    }
  }
  
  export default function TablaUsuarios() {
    const [data, setData] = useState<Inventario[]>([]);
  
    const loadData = async () => {
      const newData = await getData();
      setData(newData);
    }
    console.log('ESTOS SON LOS DATOS', data);
  
    useEffect(() => {
      loadData();
    }, []);
  
    return (
      <DataTable columns={columns} data={data} />
    )
  }
