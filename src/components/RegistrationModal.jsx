import { useState } from 'react'
import { X, User, Mail } from 'lucide-react'
import { useSpring, animated } from 'react-spring'

const RegistrationModal = ({ onClose, onRegister }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Animation for the modal
  const modalAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px) scale(0.9)' },
    to: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    config: { tension: 300, friction: 20 }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nombre || !formData.apellido || !formData.email) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Email inválido')
      return
    }

    setLoading(true)
    setError('')
    
    const success = await onRegister(formData)
    
    if (!success) {
      setError('Error al registrar. Intenta nuevamente.')
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
      <animated.div style={modalAnimation} className="bg-gray-900 rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">Adoremos Al Rey</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-2">Nombre</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Apellido</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Tu apellido"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r w-full m-auto from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 
            text-white font-bold py-4 px-12 rounded-full text-md 
            transition-all transform hover:scale-105">
            {loading ? 'Registrando...' : 'Confirmar Asistencia'}
          </button>
        </form>
      </animated.div>
    </div>
  )
}

export default RegistrationModal