#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.218,0.324,0.912);
vec3 colorB = vec3(1.000,0.474,0.079);
vec3 colorANight = vec3(0.032,0.048,0.135);
vec3 colorBNight = vec3(0.085,0.040,0.007);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec3 pct = vec3(st.x);
    
    float normalizedSinTime = (sin(u_time * 0.5) + 1.0) * 0.5;
    float timeOfDay = normalizedSinTime;
    
    vec3 skyA = mix(colorA, colorANight, timeOfDay);
    vec3 skyB = mix(colorB, colorBNight, timeOfDay);
    
    float lowerBoost = smoothstep(0.3, 0.0, st.y); 
    
    pct.r = smoothstep(0.4,0.7, st.x) + lowerBoost;
    pct.g = st.x + lowerBoost;
    pct.b = st.x + lowerBoost;
    
    color = mix(skyA, skyB, pct);
    
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));
    gl_FragColor = vec4(color,1.0);
}

