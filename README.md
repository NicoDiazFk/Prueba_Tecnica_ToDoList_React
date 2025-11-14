# Prueba Tecnica Avalauto
## Objetivo general
-----------------------
Construir una aplicación de gestión de tareas (To-Do Dashboard) con interfaz responsive, donde puedas crear, editar, eliminar, filtrar y visualizar tareas con distintas propiedades, aplicando buenas prácticas de desarrollo frontend.

## Tecnologias Utilizadas
• React
• Vite
• JavaScript
• Css

Nota: El proyecto usa un metodo de almacenamiento de localStorage, sin embargo esta preparado para integrar backend como Supabase

## Requisitos de Instalación
• Nodejs version 22.15.0 o posterior
• npm version 11.6.0 o posterior

## ¿Como ejecutar el proyecto?
1. Clonar el repostitorio utilizando el siguiente comando: 
https://github.com/NicoDiazFk/Prueba_Tecnica_ToDoList_React.git
2. Ingresar a la carpeta del proyecto e instalar las dependencias necsarias con el comando: 
npm install
3. Inicializar el proyecto en modo desarrollo con el comando:
npm run dev

## Resumen de funcionalidades
La aplicación de gestion de tareas fue construida con base a los requisitos solicitados en la prueba tecnica además de añadir algunas mejoras adicionales, entre las funcionalidades estan:

### Almacenamiento de datos:
La aplicación mantiene las tareas almacenadas mediante LocalStorage, cargándolas al iniciar y actualizándolas automáticamente cada vez que la lista cambia.
El proyecto está preparado para integrar un backend como Supabase, aunque la conexión aún no fue implementada.
### Header Fijo
• Título del proyecto: To-Do Dashboard.
• Contador dinámico de tareas totales.
### Gestión de tareas (CRUD)
Las tareas contienen esta estructura:
• Nombre
• Descripción
• Fecha límite(funcional)
• Prioridad (baja, media, alta)
• Estado (pendiente, en_proceso, vencida, completada)
• Indicador de completada (boolean)

### Manejo de las tareas:

La aplicación permite crear tareas de dos maneras:

• Creación rápida, mediante un input visible en la interfaz principal que solo requiere el nombre de la tarea, permitiendo un flujo ágil y eficiente.

• Creación completa, desplegando un formulario colapsable donde se pueden ingresar todos los detalles opcionales (descripción, fecha límite, prioridad y estado).

El formulario es el mismo para crear y editar.
Cuando el usuario selecciona una tarea para editar, la misma ventana muestra los datos cargados y permite modificar cualquier campo.

Cada tarea también cuenta con un botón de eliminar, que remueve la tarea seleccionada de forma permanente.

La visualización de las tareas incluye badges que representan tanto la prioridad como el estado, permitiendo una lectura rápida y clara de la información importante.

La aplicación incorpora validaciones para impedir la creación de tareas sin nombre.
## Relación fecha y estado de las tareas:

El sistema detecta automáticamente si una tarea ha sobrepasado su fecha límite y no está completada.
En ese caso, su estado pasa a vencida y se representa visualmente mediante un badge distintivo.

Si una tarea está completada, su estado visual prevalece como completada, independientemente de la fecha.
Las tareas sin fecha límite mantienen el comportamiento normal del estado configurado.

### Filtro de visualización:

El boton de filtros abre un cuadro de dialogo que permite filtrar las tareas según:

Estado: pendiente, en proceso, vencida, completada.

Prioridad: baja, media, alta.

Los filtros se aplican en tiempo real y permiten combinar distintas opciones para refinar la vista de la lista.

## Estructura del proyecto
src/

├─ components/

│  ├─ Header.jsx
│  ├─ Sidebar.jsx
│  ├─ TaskList.jsx
│  ├─ TaskItem.jsx
│  ├─ TaskForm.jsx      
│  └─ TaskFormDialog.jsx 

├─ App.jsx               
├─ main.jsx               
├─ App.css                
└─ assets/  

La carpeta components/ reúne todas las partes principales de la aplicación, y cada archivo JSX tiene su propio CSS para mantener los estilos separados de la lógica y así trabajar de forma más limpia y ordenada. Esta estructura hace más fácil ubicar y modificar cada sección sin afectar otras partes del proyecto, manteniendo el código modular, entendible y coherente con la interfaz que construí.

## Diseño de la Interfaz y Decisiones de UX

La interfaz no la construí con una estructura típica, sino buscando que el flujo fuera lo más práctico posible para un usuario real. Pensé en cómo alguien usa una to-do list en su día a día y en qué acciones deberían estar siempre a la mano. Por eso la creación de nuevas tareas está ubicada en la parte superior y accesible sin tener que navegar entre secciones.
También dejé los filtros en un punto visible para que el usuario pueda organizar sus tareas rápido, sin perder tiempo desplazándose.

Toda la vista está planteada de forma intuitiva: botones claros, colores que ayudan a identificar estados y prioridades, y tarjetas donde la información importante está a simple vista. La idea fue que la aplicación no requiriera explicación para entenderse, sino que se sintiera natural desde el primer uso.

## Respuestas a preguntas conceptuales
### 1. Explica con tus palabras cuál es la diferencia entre props y state en el framework frontend que uses.

En React siempre he entendido que las props funcionan como si fueran los argumentos que recibe una función, mientras que el state es más parecido a una variable interna que el propio componente controla. De hecho, cuando he trabajado con Flutter, algo parecido pasa con los widgets Stateful y Stateless: un StatelessWidget solo recibe datos externos (algo muy similar a las props), mientras que en un StatefulWidget puedes manejar información que cambia dentro del mismo widget, que vendría a ser el state.

En React pasa exactamente lo mismo. Las props llegan desde el padre y no deberían alterarse dentro del componente, mientras que el state es una forma de guardar datos que necesitan actualizar la interfaz cuando cambian. Esa actualización automática del render es la razón por la que el state es tan importante

### 2. Explica brevemente qué diferencias hay entre SSR (Server Side Rendering), CSR (Client Side Rendering) y SSG (Static Site Generation).¿En qué casos usarías cada uno?

La diferencia entre estas formas de renderizar tiene más que ver con cuándo y dónde se construye la página. El SSR genera la vista directamente en el servidor antes de enviarla, lo cual es útil cuando la página necesita aparecer completa desde el primer momento, especialmente por temas de SEO o porque los cambios del contenido deben reflejarse rápido sin depender del navegador

El CSR hace lo contrario: envía la estructura básica y luego deja que el navegador construya el resto con JavaScript. Es lo que normalmente pasa en proyectos hechos con React puro. En aplicaciones muy interactivas funciona bien porque la mayor parte del trabajo se hace directamente en el cliente

El SSG, en cambio, deja las páginas ya listas y estáticas antes de la carga, casi como si guardara screenshots en HTML. Eso sirve cuando el contenido cambia poco y la prioridad es cargar rápido desde un CDN

### 3. ¿Por qué es importante el diseño responsive y qué estrategias sueles usar para implementarlo?

El diseño responsive hoy es prácticamente obligatorio porque los usuarios ya no consumen contenido desde un solo tipo de pantalla. El mismo sitio tiene que verse bien tanto en un monitor grande como en un celular pequeño. Esto no es solo comodidad: también evita que el usuario tenga fricción al navegar, especialmente si la aplicación tiene partes interactivas o formularios.

Generalmente trabajo el responsive usando unidades relativas y dejando que la estructura misma del layout se adapte según el espacio disponible. Dependiendo del proyecto uso media queries, pero también recurro a técnicas como ajustar el grid dinámicamente o usar funciones como clamp() para controlar mejor cómo escalan los textos y los elementos visuales

### 4. ¿Qué beneficios trae tener una buena estructura de componentes y cómo la organizas tú normalmente?

Una aplicación con componentes bien definidos se vuelve mucho más manejable. Si cada pieza del sistema tiene una responsabilidad clara, no solo es más fácil encontrar dónde modificar algo, sino que también se vuelve más sencillo hacer crecer el proyecto sin que se vuelva un caos.

Normalmente, cuando estoy armando la estructura, lo que hago es que cada componente quede agrupado según la parte funcional del sistema a la que pertenece. Si algo pertenece a tareas, va en la sección de tareas; si algo corresponde a filtros, queda junto a los filtros. Esa separación lógica ayuda mucho a orientarse durante el desarrollo

### 5. ¿Cómo manejarías la persistencia y sincronización de datos entre el frontend y el backend en una app con usuarios reales?

En una aplicación real siempre hay que asumir que los datos del frontend deben reflejar exactamente lo que existe en el backend. Para conseguirlo, la sincronización va más allá de simplemente guardar datos. Es necesario validar, actualizar y confirmar que lo que el usuario ve es lo que realmente quedó registrado.

Una forma común de hacerlo es enviando los cambios al backend y luego consultando la versión oficial de la información para refrescar el estado del cliente. Si se necesita inmediatez, se puede usar un estado local temporal mientras el backend responde, o incluso manejar eventos en tiempo real a través de websockets cuando la aplicación requiere que varios usuarios vean los cambios al mismo tiempo

### 6. Si tuvieras que optimizar esta app con 1000 tareas, ¿qué harías para evitar re-renderizados innecesarios?

Cuando una lista empieza a crecer tanto, el problema real ya no es manejar los datos sino evitar que React renderice cosas que el usuario ni siquiera está viendo. En ese caso, la técnica más útil es el virtual scrolling, que es básicamente mostrar solo lo que aparece en pantalla y dejar el resto fuera del DOM hasta que sea necesario. Librerías como react-window son ideales para esto.

También es importante revisar cómo se actualiza cada componente. Si toda la lista se vuelve a renderizar por un cambio pequeño, hay algo en la lógica que se puede mejorar. Con una estructura más aislada por cada tarea, React.memo sí podría ser útil para evitar re-renderizados que no aportan nada

### 7. ¿Podrías mencionar algún patrón de diseño que conozcas y explicar brevemente cómo lo aplicarías en una aplicación web?

Actualmente todavía estoy aprendiendo sobre patrones de diseño, especialmente en frontend, pero hay uno que me ha ayudado a organizar mejor mis componentes cuando el proyecto empieza a crecer: separar lógica de presentación. No sé si tenga un nombre “formal”, pero básicamente consiste en dejar toda la parte visual en un componente sencillo y mover la lógica de funciones y validaciones a otro archivo como un controller.

Esto hace que el componente principal no se vuelva tan pesado y sea más fácil de mantener o reutilizar sobretodo en entornos como React resulta bastante eficiente. Por ejemplo, si tengo una lista con distitos filtros la logica del filtrado la manejo en un controlador aparte y el componente solo se encarga de mostrar la interfaz y los elementos de esa lista.
Aun no tengo dominio de patrones más avanzados pero sigo aprendiendo sobre estos para mejorar mi estrucutración de proyectos escalables.