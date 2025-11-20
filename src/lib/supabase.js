import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

// Obtener todos los registros
export const getRegistrations = async () => {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

// Crear un nuevo registro
export const createRegistration = async (formData) => {
  const { data, error } = await supabase
    .from('registrations')
    .insert([
      {
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email
      }
    ])
    .select()
  
  if (error) throw error
  return data[0]
}

// Actualizar un registro
export const updateRegistration = async (id, formData) => {
  const { data, error } = await supabase
    .from('registrations')
    .update({
      nombre: formData.nombre,
      apellido: formData.apellido,
      email: formData.email
    })
    .eq('id', id)
    .select()
  
  if (error) throw error
  return data[0]
}

// Eliminar un registro
export const deleteRegistration = async (id) => {
  const { error } = await supabase
    .from('registrations')
    .delete()
    .eq('id', id)
  
  if (error) throw error
  return true
}
