# Documentación de la API

## Introducción

Esta API ha sido diseñada para facilitar la gestión de usuarios en una aplicación. Su enfoque principal radica en la administración de cuentas de usuario, y en este ejemplo, utilizo comidas como un caso de uso. Los usuarios tienen la capacidad de modificar las comidas, pero solo aquellas que les pertenecen. Aunque en este ejemplo las comidas pueden parecer redundantes, esta API también se puede aplicar para crear una lista de tareas (ToDo List) con funcionalidades de gestión de usuarios.

He implementado el paradigma de Programación Orientada a Objetos (POO) en esta API, principalmente con el propósito de aprender más sobre su aplicación y aprovechar sus ventajas en el desarrollo de software.


## Configuraciones

Para configurar esta API, sigue estos pasos:

1. Crea un archivo `.env` siguiendo la estructura proporcionada en el archivo `.env.example`. Este archivo contendrá las configuraciones necesarias para que la API funcione correctamente.

2. Configura una base de datos MySQL. Asegúrate de que la base de datos tenga el mismo nombre que se encuentra especificado en el archivo `.env`. Esto garantizará que la API se conecte a la base de datos correctamente y pueda funcionar de manera eficiente.


## Instalar dependencias 
```bash
npm install
```

## Iniciar el Servidor en Desarrollo

Para iniciar el servidor en modo de desarrollo, puedes utilizar el siguiente comando:

```bash
npm run dev
```

## Preparar la Aplicación

Antes de desplegar la aplicación en un entorno de producción, asegúrate de prepararla ejecutando el siguiente comando:

```bash
npm run build
```

## Desplegar la Aplicación

Una vez que la aplicación esté lista, puedes desplegarla con el siguiente comando:

```bash
npm start
```

## Casos de Uso Actuales

### Autenticación de usuario

La autenticación maneja JsonWebTokens en su mayoría para poder acceder a las demás funcionalidades.

**Importante**: La autenticación permite acceder a las funcionalidades. Es importante que crees un usuario y luego vayas al inicio de sesión.

### 1. Login

- **Descripcion**:Permite autenticarse para acceder a las demas funcionalidades
- **Método HTTP**: POST
- **Ruta**: `/api/auth/login`
- **Parámetros de solicitud**:  Datos del usuario ya creado.
- **Respuesta exitosa**: 200 
- **Respuesta de error**: 400 Bad Request, 401 Unauthorized


### 2. Logout

- **Descripcion**:Permite salir de la cuenta de usuario
- **Método HTTP**: POST
- **Ruta**: `/api/auth/logout`
- **Parámetros de solicitud**:  JsonWebToken de tipo usuario o de tipo Admin.
- **Respuesta exitosa**: 200
- **Respuesta de error**: 400 Bad Request, 401 Unauthorized


### Crear, Eliminar, Obtener, Actualizar usuario


### 1. Creación de Usuario

- **Descripción**: Permite crear un nuevo usuario en la aplicación.
- **Método HTTP**: POST
- **Ruta**: `/api/user`
- **Parámetros de solicitud**:  Datos del nuevo usuario.
- **Respuesta exitosa**: 201 Created
- **Respuesta de error**: 400 Bad Request

### 2. Eliminación de Usuario

- **Descripción**: Permite eliminar un usuario existente de la aplicación.
- **Método HTTP**: DELETE
- **Ruta**: `/api/user/`
- **Parámetros de solicitud**:JsonWebToken de tipo User.
- **Respuesta exitosa**: 204 No Content
- **Respuesta de error**: 404 Not Found, 403 Forbidden

### 3. Actualizar usuarios

- **Descripción**: Permite actualizar un usuario ya creado en la aplicación.
- **Método HTTP**: PATCH
- **Ruta**: `/api/user`
- **Parámetros de solicitud**:JsonWebToken de tipo User, Datos del usuario.
- **Respuesta exitosa**: 204 No Content
- **Respuesta de error**: 400 Bad Request, 401 si el usuario ya se habia creado antes

### 4. Obtener Usuarios

- **Descripción**: Permite obtener todos los usuarios.
- **Método HTTP**: GET
- **Ruta**: `/api/user/all`
- **Parámetros de solicitud**: JsonWebToken de tipo Admin
- **Respuesta exitosa**: 200 Content
- **Respuesta de error**: 404 Not Found, 403 Forbidden

### 5. Obtener Usuario

- **Descripción**: Permite buscar un usuario por su id especifico.
- **Método HTTP**: GET
- **Ruta**: `/api/user/`
- **Parámetros de solicitud**: JsonWebToken de tipo User.
- **Respuesta exitosa**: 200 Content
- **Respuesta de error**: 404 Not Found, 403 Forbidden

### Crear, Eliminar, Obtener, Actualizar Comidas

### 1. Guardar Comidas para Usuario

- **Descripción**: Permite a los usuarios guardar información sobre las comidas que han consumido.
- **Método HTTP**: POST
- **Ruta**: `/api/food/`
- **Parámetros de solicitud**: JsonWebToken de tipo User, datos de la comida.
- **Respuesta exitosa**: 201 Created
- **Respuesta de error**: 400 Bad Request


### 2. Obtener Comidas del Usuario

- **Descripción**: Permite a los usuarios obtener información sobre las comidas que han consumido.
- **Método HTTP**: GET
- **Ruta**: `/api/user/food`
- **Parámetros de solicitud**: JsonWebToken de tipo User.
- **Respuesta exitosa**: 200 Content
- **Respuesta de error**: 400 Bad Request


### 3. Modificar Comidas para Usuario

- **Descripción**: Permite a los usuarios modificar información sobre las comidas que han consumido.
- **Método HTTP**: PATCH
- **Ruta**: `/api/food/`
- **Parámetros de solicitud**: JsonWebToken de tipo User.
- **Respuesta exitosa**: 200 Content
- **Respuesta de error**: 400 Bad Request


### 4. Borrar Comidas para Usuario

- **Descripción**: Permite a los usuarios borrar información sobre las comidas que han consumido.
- **Método HTTP**: DELETE
- **Ruta**: `/api/food/`
- **Parámetros de solicitud**: JsonWebToken de tipo User.
- **Respuesta exitosa**: 204 no content
- **Respuesta de error**: 400 Bad Request
