-- Crear la tabla de registrations en Supabase
-- Ve a tu proyecto de Supabase > SQL Editor y ejecuta este script

CREATE TABLE registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Crear índice para búsquedas más rápidas por email
CREATE INDEX idx_registrations_email ON registrations(email);

-- Crear índice para ordenar por fecha
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura pública (opcional, ajusta según tus necesidades)
CREATE POLICY "Permitir lectura pública" ON registrations
  FOR SELECT
  USING (true);

-- Política para permitir inserción pública (para el formulario de registro)
CREATE POLICY "Permitir inserción pública" ON registrations
  FOR INSERT
  WITH CHECK (true);

-- Política para permitir actualización (solo para admin, ajusta según tus necesidades)
CREATE POLICY "Permitir actualización" ON registrations
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Política para permitir eliminación (solo para admin, ajusta según tus necesidades)
CREATE POLICY "Permitir eliminación" ON registrations
  FOR DELETE
  USING (true);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_registrations_updated_at
  BEFORE UPDATE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
