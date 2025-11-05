# Three.js Shaders Projects

Repositorio múltiple para proyectos de Three.js y shaders basados en [The Book of Shaders](https://thebookofshaders.com/).

## Estructura

```
├── index.html              # Página índice que lista todos los proyectos
├── projects/
│   ├── 01-shader-test/     # Primer proyecto de prueba de shaders
│   ├── 02-[nombre]/        # Siguiente proyecto...
│   └── ...
├── node_modules/           # Dependencias compartidas
├── package.json
├── vite.config.js
└── README.md
```

Cada proyecto tiene su propia carpeta dentro de `projects/` con:

- `index.html` - HTML del proyecto
- `main.js` - Código JavaScript principal
- Otros assets según necesite cada proyecto

## Uso

### Instalar dependencias

```bash
npm install
```

### Ejecutar un proyecto específico

```bash
npm run dev:01
```

### Ejecutar servidor de desarrollo (página índice)

```bash
npm run dev
```

Esto abrirá la página índice en la raíz que muestra todos los proyectos disponibles. Desde ahí puedes navegar a cualquier proyecto haciendo clic en su enlace.

## Proyectos

### 01-shader-test

Proyecto inicial de prueba con shaders en Three.js. Muestra un efecto visual simple donde los colores oscilan usando funciones trigonométricas.

**Características:**

- Fragment shader que anima colores usando `sin()` y `cos()`
- Uniform `u_time` para animación basada en tiempo
- Código minimalista enfocado en el fragment shader (lo importante)
- Optimizado para rendimiento (pixelRatio limitado, sin antialiasing)

**Qué hace:**
El shader crea una animación de colores donde:

- **Rojo**: oscila con `sin(u_time)` - va de 0 a 1 y vuelve
- **Verde**: oscila con `cos(u_time)` - desfasado respecto al rojo
- **Azul**: oscila más lento con `sin(u_time * 0.5)` - ciclo más largo

**El código está estructurado así:**

- El **fragment shader** es lo importante (está al inicio del archivo)
- Todo el boilerplate de Three.js está minimizado al final
- Para crear nuevos efectos, solo modifica el fragment shader

**Ejecutar:**

```bash
npm run dev:01
```

## Crear un nuevo proyecto

1. Crear una nueva carpeta en `projects/` con un nombre descriptivo (ej: `02-mi-shader`)
2. Copiar la estructura básica de `01-shader-test` como plantilla
3. Modificar según tus necesidades
4. **Agregar el proyecto a la lista en `index.html`** (en el array `projects` del script)
5. Opcional: Agregar un script en `package.json` para acceso directo (ej: `dev:02`)

## Referencias

- [The Book of Shaders](https://thebookofshaders.com/)
- [Three.js Documentation](https://threejs.org/docs/)
- [GLSL Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
