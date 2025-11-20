# Configuración de Supabase

## Pasos para configurar Supabase

### 1. Crear un proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Espera a que el proyecto se inicialice

### 2. Crear la tabla en Supabase
1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Copia y pega el contenido del archivo `supabase-setup.sql`
3. Haz clic en **Run** para ejecutar el script
4. Verifica que la tabla `registrations` se haya creado en **Table Editor**

### 3. Obtener las credenciales
1. Ve a **Settings** > **API**
2. Copia el **Project URL** (VITE_APP_SUPABASE_URL)
3. Copia el **anon/public key** (VITE_APP_SUPABASE_KEY)

### 4. Configurar variables de entorno
1. Crea un archivo `.env` en la raíz del proyecto
2. Copia el contenido de `.env.example`
3. Reemplaza los valores con tus credenciales:

```env
VITE_APP_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_APP_SUPABASE_KEY=tu_anon_key_aqui
```

### 5. Instalar dependencias (si no lo has hecho)
```bash
npm install @supabase/supabase-js
```

### 6. Iniciar la aplicación
```bash
npm run dev
```

## Estructura de la tabla

La tabla `registrations` tiene los siguientes campos:

- `id` (UUID): Identificador único generado automáticamente
- `nombre` (VARCHAR): Nombre del asistente
- `apellido` (VARCHAR): Apellido del asistente
- `email` (VARCHAR): Email del asistente
- `created_at` (TIMESTAMP): Fecha de creación del registro
- `updated_at` (TIMESTAMP): Fecha de última actualización

## Funcionalidades implementadas

✅ **Crear registro**: Los usuarios pueden registrarse desde el Landing
✅ **Listar registros**: Ver todos los registros en el AdminPanel
✅ **Editar registro**: Hacer clic en el ícono de editar, modificar y guardar
✅ **Eliminar registro**: Hacer clic en el ícono de eliminar y confirmar

## Seguridad

Las políticas de Row Level Security (RLS) están configuradas para:
- Permitir lectura pública
- Permitir inserción pública (para el formulario)
- Permitir actualización y eliminación (ajusta según tus necesidades de autenticación)

**Nota**: Para producción, considera implementar autenticación para las operaciones de edición y eliminación.
