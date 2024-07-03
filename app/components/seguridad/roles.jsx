'use client'

import { useState } from "react";
import { CirclePlus, Pencil, Trash } from "lucide-react";
import useSWR from 'swr';
import AddRole from '@/app/components/seguridad/addRol';
import UpdateRole from '@/app/components/seguridad/updateRol';
import DeleteRole from '@/app/components/seguridad/deleteRol';

export default function RoleTable() {
    const [addRoleModalOpen, setAddRoleModalOpen] = useState(false);
    const [updateRoleModalOpen, setUpdateRoleModalOpen] = useState(false);
    const [deleteRoleModalOpen, setDeleteRoleModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null); // Estado para almacenar el rol seleccionado para editar/eliminar

    const { data: roles, error, mutate } = useSWR('/api/role', async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    });

    if (error) return <div>Error al cargar los roles</div>;
    if (!roles) return <div>Cargando roles...</div>;
    if (!Array.isArray(roles)) return <div>No hay roles disponibles</div>;

    const handleAddRole = async (newRole) => {
        try {
            const response = await fetch('/api/role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRole),
            });
            const data = await response.json();
            mutate([...roles, data], false);
            setAddRoleModalOpen(false);
        } catch (error) {
            console.error('Error al agregar el rol', error);
        }
    };

    const handleEditRole = async (updatedRole) => {
        try {
            const response = await fetch(`/api/role/${selectedRole.IdRole}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedRole),
            });
            const data = await response.json();
            const updatedRoles = roles.map(role => role.IdRole === data.IdRole ? data : role);
            mutate(updatedRoles, false);
            setUpdateRoleModalOpen(false);
        } catch (error) {
            console.error('Error al actualizar el rol', error);
        }
    };

    const handleDeleteRole = async () => {
        try {
            await fetch(`/api/role/${selectedRole.IdRole}`, { method: 'DELETE' });
            const updatedRoles = roles.filter(role => role.IdRole !== selectedRole.IdRole);
            mutate(updatedRoles, false);
            setDeleteRoleModalOpen(false);
        } catch (error) {
            console.error('Error al eliminar el rol', error);
        }
    };

    return (
        <div className="overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="px-4 divide-y dark:divide-gray-700">
                <div className="flex flex-col py-3 space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center space-x-4">
                        <h5>
                            <span className="text-gray-500">Roles Totales: </span>
                            <span className="dark:text-white">{roles.length}</span>
                        </h5>
                    </div>
                    <button
                        type="button"
                        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                        onClick={() => setAddRoleModalOpen(true)}
                    >
                        <CirclePlus className="w-5 h-5 mr-2" />
                        Agregar Rol
                    </button>
                </div>

            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-2">ID</th>
                            <th scope="col" className="px-4 py-3">Descripción</th>
                            <th scope="col" className="px-4 py-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role) => (
                            <tr key={role.IdRole}>
                                <td className="p-2">{role.IdRole}</td>
                                <td className="px-4 py-2">{role.Descripcion}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-1 justify-evenly my-1 whitespace-nowrap">
                                        <button
                                            className="p-1.5 text-gray-900 dark:text-gray-200 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform bg-blue-600 bg-opacity-50 rounded-md"
                                            onClick={() => {
                                                setSelectedRole(role.IdRole);
                                                setUpdateRoleModalOpen(true);
                                            }}
                                        >
                                            <Pencil size={15} strokeWidth={2.2} />
                                        </button>
                                        <button
                                            className="p-1.5 text-gray-900 dark:text-gray-200 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform bg-red-600 bg-opacity-50 rounded-md"
                                            onClick={() => {
                                                setSelectedRole(role.IdRole);
                                                setDeleteRoleModalOpen(true);
                                            }}
                                        >
                                            <Trash size={15} strokeWidth={2.2} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddRole open={addRoleModalOpen} onClose={() => setAddRoleModalOpen(false)} onAddRole={handleAddRole} />
            <UpdateRole open={updateRoleModalOpen} onClose={() => setUpdateRoleModalOpen(false)} roleId={selectedRole} onUpdateRole={handleEditRole} />
            <DeleteRole open={deleteRoleModalOpen} onClose={() => setDeleteRoleModalOpen(false)} roleId={selectedRole} onDeleteRole={handleDeleteRole} />
        </div>
    );
}
