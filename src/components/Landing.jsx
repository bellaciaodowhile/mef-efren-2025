import { useState } from 'react'
import { Calendar, MapPin, Clock, CheckCircle } from 'lucide-react'
import RegistrationModal from './RegistrationModal'
import videoBackground from '../assets/video-0.mp4'
import posterImage from '../assets/images/background.png'

const Landing = ({ onRegister }) => {
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleRegister = async (formData) => {
    const success = await onRegister(formData)
    if (success) {
      setShowModal(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }
    return success
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        <video 
          className="absolute inset-0 w-full h-full object-cover"
          src={videoBackground}
          poster={posterImage}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50 bg-landing" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h3 className='uppercase text-center mb-6 text-xs md:text-xl zalando-sans-semiexpanded '>- ministerio musical adventista ador-arte -</h3>
          <h1 className="text-8xl md:text-9xl font-bold mb-6 allison-regular">
            Adoremos al <br />Rey
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-5 md:gap-8 mb-12 text-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-white" />
              <span>Domingo 21 de Diciembre</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-white" />
              <span>4:00 PM</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-white" />
              <span>Centro Cristiano Renuevo, Sector Unare</span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 
            text-white font-bold py-4 px-12 rounded-full text-xl 
            transition-all transform hover:scale-105" 
>
  ¡Asistiré al Concierto!
</button>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <RegistrationModal
          onClose={() => setShowModal(false)}
          onRegister={handleRegister}
        />
      )}

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-24 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <CheckCircle className="h-5 w-5" />
          <span>¡Registro exitoso! Te esperamos en el concierto.</span>
        </div>
      )}
    </div>
  )
}

export default Landing