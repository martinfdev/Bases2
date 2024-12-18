import { useEffect, useState } from 'react'
import UserTable from '../../components/admin/UserTable'
import { getUsers, deleteUser, updateUser } from '../../services/adminServices'
import ViewUserModal from '../../components/user/ViewUserModal'
import EditUserModal from '../../components/user/EditUserModal'
import DeleteConfirmationModal from '../../components/user/DeleteConfirmationModal'


const UsersView = () => {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers()
        setUsers(data.user)
        setFilteredUsers(data.user)
      } catch (error) {
        console.error('Error al obtener datos de usuarios:', error)
      }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredUsers(users)
    } else {
      setFilteredUsers(users.filter(u => u.dpi.includes(search)))
    }
  }, [search, users])

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
    }
    catch (error) {
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
    }
    catch (error) {
      console.error('Error al eliminar usuario:', error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Usuarios</h1>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Buscar por DPI..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="overflow-auto">
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

export default UsersView