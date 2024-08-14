import React from 'react';
import { Toaster, toast } from 'sonner';
import { Trash } from "lucide-react";
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const Eliminar = ({ pedidoId, onEliminar }) => {

  const handleEliminar = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pedido/${pedidoId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Pedido eliminado con éxito');
        onEliminar(pedidoId);
      } else {
        toast.error('Error al eliminar el pedido');
      }
    } catch (error) {
      toast.error('Error al eliminar el pedido');
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="p-1.5 text-gray-900 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform bg-red-600 bg-opacity-50 rounded-md">
          <Trash size={15} strokeWidth={2.2} />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            ¿Está seguro?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            Esta acción elimina la factura de la base de datos, y posteriormente no se podría recuperar
          </AlertDialog.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button className="text-gray-700 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Cancelar
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button className="text-white bg-red-500 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                onClick={handleEliminar}
              >
                Sí, eliminar factura
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default Eliminar;
