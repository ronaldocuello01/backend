# backend

## Introducción
Este proyecto es usado como servidor en el sistema de busqueda de restaurtantes/platos (https://github.com/ronaldocuello01/frontend)

## Instalación
- Para poder ejecutar el backend del proyecto es necesario instalar PostgreSql en el ordenador de prueba.
- Luego de instalarlo, se debe crear una Base de Datos que se usar como base para la estructuracion de Typeorm.
- Posteriormente se modifica el archivo de configuración de TypeORM (src/db.ts) agregando lod datos / credenciales de perfil creado en la instalación de Postgre.
- Ahora para poder iniciar la ejecución, hay que instalar los paquetes de las dependencias, para esto se abre la consola integrada (en caso de usar VScode), sino la terminal o CMD del pc (en este caso se debe ubicar la ruta dentro del proyecto "backend"), en cualquier caso se ingresa el comando "npm i" para instalar las dependencias del proyecto.
- Al terminar de instalar las dependencias, es necesario construir el proyecto para que tome los cambios realizados, para esto se ingresa el comando "tsc" dentro de la terminal que se haya usado en el paso anterior.

## Ejecución
- Para este punto el servidor ya estaria listo para ser ejecutado, para esto se ingresa el comando "npm start", cuya función es resumir el comando "node build/index.js" (configuración realizada en package.json)

## Paso adicional: 
Para empezar a ingresar datos a la Base de Datos se debe realizar una petición POST con los datos {"name": "name","email": "email@email.com", "password": "1111"} a la URL "http://localhost:4000/api/auth/signup"
Esto con el fin de crear el usuario que empezará a llenar de datos al sistema (Typeorm es un orm nuevo para mi, no supe como hacerle seeders)

## Tecnología
- [Node JS]
- [Express]
- [TypeScript]
- [TypeORM]
- [PostgreSQL]
