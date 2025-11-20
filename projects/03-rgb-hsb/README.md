# 03-rgb-hsb

Un gradiente interactivo que muestra el espacio de color HSB (Hue, Saturation, Brightness) y cómo convertirlo desde/hacia RGB.

## Run

```bash
npm run dev:03
```

## Por qué HSB es más útil que RGB

RGB es como pedir un café diciendo: "70% arábica, 20% robusta, 10% agua". Técnico, pero raro.

HSB es como decir: "Un café mediano, con azúcar, bien cargado". Más intuitivo para humanos.

### RGB (Red, Green, Blue)
- Piensas en _mezclas de luz_.
- Para hacer amarillo: `rgb(255, 255, 0)` — medio confuso.
- Cambiar el brillo requiere tocar los tres canales.

### HSB (Hue, Saturation, Brightness)
- **Hue**: El color en sí (0° = rojo, 120° = verde, 240° = azul).
- **Saturation**: Qué tan "puro" es (0 = gris, 100 = color intenso).
- **Brightness**: Qué tan claro u oscuro (0 = negro, 100 = luminoso).

Con HSB puedes decir "quiero este color pero más oscuro" sin hacer matemáticas raras. Solo bajas el Brightness.

## Qué hace este shader

- Genera un gradiente con **Hue en X** (todos los colores del arcoíris de izquierda a derecha).
- **Brightness en Y** (oscuro abajo, brillante arriba).
- Saturación fija en 100% para ver los colores puros.
- Incluye las funciones `rgb2hsb()` y `hsb2rgb()` comentadas paso a paso.

## Uniforms

- `u_resolution`: Mantiene el gradiente proporcional al canvas.
- `u_time`: Disponible para animaciones futuras.

## Fragment Shader

```glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// ========================================
// RGB a HSB (HSV)
// ========================================
vec3 rgb2hsb( in vec3 c ){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    
    vec4 p = mix(vec4(c.bg, K.wz),
                 vec4(c.gb, K.xy),
                 step(c.b, c.g));
    
    vec4 q = mix(vec4(p.xyw, c.r),
                 vec4(c.r, p.yzx),
                 step(p.x, c.r));
    
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    
    return vec3(
        abs(q.z + (q.w - q.y) / (6.0 * d + e)),  // HUE
        d / (q.x + e),                            // SATURATION
        q.x                                       // BRIGHTNESS
    );
}

// ========================================
// HSB (HSV) a RGB
// ========================================
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(
        abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
        0.0,
        1.0
    );
    
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);
    
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main(){
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);
    
    // Hue en X, Brightness en Y, Saturación fija en 1.0
    color = hsb2rgb(vec3(st.x, 1.0, st.y));
    
    gl_FragColor = vec4(color, 1.0);
}
```

## Referencias

- [The Book of Shaders - Color](https://thebookofshaders.com/06/)
- Funciones de conversión basadas en las de [Iñigo Quilez](https://www.iquilezles.org/)

