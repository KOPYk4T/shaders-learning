#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// ========================================
// RGB a HSB (HSV)
// ========================================
vec3 rgb2hsb( in vec3 c ){
    // K contiene valores mágicos para el algoritmo
    // Estos números vienen de la matemática del modelo HSV
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    
    // PASO 1: Determinar cuál componente es el máximo
    // Comparamos Blue vs Green
    vec4 p = mix(vec4(c.bg, K.wz),      // Si B > G, usa (B, G, -1, -1/3)
                 vec4(c.gb, K.xy),      // Si G >= B, usa (G, B, 2/3, -1)
                 step(c.b, c.g));       // step retorna 0 si B > G, 1 si G >= B
    
    // PASO 2: Ahora comparamos el resultado anterior con Red
    vec4 q = mix(vec4(p.xyw, c.r),      // Si p.x > R
                 vec4(c.r, p.yzx),      // Si R >= p.x (R es el máximo)
                 step(p.x, c.r));
    
    // PASO 3: Calcular la diferencia entre máximo y mínimo
    // q.x = valor máximo de RGB
    // min(q.w, q.y) = valor mínimo de RGB
    float d = q.x - min(q.w, q.y);      // Delta (rango del color)
    
    float e = 1.0e-10;                  // Epsilon para evitar división por cero
    
    // PASO 4: Calcular HUE, SATURATION, BRIGHTNESS
    return vec3(
        abs(q.z + (q.w - q.y) / (6.0 * d + e)),  // HUE (0.0 - 1.0)
        d / (q.x + e),                            // SATURATION (0.0 - 1.0)
        q.x                                       // BRIGHTNESS (valor máximo)
    );
}

// ========================================
// HSB (HSV) a RGB
// Función de Iñigo Quilez
// ========================================
vec3 hsb2rgb( in vec3 c ){
    // c.x = Hue (0.0 - 1.0)
    // c.y = Saturation (0.0 - 1.0)
    // c.z = Brightness (0.0 - 1.0)
    
    // PASO 1: Crear tres ondas desfasadas para R, G, B
    // Multiplicamos Hue por 6.0 y sumamos offsets (0, 4, 2)
    // Esto crea 3 funciones que pican en diferentes puntos del círculo cromático
    vec3 rgb = clamp(
        abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0,
        0.0,
        1.0
    );
    // El resultado es una función triangular que va de 0 a 1
    
    // PASO 2: Suavizar con smoothstep cúbico
    // Esta curva hace que la transición entre colores sea más suave
    rgb = rgb * rgb * (3.0 - 2.0 * rgb);  // Interpolación Hermite
    
    // PASO 3: Aplicar Saturación y Brillo
    // mix(blanco, color_puro, saturación) da el color saturado
    // Luego multiplicamos por brillo para oscurecer
    return c.z * mix(vec3(1.0), rgb, c.y);
}

void main(){
    // Normalizar coordenadas de píxel (0.0 a 1.0)
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);
    
    // GRADIENTE HSB:
    // - Eje X controla el HUE (todos los colores del arcoíris)
    // - Eje Y controla el BRIGHTNESS (de oscuro abajo a brillante arriba)
    // - Saturación fija en 1.0 (colores puros)
    color = hsb2rgb(vec3(st.x, 1.0, st.y));
    
    gl_FragColor = vec4(color, 1.0);
}

