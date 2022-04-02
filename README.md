# Angel Guemez test-react
###Aplicacion CRUD hecha en Reactjs + Next.js + Redux 
###Url deployment: https://test-react-theta.vercel.app

#Todos los requisitos fueron cubiertos (incluyendo Next.js - extra point)
####●Utilizar React 16 o superior usando functional components con hooks
####● Extra point - uso de Next.js
####● Integrar Material UI como framework ui.
####● Utilizar Typescript en el proyecto
####● Cada acción del CRUD debe realizarse en una vista/ruta diferente
####● Usar una librería para el manejo de formularios: react hook form e integrar validaciones en los campos.
####● Agregar paginación al listado de contacts.
####● deployado en vercel: https://test-react-theta.vercel.app.
####● Deberás también compartirnos el código fuente del proyecto por medio de un repositorio git público: https://github.com/angileo7/test-react.git.

#Nivel más avanzado con la sección de “Plus” cubiertos

####●Integrar redux como state management.
####● Dar feedback al usuario cuando sucede un error del lado del servidor, por ejemplo, cuando se duplica un email, o un teléfono.

#Feature adicional.
####● He dockerizado la app :)

#Instalación y arranque de la app
yarn (instalar dependencias)

next (correr la app)

##Correr la app en Docker
####docker build -t client .
####docker build -t client . &amp;&amp; docker run --name CLIENT_CONTAINER -p 0.0.0.0:5000:3000 client
####Visitar http://localhost:5000 para ver la UI