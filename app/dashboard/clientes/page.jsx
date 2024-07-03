'use client'

import HtmlBreadCrumb from "@/app/components/HtmlHelpers/BreadCrumb";
import HtmlButton from "@/app/components/HtmlHelpers/Button";
import HtmlLabel from "@/app/components/HtmlHelpers/Label";
import HtmlTableButton from "@/app/components/HtmlHelpers/TableButton";
import ActivarCliente from "@/app/components/clientes/activarCliente";
import AgregarCliente from "@/app/components/clientes/agregarCliente";
import EditarCliente from "@/app/components/clientes/editarCliente";
import EliminarCliente from "@/app/components/clientes/eliminarCliente";
import Buscador from "@/app/components/pos/buscador";
import { Pencil, PlusCircle, Save, Trash, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from 'sonner';

const itemsBreadCrumb = ["Home","Clientes"];



export default function Clientes() {
    const [modalAgregar, openModalAgregar] = useState(false);
    const [modalEliminar, openModalEliminar] = useState(false);
    const [modalActivar, openModalActivar] = useState(false);
    const [modalEditar, openModalEditar] = useState(false);
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    // async function exportarClientesToExcel() {
    //     try {
    //         const response = await fetch('http://localhost:3000/api/clientes');
    //         if (!response.ok) {
    //             toast.error('Sucedió un error al exportar los clientes');
    //             throw new Error(`Error al generar el archivo clientes: ${response.statusText}`);
    //         }

    //         const clientes = await response.json();

    //         if (clientes.length === 0) {
    //             toast.warning('No es posible exportar los clientes, no hay datos');
    //             throw new Error(`No existen clientes: ${response.statusText}`);
    //         } 
    //         else {
    //             const workbook = new Workbook();
    //             const worksheet = workbook.addWorksheet('Clientes');
        
    //             worksheet.addRow(['IdCliente', 'Nombre', 'Apellido', 'Correo','Telefono']);
        
    //             clientes.forEach(cliente => {
    //                 worksheet.addRow([cliente.id, cliente.nombre, cliente.apellido, cliente.correo,cliente.telefono]);
    //             });
    //             var date = new Date().toDateString();
    //             const excelFilePath = 'ExportClientes_'+ date +'.xlsx';
    //             const writeStream = fs.createWriteStream(excelFilePath);
        
    //             console.log('Archivo Excel exportado satisfactoriamente:', excelFilePath);
    //             writeStream.end();
    //             return excelFilePath;
    //         }

            
    
    //     } catch (error) {
    //         console.error('Error al exportar datos a Excel:', error);
    //         throw new Error('Ocurrió un error al exportar datos a Excel');
    //     }
    // }






    const obtenerClientes = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/clientes');
            if (!response.ok) {
                throw new Error(`Error al obtener clientes: ${response.statusText}`);
            }
            const data = await response.json();
            if (data.length === 0) {
                toast.warning('No se encontraron registros');
            } else {
                console.log(data);
                toast.success('Se han obtenido los clientes');
                setClientes(data);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Sucedió un error al obtener los clientes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        obtenerClientes();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <>
        <div className="w-full p-4">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="pl-2 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <HtmlBreadCrumb items={itemsBreadCrumb}/>
                </ol>
            </nav>
            <div className="p-2">
                <h4 className="text-2xl font-bold dark:text-white">Admin. de Clientes</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto">
                <div className="md:col-span-4">
                    <Buscador />
                </div>

                <div className="md:col-span-3">
                    <div className="mt-1">
                        <HtmlButton color={"blue"} legend={"Agregar Cliente"} icon={UserPlus} onClick={() => openModalAgregar(true)}/>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <div className="mt-1">
                        <HtmlButton color={"green"} legend={"Exportar Clientes"} icon={Save} onClick={() => exportarClientesToExcel()}/>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 mt-8 mx-auto">
                <div className="col-span-12">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-sm text-gray-700 uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th hidden scope="col" className="px-6 py-3">
                                        IdCliente
                                    </th>
                                    <th  scope="col" className="px-6 py-3" style={{ width: '7%' }}>
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3" style={{ width: '25%' }}>
                                        Nombre Completo
                                    </th>
                                    <th scope="col" className="px-6 py-3" style={{ width: '10%' }}>
                                        Estado
                                    </th>
                                    <th scope="col" className="px-6 py-3" style={{ width: '20%' }} >
                                        Teléfonos
                                    </th>
                                    <th scope="col" className="px-6 py-3" style={{ width: '20%' }}>
                                        Correo
                                    </th>
                                    <th scope="col" className="px-6 py-3" style={{ width: '15%' }}>
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {clientes.map((cliente, index) => (
                                <tr key={index} className="bg-white dark:bg-gray-800">
                                    <td hidden className="px-6 py-4">{cliente.clienteId}</td>
                                    <td  className="px-6 py-4">{index+1}</td>
                                    <td className="px-6 py-4"><span>{cliente.nombre}</span> <span>{ cliente.apellido }</span></td>
                                    <td className="px-6 py-4"><HtmlLabel color={cliente.eliminado ? 'red' : 'green'} legend={cliente.eliminado ? 'Inactivo' : 'Activo'} /></td>
                                    <td className="px-6 py-4">
                                        <div className="mt-1">
                                            <HtmlLabel color={"blue"} legend={cliente.celular ? `${cliente.telefono} / ${cliente.celular}` : cliente.telefono} />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{cliente.email}</td>
                                    <td className="px-6 py-4">
                                        {cliente.eliminado ? 
                                        (
                                            <HtmlTableButton color={"green"} icon={PlusCircle} onClick={() => { openModalActivar(true); setClienteSeleccionado(cliente); }} />
                                        ) 
                                        :
                                        (
                                            <HtmlTableButton color={"red"} icon={Trash} onClick={() => { openModalEliminar(true); setClienteSeleccionado(cliente); }} />
                                        )
                                        }
                                        <HtmlTableButton color={"blue"} icon={Pencil} onClick={() => { openModalEditar(true); setClienteSeleccionado(cliente); }} />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Modal Agregar Cliente */}
            <AgregarCliente open={modalAgregar} onClose={() => openModalAgregar(false)} reloadTable={obtenerClientes} />
            <EliminarCliente open={modalEliminar} onClose={() => openModalEliminar(false) } cliente={clienteSeleccionado} reloadTable={obtenerClientes} />    
            <ActivarCliente open={modalActivar} onClose={() => openModalActivar(false) } cliente={clienteSeleccionado} reloadTable={obtenerClientes} />    
            <EditarCliente open={modalEditar} onClose={() => openModalEditar(false)} reloadTable={obtenerClientes} cliente={clienteSeleccionado} />
                
        </div>
        <Toaster richColors />
        </>
    );
}
