# Three.js Shaders Projects

Multi-project repository for Three.js shader experiments inspired by [The Book of Shaders](https://thebookofshaders.com/).

## Structure

```
├── index.html              # Landing page that lists every project
├── projects/
│   ├── 01-shader-test/     # First shader experiment
│   │   └── README.md       # Project-specific docs
│   ├── 02-[name]/          # Next project...
│   └── ...
├── node_modules/           # Shared dependencies
├── package.json
├── vite.config.js
└── README.md               # This file
```

Each project lives in its own folder under `projects/` with:

- `index.html` - Project HTML
- `main.js` - Main JavaScript entry point
- `README.md` - Project documentation
- Any additional assets needed by the project

## Usage

### Install dependencies

```bash
npm install
```

### Run a specific project

```bash
npm run dev:01    # Project 01
npm run dev:02    # Project 02
...
```

### Run the index development server

```bash
npm run dev
```

This opens the root landing page listing every project. Click any link to navigate to its shader.

## Projects

- **[01-shader-test](./projects/01-shader-test/README.md)** - Intro project with color animation driven by trigonometric functions
- **[02-day-night-william-turner](./projects/02-day-night-william-turner/README.md)** - Gradient inspired by J. M. W. Turner’s _The Fighting Temeraire_

Each project ships with its own README for deeper details.

## Create a new project

1. Create a new folder inside `projects/` with a descriptive name (e.g. `03-my-shader`)
2. Copy the base structure from `01-shader-test` as a starting point
3. Add a `README.md` inside the project folder with its documentation
4. Adapt the shader to your needs
5. **Add the project to the list in `index.html`** (within the `projects` array)
6. Optional: Add a script in `package.json` for quicker access (e.g. `dev:03`)

## References

- [The Book of Shaders](https://thebookofshaders.com/)
- [Three.js Documentation](https://threejs.org/docs/)
- [GLSL Reference](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
