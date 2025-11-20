import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Mail, Calendar, TrendingUp, Search, Edit2, Trash2, X, User, LogOut } from 'lucide-react'
import { useSpring, animated } from 'react-spring'

const AdminPanel = ({ registrations, onUpdate, onDelete }) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [editModal, setEditModal] = useState(null)
  const [editForm, setEditForm] = useState({ nombre: '', apellido: '', email: '' })
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const totalRegistrations = registrations.length

  const getRegistrationsByDay = () => {
    const days = {}
    registrations.forEach(reg => {
      const date = new Date(reg.created_at).toLocaleDateString('es-ES')
      days[date] = (days[date] || 0) + 1
    })
    return Object.entries(days).slice(-7)
  }

  const filteredRegistrations = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase()
    return (
      reg.nombre.toLowerCase().includes(searchLower) ||
      reg.apellido.toLowerCase().includes(searchLower) ||
      reg.email.toLowerCase().includes(searchLower)
    )
  })

  const handleEdit = (registration) => {
    setEditModal(registration)
    setEditForm({
      nombre: registration.nombre,
      apellido: registration.apellido,
      email: registration.email
    })
  }

  const handleSave = async () => {
    setLoading(true)
    const success = await onUpdate(editModal.id, editForm)
    if (success) {
      setEditModal(null)
      setEditForm({ nombre: '', apellido: '', email: '' })
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    const success = await onDelete(deleteConfirm.id)
    if (success) {
      setDeleteConfirm(null)
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    navigate('/login')
  }

  const modalAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px) scale(0.9)' },
    to: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    config: { tension: 300, friction: 20 }
  })

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Panel de Administración</h1>
            <p className="text-gray-400">Gestión de registros para Adoremos al Rey 2024</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Total Registros</p>
                <p className="text-2xl font-bold text-white">{totalRegistrations}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Hoy</p>
                <p className="text-2xl font-bold text-white">
                  {registrations.filter(reg => 
                    new Date(reg.created_at).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-600 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-gray-400 text-sm">Promedio Diario</p>
                <p className="text-2xl font-bold text-white">
                  {Math.round(totalRegistrations / Math.max(getRegistrationsByDay().length, 1))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6 flex flex-wrap justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Lista de Asistentes</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar asistente..."
              className="bg-gray-800 mt-2 w-full text-white pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Registrations Cards */}
        {filteredRegistrations.length === 0 ? (
          <div className="bg-gray-800 rounded-xl p-12 text-center">
            <Users className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No hay registros que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRegistrations.map((registration, index) => (
              <div 
                key={registration.id} 
                className="bg-gray-800 rounded-xl p-4 md:p-6 hover:bg-gray-750 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center space-x-3 md:space-x-4 flex-1 min-w-0">
                    {/* Numero */}
                    <div className="flex-shrink-0 w-6 md:w-8 text-center">
                      <span className="text-xl md:text-2xl font-bold text-gray-500">
                        {index + 1}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                        <span className="text-lg md:text-xl font-bold text-white">
                          {registration.nombre[0]}{registration.apellido[0]}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 md:mb-2">
                        <h3 className="text-base md:text-lg font-semibold text-white truncate">
                          {registration.nombre} {registration.apellido}
                        </h3>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                          <span className="truncate">{registration.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                          <span className="whitespace-nowrap">{new Date(registration.created_at).toLocaleDateString('es-ES')}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 sm:ml-4 justify-end sm:justify-start">
                    <button
                      onClick={() => handleEdit(registration)}
                      className="p-2 md:p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                      title="Editar"
                    >
                      <Edit2 className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(registration)}
                      className="p-2 md:p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                      title="Eliminar"
                    >
                      <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <animated.div style={modalAnimation} className="bg-gray-900 rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setEditModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Editar Asistente
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Nombre</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={editForm.nombre}
                    onChange={(e) => setEditForm({ ...editForm, nombre: e.target.value })}
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Nombre"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Apellido</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={editForm.apellido}
                    onChange={(e) => setEditForm({ ...editForm, apellido: e.target.value })}
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Apellido"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
                <button
                  onClick={() => setEditModal(null)}
                  disabled={loading}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
          <animated.div style={modalAnimation} className="bg-gray-900 rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setDeleteConfirm(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Confirmar Eliminación</h3>
              <p className="text-gray-400">
                ¿Estás seguro de que deseas eliminar a{' '}
                <span className="text-white font-semibold">
                  {deleteConfirm.nombre} {deleteConfirm.apellido}
                </span>
                ?
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Esta acción no se puede deshacer.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                {loading ? 'Eliminando...' : 'Eliminar'}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={loading}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Cancelar
              </button>
            </div>
          </animated.div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
