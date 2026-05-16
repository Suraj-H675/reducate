'use client'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
varying vec2 v_texcoord;
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    v_texcoord = uv;
}
`

const fragmentShader = /* glsl */ `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform sampler2D u_texture;

uniform float u_circleSize;
uniform float u_circleEdge;

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif

#ifndef FNC_COORD
#define FNC_COORD
vec2 coord(in vec2 p) {
    p = p / u_resolution.xy;
    if (u_resolution.x > u_resolution.y) {
        p.x *= u_resolution.x / u_resolution.y;
        p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
    } else {
        p.y *= u_resolution.y / u_resolution.x;
        p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
    }
    p -= 0.5;
    p *= vec2(-1.0, 1.0);
    return p;
}
#endif

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdCircle(in vec2 st, in vec2 center) {
    return length(st - center) * 2.0;
}

float fill(float x, float size, float edge) {
    return 1.0 - smoothstep(size - edge, size + edge, x);
}

void main() {
    vec2 st = st0 + 0.5;
    vec2 posMouse = mx * vec2(1., -1.) + 0.5;

    float circleSize = u_circleSize;
    float circleEdge = u_circleEdge;

    // Sample SVG texture
    vec4 tex = texture2D(u_texture, v_texcoord);
    float mask = tex.a;

    // Soft cursor reveal
    float sdfCircle = fill(
        sdCircle(st, posMouse),
        circleSize,
        circleEdge
    );

    // Combine SVG mask with cursor reveal
    float alpha = clamp(mask * sdfCircle * 2.5, 0.0, 1.0);

    if (alpha < 0.01) discard;

    // Reconstruct color: gold strokes (#d1ad3e) vs red filled dots (#c21400)
    float isFilled = step(0.9, tex.a);
    vec3 gold = vec3(0.82, 0.68, 0.24);
    vec3 red  = vec3(0.76, 0.08, 0.0);
    vec3 color = mix(gold, red, isFilled);

    gl_FragColor = vec4(color, alpha);
}
`

const SVG_DATA = `<svg xmlns="http://www.w3.org/2000/svg" width="228" height="263" viewBox="0 0 228 263"><rect width="228" height="263" fill="none"/><g fill="none" stroke-width="4"><path stroke="#d1ad3e" d="M182.286,314.714H163.429a11.364,11.364,0,0,0-10.6,7.952c-2.667,8.083,4.333,14.5,9.083,14.5s-23.917.4-23.917.4-11.937.366-11.917,11.679,14.1,12.125,10.06,12.179c-6.83,1.259-14.821,3.914-21.226,12.238A31.32,31.32,0,0,0,110,383.188a46.649,46.649,0,0,0-1.937,11.438" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M135,361h36s4.979.333,8.333,3.417,3.573,8.177,3.573,8.177.219,5.031-3.156,8.323a19.007,19.007,0,0,1-8.25,4.333" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M147.5,388.5H122.25a23.9,23.9,0,0,0-14.75,7c-6.25,6.583-6.333,12-6.5,16s1.75,11.25,7.667,16.667A20.928,20.928,0,0,0,116.875,433c6.317,1.883,13.813.875,13.813.875" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M194.5,399.875s-.906,6-4.125,9.25-8.75,3.75-8.75,3.75h-33.5a11.926,11.926,0,0,0-10.75,9.813,11.325,11.325,0,0,0,2.813,9.875c3.019,3.217,7.938,4.188,7.938,4.188" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M112.75,431s-3.5,7.917,3.917,18.75a28.083,28.083,0,0,0,18.917,11.917h31.583s8.167-.167,12.25-3.583S183.5,448,183.5,448" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M135,461.25s-5.562,1.5-8,4.75-2.687,6.063-2.125,8.313A11.284,11.284,0,0,0,129.833,482c3.9,2.813,12.417,2,12.417,2" transform="translate(-86 -263)"/><path stroke="#c21400" d="M142.25,485.5s1,26.333,27.625,24.25,24.625-25.5,24.625-25.5v-202" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M204,400.375s.906,5.823,4.25,9.042,9,3.333,9,3.333l38,.25a13.132,13.132,0,0,1,7.167,3.333c2.813,2.875,4.083,8.417,4.083,8.417" transform="translate(-86 -263)"/><path stroke="#c21400" d="M225.813,460.469s-6.344.188-10.25-4.687a11.784,11.784,0,0,1-2.625-9.75,12.857,12.857,0,0,1,3.875-6.656,12.7,12.7,0,0,1,7-2.937H243.5s5.094.953,8.063,3.938,3.813,8,3.813,8v37.75s-.156,11.167-6.875,17.042a26.855,26.855,0,0,1-20,6.458c-5.312-.5-10.875-1.5-17.375-8s-7-15.458-7-15.458L204,304.25s.375-7.875,7.667-15.75,18.458-7.25,18.458-7.25,10.375,0,17.542,7.25a29.26,29.26,0,0,1,7.833,16.833v32.833" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M214.75,326.625a14.609,14.609,0,0,1,3-8.125,12.678,12.678,0,0,1,7.5-3.875h10.375s4.031.375,6.344,2.719a12.687,12.687,0,0,1,3.406,6.625,11.3,11.3,0,0,1-2.344,9.281c-3.156,4.219-8.594,4.031-8.594,4.031l25.5.281a11.662,11.662,0,0,1,8.406,3.156,13.216,13.216,0,0,1,3.75,8.531s-.062,4.75-2.844,7.813-8,4.438-8,4.438" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M289.75,394.848a40.009,40.009,0,0,0-1.375-11.285,34.431,34.431,0,0,0-5.062-9.75,40.067,40.067,0,0,0-9.875-8.5,39.559,39.559,0,0,0-12.187-4.062h-35.5a10.655,10.655,0,0,0-7.437,3.75,11.905,11.905,0,0,0,0,15.875,15.579,15.579,0,0,0,8.5,4.688" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M250,388.375h25.25s9.125.875,15.25,6.875,6.688,15.25,6.688,15.25.063,9.25-5.75,16-16.187,8-16.187,8" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M285.75,431.375A28.451,28.451,0,0,1,281,450.417c-6.333,9.083-18.25,11.208-18.25,11.208H241" transform="translate(-86 -263)"/><path stroke="#d1ad3e" d="M264.625,461.625a13.028,13.028,0,0,1,6.844,4.688,12.482,12.482,0,0,1,2.063,7.781,11.816,11.816,0,0,1-4.219,7.188,12.033,12.033,0,0,1-8.146,2.552H228.833" transform="translate(-86 -263)"/></g><g><circle fill="#d1ad3e" r="5" cx="96" cy="52"/><circle fill="#d1ad3e" r="5" cx="78" cy="75"/><circle fill="#d1ad3e" r="5" cx="85" cy="122"/><circle fill="#d1ad3e" r="5" cx="61" cy="125"/><circle fill="#d1ad3e" r="5" cx="45" cy="171"/><circle fill="#d1ad3e" r="5" cx="63" cy="173"/><circle fill="#d1ad3e" r="5" cx="98" cy="186"/><circle fill="#d1ad3e" r="5" cx="155" cy="199"/><circle fill="#d1ad3e" r="5" cx="189" cy="171"/><circle fill="#d1ad3e" r="5" cx="180" cy="162"/><circle fill="#d1ad3e" r="5" cx="164" cy="125"/><circle fill="#d1ad3e" r="5" cx="141" cy="122"/><circle fill="#d1ad3e" r="5" cx="149" cy="74"/><circle fill="#d1ad3e" r="5" cx="129" cy="63"/><circle fill="#c21400" r="5" cx="108" cy="20"/><circle fill="#d1ad3e" r="5" cx="144" cy="221"/><circle fill="#c21400" r="5" cx="57" cy="221"/><circle fill="#c21400" r="5" cx="140" cy="198"/></g></svg>`

const LogoBlur = ({
  className = '',
  circleSize = 0.35,
  circleEdge = 0.4,
}: {
  className?: string
  circleSize?: number
  circleEdge?: number
}) => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let animationFrameId: number
    let time = 0, lastTime = 0

    const vMouse = new THREE.Vector2()
    const vMouseDamp = new THREE.Vector2(0.5, 0.5)
    const vResolution = new THREE.Vector2()

    let w = 1, h = 1
    let material: THREE.ShaderMaterial

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera()
    camera.position.z = 1

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const geo = new THREE.PlaneGeometry(1, 1)

    // Create a transparent placeholder texture initially
    const placeholderTex = new THREE.DataTexture(new Uint8Array([0,0,0,0]), 1, 1, THREE.RGBAFormat)
    placeholderTex.needsUpdate = true

    material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_mouse: { value: vMouseDamp },
        u_resolution: { value: vResolution },
        u_pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        u_circleSize: { value: circleSize },
        u_circleEdge: { value: circleEdge },
        u_texture: { value: placeholderTex },
      },
      transparent: true,
      depthWrite: false,
    })

    const quad = new THREE.Mesh(geo, material)
    scene.add(quad)

    // Now load the SVG texture
    const svgDataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(SVG_DATA)
    const loader = new THREE.TextureLoader()
    loader.load(svgDataUrl, (tex) => {
      tex.needsUpdate = true
      material!.uniforms.u_texture.value = tex
    })

    const onPointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect()
      vMouse.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      )
    }

    document.addEventListener('mousemove', onPointerMove)
    document.addEventListener('pointermove', onPointerMove)

    const resize = () => {
      if (!mountRef.current) return
      w = mountRef.current.clientWidth
      h = mountRef.current.clientHeight
      const dpr = Math.min(window.devicePixelRatio, 2)

      renderer.setSize(w, h)
      renderer.setPixelRatio(dpr)

      camera.left = -w / 2
      camera.right = w / 2
      camera.top = h / 2
      camera.bottom = -h / 2
      camera.updateProjectionMatrix()

      quad.scale.set(w, h, 1)
      vResolution.set(w * dpr, h * dpr)
      material.uniforms.u_pixelRatio.value = dpr
    }

    resize()
    window.addEventListener('resize', resize)

    const ro = new ResizeObserver(() => resize())
    if (mountRef.current) ro.observe(mountRef.current)

    const update = () => {
      time = performance.now() * 0.001
      const dt = time - lastTime
      lastTime = time

      vMouseDamp.x = THREE.MathUtils.damp(vMouseDamp.x, vMouse.x, 8, dt)
      vMouseDamp.y = THREE.MathUtils.damp(vMouseDamp.y, vMouse.y, 8, dt)

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(update)
    }
    update()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      ro.disconnect()
      document.removeEventListener('mousemove', onPointerMove)
      document.removeEventListener('pointermove', onPointerMove)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [circleSize, circleEdge])

  return <div className={className} ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'crosshair' }} />
}

export default LogoBlur