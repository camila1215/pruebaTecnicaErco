# pruebaTecnicaErco

### Requisitos

* [x]  Tener instalado node
* [x]  Tener un editor de código
* [x]  Herramienta para la creación de entornos de desarrollo, en mi caso utilice laragon
* [x]  Disponibilidad en los puertos 3000 y 3001.

### Inicio
+ Descargar el proyecto
+ Iniciar los servicios del entorno de desarrollo
+ Guardar el proyecto en la carpeta www de laragon o en su defecto realizar la configuración para que apunte a la carpeta del proyecto

## FrontEnd
+ Ingresar a la carpeta client
+ Ejecutar para instalar dependencias `
npm install
`

## Backend
+ Ingresar a la carpeta server
+ Ejecutar para instalar dependencias `
npm install
`
+ Ingresar a la carpeta db que se encuentra en server y ejecutar el archivo crearbd_y_tabla.js con el siguiente comando ` 
node crearBd_tabla.js
` Se van a empezar a mostrar los mensajes en la consola de *Datos insertados correctamente* este archivo permite la creación de la base de datos, la tabla y la carga de los datos del archivo .csv a la tabla
+ Se esta usando Nodemon para ver los cambios en tiempo real.

# Ejecución del proyecto  
+ Antes de iniciarlo, verificar que los pasos descritos en la seccion del frontEnd y el backend esten completos y que los datos esten cargados en la tabla.
+ Inicializar el proyecto por primera vez, ejecutar este comando en el lado del client` 
npm start
`
+ Inicializar el proyecto, ejecutar este comando en el lado del server`
npm run dev
`
## Uso
+ La vista de inicio permite visualizar un listado de proyectos organizados en una tabla, se muestran las 4 columnas indicadas y se habilitaron 4 botones para interactuar con la información de cada proyecto, organizados de la siguiente forma:
   + *Boton Agregar*: Ubicado en la esquina superior izquierda, para agregar un item presiona el boton y diligencia la información del formulario
++ *Boton Consultar*: Ubicado en la tabla, al presionar permite visualizar la información completa del item
++ *Boton Editar*: Ubicado en la tabla, permite la edicion de la informacion, permite visualizarla y editar los campos con excepcion del campo *system_id* el cual es de solo lectura
++ *Boton Eliminar*: Ubicado en la tabla, permite eliminar un item, al precionar se abre un modal donde el usuario puede confirmar o cancelar la eliminación

1. First list item
   - First nested list item
     - Second nested list item

## Enlaces importantes
+ Laragon `https://laragon.org/download/index.html`
+ Material UI `https://mui.com/material-ui/getting-started/`
