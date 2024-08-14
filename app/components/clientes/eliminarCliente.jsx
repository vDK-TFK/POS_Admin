import HtmlButton from "@/app/components/HtmlHelpers/Button";
import { Check, CircleAlert, X } from "lucide-react";
import { useState } from "react";
import { Toaster, toast } from 'sonner';


export default function EliminarCliente({ open, onClose, cliente,reloadTable }) {

    const [clienteId, setClienteId] = useState(null);

    const eliminarCliente = (id) => {

        setClienteId(id);
        eliminar(id);
        
    };

    const eliminar = async (clienteId) => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/clientes`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ clienteId:clienteId, eliminado: true }) 
          });
      
          if (response.ok) {
            const data = await response.json();
            onClose();
            toast.success('Cliente eliminado satisfactoriamente');
            setTimeout(() => {
                reloadTable();
            });
          }
          else{
            throw new Error(`Error al eliminar cliente: ${response.statusText}`);
          }
          
        } catch (error) {
          console.error('Error:', error);
          toast.error('Sucedió un error al eliminar el cliente');
        }
      };


    if (!cliente) {
        return null;
    }

    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 flex justify-center items-center transition-opacity ${open ? "visible bg-black bg-opacity-40 dark:bg-opacity-50" : "invisible"}`}
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-all ${open ? "scale-100 opacity-100" : "scale-90 opacity-0"} max-w-3xl w-full md:w-2/3 lg:w-4/12`}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                >
                    <X size={20} strokeWidth={2} />
                </button>
                <div className="flex flex-col items-center">
                    <div className="text-center w-full">
                        <h2 className="text-xl font-bold flex gap-3 justify-center items-center text-gray-900 dark:text-gray-100">
                            <CircleAlert />Confirmar Eliminación
                        </h2>
                        <hr className="my-3 py-0.5  border-black dark:border-white" />
                        <p className="text-md text-gray-800 dark:text-gray-100">
                            ¿Seguro que desea eliminar este cliente?
                        </p>
                        <br/>
                        <p className="text-xl text-gray-800 dark:text-gray-100">
                            <strong>{cliente.nombre} {cliente.apellido}</strong>
                        </p>
                    </div>
                    <form className="my-2 w-full flex flex-col items-center">
                        <div className="flex justify-center gap-6 mt-5">
                            <HtmlButton color={"green"} legend={"Aceptar"} onClick={() => eliminarCliente(cliente.clienteId)} icon={Check}/>
                            <HtmlButton color={"gray"} legend={"Cancelar"} icon={X} onClick={onClose}/>

                        </div>
                    </form>
                </div>
            </div>
            <Toaster richColors />
        </div>
    );
}