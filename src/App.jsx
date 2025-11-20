import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Landing from './components/Landing'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import { Users, LogOut } from 'lucide-react'
import logoAdorarte from './assets/images/logo.png'
import { getRegistrations, createRegistration, updateRegistration, deleteRegistration } from './lib/supabase'

function AppContent() {
  const [registrations, setRegistrations] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true'

  const fetchRegistrations = async () => {
    try {
      const data = await getRegistrations()
      setRegistrations(data)
    } catch (error) {
      console.error('Error fetching registrations:', error)
    }
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const handleRegistration = async (formData) => {
    try {
      await createRegistration(formData)
      await fetchRegistrations()
      return true
    } catch (error) {
      console.error('Error registering:', error)
      return false
    }
  }

  const handleUpdate = async (id, formData) => {
    try {
      await updateRegistration(id, formData)
      await fetchRegistrations()
      return true
    } catch (error) {
      console.error('Error updating:', error)
      return false
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteRegistration(id)
      await fetchRegistrations()
      return true
    } catch (error) {
      console.error('Error deleting:', error)
      return false
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated')
    navigate('/login')
  }

  const showNav = location.pathname !== '/login' && location.pathname !== '/panel'

  return (
    <div className="min-h-screen">
      {showNav && (
        <nav className="fixed top-0 w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-white font-bold text-xl pt-10">
                  <img src={logoAdorarte} className='w-28' alt="Ador-Arte" />
                </span>
              </Link>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Landing onRegister={handleRegistration} />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/panel" 
          element={
            <ProtectedRoute>
              <AdminPanel 
                registrations={registrations} 
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
