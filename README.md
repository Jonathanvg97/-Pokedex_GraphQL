# Prueba Técnica Pokédex App

Una aplicación moderna de Pokédex construida con React mediante el inicializador de Vite, TypeScript y GraphQL que permite explorar y gestionar tus Pokémon favoritos.

---

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Características](#características)
- [Arquitectura](#arquitectura)
- [Ejecución Pruebas](#ejecución-pruebas)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Variables de Entorno](#variables-de-entorno)
- [Api](#api)
- [Despliegue](#despliegue)
- [Licencia](#licencia)

---

## Instalación

Para comenzar con el proyecto, sigue estos pasos:

1. **Clonar el repositorio**:
   ```bash
   git clone <url_del_repositorio>
   cd <carpeta_del_proyecto>
   ```
2. **npm install**:
   ```bash
    npm install
   ```
3. **Configurar las variables de entorno: Crea un archivo .env en la raíz del proyecto y agrega las variables necesarias. tomar de guia el .env.local.example**:
   ```bash
   .env.local
   ```
4. **Ejecutar el servidor de desarrollo: Para ejecutar la aplicación de manera local**:
   ```bash
    npm run dev
   ```
5. **Visita en tu navegador el puerto**:

   ```bash
    http://localhost:5173
   ```

## Características

1. **Lista de Pokemons**:
   ```bash
   Lista completa de Pokémon ordenada alfabéticamente.
   ```
2. **Detalle de Pokemon**:
   ```bash
    Vista detallada de cada Pokémon con estadísticas completas.
   ```
3. **Pokemons Favoritas**:
   ```bash
   Permite a los usuarios marcar pokemons como favoritas y persiste la información en IndexedDB.
   ```
4. **Funcionalidad de Búsqueda**:
   ```bash
   Barra de búsqueda para filtrar pokemons por nombre.
   ```
5. **Arquitectura Limpia**:
   ```bash
   La lógica de negocio y el manejo del estado están separados en módulos bien organizados.
   ```
6. **Diseño Responsivo**:
   ```bash
   La aplicación es completamente responsiva y se adapta a diferentes tamaños de pantalla..
   ```
7. **Optimización de consultas y scroll infinito**:

   ```bash
   Búsqueda con debounce: se evita hacer consultas en cada tecla presionada, reduciendo llamadas innecesarias.

   Scroll infinito condicionado: cuando hay filtros activos (por nombre o tipo), el scroll no dispara nuevas consultas.

   Almacenamiento local con IndexedDB (Dexie): los Pokémon ya cargados se guardan en la base de datos local, evitando pedir nuevamente datos ya obtenidos.

   ```

8. **Componentes testeados**:
   ```bash
   Verifica que se renderice el nombre, número e imagen del Pokémon.
   Comprueba que al hacer clic en la tarjeta se navegue a la página de detalle.
   Verifica que el botón de "favoritos" funcione correctamente y que cambie el icono si el Pokémon está en favoritos.
   ```

## Arquitectura

La aplicación sigue un enfoque de arquitectura limpia, donde:

1. **La lógica de negocio está separada en hooks y servicios**
2. **Los componentes de UI se encuentran en la carpeta components.**
3. **La persistencia se maneja con Dexie.js para almacenar los pokemones favoritas en IndexedDB.**

## Ejecución de Pruebas

1. **Ejecutar las pruebas unitarias**:
   ```bash
    npm run test
   ```

## Tecnologías Usadas

1. **React 18: con hooks y functional components**
2. **TypeScript: JavaScript con tipado estático para una mejor experiencia de desarrollo.**
3. **CSS Modules: Para estilos modulares y con alcance limitado.**
4. **Dexie.js: Una capa para IndexedDB que facilita la persistencia de datos en el navegador.**
5. **pokeAPI: API para obtener datos de los pokemones.**
6. **Vite como herramienta de build y desarrollo**
7. **Dexie: Administración y manejo de la indexdb**
8. **Se utilizó Vitest y React Testing Library para realizar las pruebas de los componentes de React.**

## Estructura de Carpetas

Aquí tienes un resumen de la estructura de carpetas del proyecto:

src/
├── features/ # Funcionalidades organizadas por dominio
│ ├── pokemon/ # Todo lo relacionado con Pokémon
│ │ ├── components/ # Componentes específicos de Pokémon
│ │ ├── hooks/ # Hooks personalizados para Pokémon
│ │ ├── services/ # Servicios y llamadas API
│ │ └── utils/ # Utilidades específicas
│ └── favorites/ # Funcionalidad de favoritos
│ ├── components/ # Componentes de favoritos
│ ├── hooks/ # Hooks para gestión de favoritos
│ └── utils/ # Utilidades para favoritos
├── components/ # Componentes UI reutilizables
│ └── ui/ # Componentes de interfaz de usuario
├── hooks/ # Hooks personalizados globales
├── services/ # Servicios globales (Apollo Client, etc.)
├── types/ # Definiciones de TypeScript
├── utils/ # Utilidades globales
├── styles/ # Estilos globales y temas
└── pages/ # Componentes de página/pantalla

## Variables de Entorno

Crea un archivo .env.local en la raíz del proyecto y agrega las siguientes variables:

1. **VITE_BASE_API=**

# Despliegue

## https://pokedex-graph-ql-three.vercel.app/

## API

https://graphql-pokeapi.graphcdn.app/

## Licencia

**by Jonathan Vanegas**

Este README proporciona todos los detalles relevantes del proyecto, incluyendo la instalación, uso, características, arquitectura y más, todo en español.
