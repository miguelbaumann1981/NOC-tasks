# Proyecto NOC-tasks

# dev
1. Clonar el archivo .env.temnplate a .env
2. Configurar las variables de entorno
``
PORT=3000
MAILER_EMAIL=soporte@devtalles.com
MAILER_SECRET_KEY=123456
PROD=false
``

3. Ejecutar ``npm install``
4. Levantar bases de datos ``docker compose up -d``
5. Ejecutar ``npm run dev```