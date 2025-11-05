# 01-shader-test

Proyecto inicial de prueba con shaders en Three.js. Muestra un efecto visual simple donde los colores oscilan usando funciones trigonométricas.

## Ejecutar

```bash
npm run dev:01
```

## Qué hace

El shader crea una animación de colores donde:

- **Rojo**: oscila con `sin(u_time)` - va de 0 a 1 y vuelve
- **Verde**: oscila con `cos(u_time)` - desfasado respecto al rojo
- **Azul**: oscila más lento con `sin(u_time * 0.5)` - ciclo más largo

Resultado: una pantalla que cambia de color continuamente con transiciones suaves.

## Características

- Fragment shader que anima colores usando `sin()` y `cos()`
- Uniform `u_time` para animación basada en tiempo
- Código minimalista enfocado en el fragment shader (lo importante)
- Optimizado para rendimiento (pixelRatio limitado, sin antialiasing)

## Estructura del código

El código está estructurado así:

- El **fragment shader** es lo importante (está al inicio del archivo)
- Todo el boilerplate de Three.js está minimizado al final
- Para crear nuevos efectos, solo modifica el fragment shader

## Fragment Shader

```glsl
uniform float u_time;  // Tiempo en segundos (se actualiza cada frame)

void main() {
  // Colores que oscilan con seno y coseno
  float r = sin(u_time) * 0.5 + 0.5;        // Rojo: 0 → 1 → 0
  float g = cos(u_time) * 0.5 + 0.5;        // Verde: desfasado
  float b = sin(u_time * 0.5) * 0.5 + 0.5;  // Azul: más lento

  gl_FragColor = vec4(r, g, b, 1.0);  // Color final del píxel (RGBA)
}
```

## Conceptos clave

- **Fragment shader**: Se ejecuta por cada píxel y define su color
- **Uniforms**: Variables que se pasan desde JavaScript (como `u_time`)
- **sin() y cos()**: Funciones trigonométricas que oscilan entre -1 y 1
- **Normalización**: `* 0.5 + 0.5` convierte el rango de -1..1 a 0..1 (valores válidos para color)
