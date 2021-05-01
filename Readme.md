# Versión 1.0 Release 

## Guía de instalación local 

1) Clonar el repositorio. 
2) Ejecutar el script de la base de datos en MyPhpAdmin (XAMPP) dentro de una base llamada "cadce_test" (credencial root, sin password)

## Installs de npm (no deberia ser necesario reinstalarlos, pero puede suceder):
npm --save install express
npm --save install body-parser
npm --save install mysql2
npm --save install express-session
npm --save install cookie-parser
npm --save install bcryptjs


## Guia de ejecución
Desde una consola de comando con acceso a NodeJs, acceder a la siguiente ruta a partir del directorio raíz del repositorio

cd Proyecto/Codigo

En la ruta correspondiente, ejecutar el comando siguiente

npm start

Para acceder a la app localmente: localhost:8080/login


Para desplegar la app en Google Cloud, favor de revisar el manual de instalación anexo en la carpeta Proyecto


Será necesario configurar las credenciales de conexion con la base de datos en /utils/database.js


Además deberá colocar las credenciales de acceso a un servidor redis personal en el archivo index.js



## Credenciales de login

### Cuenta administradora
Username: cut@cut.com
Password: cut

