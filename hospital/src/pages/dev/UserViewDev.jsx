import { useEffect, useState } from 'react'
import UserTable from '../../components/admin/UserTable'
import { getUsers, deleteUser, updateUser, getSpecialties } from '../../services/developerService'
import ViewUserModal from '../../components/user/ViewUserModal'
import EditUserModal from '../../components/user/EditUserModal'
import DeleteConfirmationModal from '../../components/user/DeleteConfirmationModal'
import useAppContext from '../../hooks/useAppContext'

const UserViewDev = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [specialties, setSpecialties] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [error, setError] = useState('')
  const { addNotification } = useAppContext()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data.user)
        setFilteredUsers(data.user)
      } catch (error) {
        setError(error.message)
        console.error('Error al obtener datos de usuarios:', error)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getSpecialties()
        setSpecialties(data.especialidades)
      } catch (error) {
        setError(error.message)
        console.error('Error al obtener especialidades:', error)
      }
    }
    fetchSpecialties()
  }, [])

  useEffect(() => {
    let updatedUsers = users

    if (search.trim()) {
      updatedUsers = updatedUsers.filter(u => u.dpi.includes(search))
    }

    if (roleFilter) {
      updatedUsers = updatedUsers.filter(u => u.id_rol === parseInt(roleFilter))
    }

    if (statusFilter) {
      updatedUsers = updatedUsers.filter(u => u.estado === statusFilter)
    }

    setFilteredUsers(updatedUsers)
  }, [search, roleFilter, statusFilter, users])

  const handleView = (user) => {
    setSelectedUser(user)
    setIsViewOpen(true)
  }

  const handleEdit = (user) => {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

  const handleDelete = (user) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

  const handleSaveEdit = async (updatedUser) => {
    try {
      await updateUser(updatedUser)
      const updatedUsers = users.map(u => u.dpi === updatedUser.dpi ? updatedUser : u)
      setUsers(updatedUsers)
      setFilteredUsers(updatedUsers)
      setIsEditOpen(false)
      addNotification({
        type: 'success',
        message: 'Usuario actualizado correctamente', 
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Error al actualizar usuario',
      })
      console.error('Error al actualizar usuario:', error)
    }
  }

  const handleConfirmDelete = async (user) => {
    try {
      const remainingUsers = users.filter(u => u.dpi !== user.dpi)
      setUsers(remainingUsers)
      setFilteredUsers(remainingUsers)
      setIsDeleteOpen(false)
      await deleteUser(user.dpi)
      addNotification({
        type: 'success',
        message: 'Usuario eliminado correctamente',
      })
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Error al eliminar usuario',
      })
      console.error('Error al eliminar usuario:', error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Usuarios</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar por DPI..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Filtrar por Rol</option>
          <option value="1">Administrador</option>
          <option value="2">Doctor</option>
          <option value="3">Enfermera</option>
          <option value="4">Desarrollador</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">Filtrar por Estado</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>
      </div>
      <div>
        <UserTable
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>

      <ViewUserModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        user={selectedUser}
      />

      <EditUserModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={selectedUser}
        onSave={handleSaveEdit}
        specialties={specialties}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        user={selectedUser}
      />
    </div>
  )
}

export default UserViewDev
