import { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

// ── SHADERS FOR REALISTIC PLASMA CORE ─────────────────────
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    float displacement = sin(position.x * 8.0 + uTime * 2.0) * sin(position.y * 8.0 + uTime * 3.0) * sin(position.z * 8.0 + uTime * 1.5) * 0.04;
    vec3 newPosition = position + normal * displacement;
    vPosition = newPosition;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  uniform float uTime;
  uniform vec3 colorCenter;
  uniform vec3 colorEdge;

  void main() {
    float noise1 = sin(vPosition.x * 6.0 + uTime * 1.2) * cos(vPosition.y * 6.0 + uTime * 0.8);
    float noise2 = sin(vPosition.z * 10.0 - uTime * 1.5);
    float plasma = smoothstep(0.0, 1.0, abs(noise1 + noise2));

    vec3 viewDirection = normalize(vec3(0.0, 0.0, 1.0));
    float fresnel = dot(viewDirection, vNormal);
    fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
    fresnel = pow(fresnel, 2.5); 

    vec3 baseColor = mix(colorCenter, colorEdge, plasma * 0.8);
    vec3 finalColor = baseColor + (colorEdge * fresnel * 1.5);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function CinematicScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 200);
    camera.position.set(0, 1.5, 7.5);
    camera.lookAt(0, 0, 0);

    // ── Post-Processing ───────────────────────────────────
    const renderScene = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(W, H), 2.0, 0.5, 0.1);
    const composer = new EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    // ── Core Plasma ───────────────────────────────────────
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    const coreUniforms = {
      uTime: { value: 0.0 },
      colorCenter: { value: new THREE.Color(0x220088) },
      colorEdge: { value: new THREE.Color(0xdd66ff) }   
    };

    const coreMat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: coreUniforms,
    });

    const core = new THREE.Mesh(new THREE.SphereGeometry(0.5, 128, 128), coreMat);
    coreGroup.add(core);

    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xaa44ff, transparent: true, opacity: 0.1,
      blending: THREE.AdditiveBlending, side: THREE.BackSide, depthWrite: false
    });
    coreGroup.add(new THREE.Mesh(new THREE.SphereGeometry(0.65, 64, 64), auraMat));

    // ── Lights ────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x0a0015, 2));
    const pointLight = new THREE.PointLight(0xcc66ff, 100, 20);
    scene.add(pointLight);

    // ── Energy Rings & Particles ──────────────────────────
    const energyStructures = new THREE.Group();
    scene.add(energyStructures);
    const animatedElements = [];

    const makeWavyRibbon = (rx, ry, waves, waveAmp, color, opacity, tubeWidth) => {
      const pts = [];
      const segs = 400; 
      for (let i = 0; i <= segs; i++) {
        const t = (i / segs) * Math.PI * 2;
        const z = Math.sin(t * waves) * waveAmp;
        pts.push(new THREE.Vector3(Math.cos(t) * rx, Math.sin(t) * ry, z));
      }
      const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), segs, tubeWidth, 8, true);
      const mat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color), transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      return new THREE.Mesh(geo, mat);
    };

    const makeParticleSwarm = (rx, ry, waves, waveAmp, color, count, spread, size) => {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const t = Math.random() * Math.PI * 2;
        const zWave = Math.sin(t * waves) * waveAmp;
        pos[i * 3] = Math.cos(t) * rx + (Math.random() - 0.5) * spread;
        pos[i * 3 + 1] = Math.sin(t) * ry + (Math.random() - 0.5) * spread;
        pos[i * 3 + 2] = zWave + (Math.random() - 0.5) * spread;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({
        color: new THREE.Color(color), size, transparent: true, opacity: 0.6,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
      });
      return new THREE.Points(geo, mat);
    };

    const ringConfigs = [
      { rx: 2.5, ry: 1.2, waves: 3, amp: 0.6, c: 0xcc55ff, op: 0.8, w: 0.008, speed: 0.002, rotZ: 0.2 },
      { rx: 2.6, ry: 1.3, waves: 3, amp: -0.5, c: 0x00eeff, op: 0.6, w: 0.005, speed: 0.0025, rotZ: 0.1 },
      { rx: 1.8, ry: 0.8, waves: 4, amp: 0.4, c: 0x9933ff, op: 0.5, w: 0.006, speed: -0.003, rotZ: -0.3 },
      { rx: 1.9, ry: 0.9, waves: 2, amp: 0.7, c: 0xff44aa, op: 0.4, w: 0.004, speed: 0.0015, rotZ: 0.4 },
    ];

    ringConfigs.forEach(conf => {
      const ribbon = makeWavyRibbon(conf.rx, conf.ry, conf.waves, conf.amp, conf.c, conf.op, conf.w);
      ribbon.rotation.z = conf.rotZ;
      energyStructures.add(ribbon);
      animatedElements.push({ mesh: ribbon, speed: conf.speed });

      const particles = makeParticleSwarm(conf.rx, conf.ry, conf.waves, conf.amp, conf.c, 3000, 0.3, 0.02);
      particles.rotation.z = conf.rotZ;
      energyStructures.add(particles);
      animatedElements.push({ mesh: particles, speed: conf.speed * 0.8 });
    });

    // ── Mouse & 360 Rotation Control ──────────────────────
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const onMove = (e) => {
      // Parallax mouse values
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 1.5;

      // 360 Degree Mapping (Full 2*PI rotation)
      targetRotation.y = (e.clientX / window.innerWidth - 0.5) * (Math.PI * 2);
      targetRotation.x = (e.clientY / window.innerHeight - 0.5) * (Math.PI * 2);
    };
    window.addEventListener("mousemove", onMove);

    // ── Animation Loop ────────────────────────────────────
    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      coreUniforms.uTime.value = t; 
      const pulse = 1 + Math.sin(t * 3) * 0.03;
      coreGroup.scale.set(pulse, pulse, pulse);

      animatedElements.forEach(({ mesh, speed }) => {
        mesh.rotation.y = t * speed * 100;
        mesh.rotation.x = Math.sin(t * speed * 50) * 0.1;
      });

      // Smooth Rotation Lerp
      const lerpSpeed = 0.05;
      currentRotation.x += (targetRotation.x - currentRotation.x) * lerpSpeed;
      currentRotation.y += (targetRotation.y - currentRotation.y) * lerpSpeed;

      coreGroup.rotation.x = currentRotation.x;
      coreGroup.rotation.y = currentRotation.y;
      energyStructures.rotation.x = currentRotation.x;
      energyStructures.rotation.y = currentRotation.y;

      // Camera Parallax
      camera.position.x += (mouse.x - camera.position.x) * 0.02;
      camera.position.y += (mouse.y + 1.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      composer.render();
    };
    animate();

    // ── Utilities ─────────────────────────────────────────
    const updateOffset = () => {
      const offset = window.innerWidth > 900 ? 2.5 : 0; 
      coreGroup.position.x = energyStructures.position.x = pointLight.position.x = offset;
    };
    updateOffset();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      composer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      updateOffset();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      composer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", position: "absolute", inset: 0, overflow: "hidden" }} />;
}