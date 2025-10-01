# backend

## Introducción
Este proyecto es usado como servidor en el sistema de inventario (https://github.com/ronaldocuello01/inventory)

## SetUp
1. Instalar docker compose para la inicializacion de la base de datos (postgre)
2. Ejecutar el siguiente comando en  la raiz del proyecto (en la ubicacion de docker-compose.yml) para generar contenedor de la base de datos
```bash
docker-compose up -d
```

3. Instalar dependencias del proyecto
```bash
npm install
```

4. Ejecutar
```bash
npm run dev
```

## Tecnología
- [Node JS]
- [Express]
- [TypeScript]
- [JavaScript]
- [TypeORM]
- [PostgreSQL]
