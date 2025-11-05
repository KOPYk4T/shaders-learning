# Three.js Shaders Projects

Repositorio múltiple para proyectos de Three.js y shaders basados en [The Book of Shaders](https://thebookofshaders.com/).

## Estructura

```
├── index.html              # Página índice que lista todos los proyectos
├── projects/
│   ├── 01-shader-test/     # Primer proyecto de prueba de shaders
│   │   └── README.md       # Documentación específica del proyecto
│   ├── 02-[nombre]/        # Siguiente proyecto...
│   └── ...
├── node_modules/           # Dependencias compartidas
├── package.json
├── vite.config.js
└── README.md               # Este archivo
```

Cada proyecto tiene su propia carpeta dentro de `projects/` con:

- `index.html` - HTML del proyecto
- `main.js` - Código JavaScript principal
- `README.md` - Documentación específica del proyecto
- Otros assets según necesite cada proyecto

## Uso

### Instalar dependencias

```bash
npm install
```

### Ejecutar un proyecto específico

```bash
npm run dev:01    # Para el proyecto 01
npm run dev:02    # Para el proyecto 02
...
```

### Ejecutar servidor de desarrollo (página índice)

```bash
npm run dev
```

Esto abrirá la página índice en la raíz que muestra todos los proyectos disponibles. Desde ahí puedes navegar a cualquier proyecto haciendo clic en su enlace.

## Proyectos

- **[01-shader-test](./projects/01-shader-test/README.md)** - Proyecto inicial con animación de colores usando funciones trigonométricas

Cada proyecto tiene su propio README con detalles específicos.

## Crear un nuevo proyecto

1. Crear una nueva carpeta en `projects/` con un nombre descriptivo (ej: `02-mi-shader`)
2. Copiar la estructura básica de `01-shader-test` como plantilla
3. Crear un `README.md` en la carpeta del proyecto con su documentación
4. Modificar según tus necesidades
5. **Agregar el proyecto a la lista en `index.html`** (en el array `projects` del script)
6. Opcional: Agregar un script en `package.json` para acceso directo (ej: `dev:02`)

## Referencias

- [The Book of Shaders](https://thebookofshaders.com/)
- [Three.js Documentation](https://threejs.org/docs/)
- [GLSL Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
