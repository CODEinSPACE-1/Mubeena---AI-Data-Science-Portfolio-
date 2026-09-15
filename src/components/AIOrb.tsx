import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AIOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect if low-end mobile
    const isMobile = window.innerWidth < 640;

    // 1. Scene & Camera setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    // 2. Renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isMobile,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
    } catch {
      // Fallback if WebGL not supported
      return;
    }

    // 3. Orb Group (will rotate, float and pulse)
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // 4. Generate points on a sphere (Fibonacci sphere algorithm)
    const numPoints = isMobile ? 120 : 200;
    const radius = 1.35;
    const positions: number[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      positions.push(x * radius, y * radius, z * radius);
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );

    // Particle texture (crisp circular glow)
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(0, 240, 255, 0.9)');
      gradient.addColorStop(0.7, 'rgba(0, 240, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.08 : 0.09,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0x00f0ff,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    orbGroup.add(pointCloud);

    // 5. Connect nearby points with subtle network lines
    const lineIndices: number[] = [];
    const threshold = 0.58; // Connection distance
    const pointVectors: THREE.Vector3[] = [];

    for (let i = 0; i < positions.length; i += 3) {
      pointVectors.push(
        new THREE.Vector3(positions[i], positions[i + 1], positions[i + 2])
      );
    }

    for (let i = 0; i < pointVectors.length; i++) {
      for (let j = i + 1; j < pointVectors.length; j++) {
        if (pointVectors[i].distanceTo(pointVectors[j]) < threshold) {
          lineIndices.push(i, j);
        }
      }
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3)
    );
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      linewidth: 1,
    });

    const networkLines = new THREE.LineSegments(linesGeometry, linesMaterial);
    orbGroup.add(networkLines);

    // 6. Inner Geometric Core (Wireframe Icosahedron with subtle violet accent)
    const innerGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x9d4edd,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    orbGroup.add(innerCore);

    // 7. Center "AI" core text sprite
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 256;
    textCanvas.height = 256;
    const tCtx = textCanvas.getContext('2d');
    if (tCtx) {
      tCtx.clearRect(0, 0, 256, 256);
      tCtx.font = 'bold 88px "Space Grotesk", sans-serif';
      tCtx.fillStyle = '#00F0FF';
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      tCtx.shadowColor = '#00F0FF';
      tCtx.shadowBlur = 18;
      tCtx.fillText('AI', 128, 128);
    }
    const textTexture = new THREE.CanvasTexture(textCanvas);
    const textSpriteMat = new THREE.SpriteMaterial({
      map: textTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const textSprite = new THREE.Sprite(textSpriteMat);
    textSprite.scale.set(0.65, 0.65, 1);
    orbGroup.add(textSprite);

    // 8. Interactive Mouse Parallax
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width - 0.5) * 2;
      mouse.targetY = (clientY / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. Resize handler
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // 10. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Base slow rotation
      orbGroup.rotation.y = elapsedTime * 0.25 + mouse.x * 0.4;
      orbGroup.rotation.x = elapsedTime * 0.12 - mouse.y * 0.3;

      // Counter-rotate inner core for rich cinematic depth
      innerCore.rotation.y = -elapsedTime * 0.35;
      innerCore.rotation.z = elapsedTime * 0.2;

      // Gentle vertical floating
      orbGroup.position.y = Math.sin(elapsedTime * 1.4) * 0.09;

      // Subtle breathing pulse
      const pulse = 1 + Math.sin(elapsedTime * 2.2) * 0.035;
      orbGroup.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      linesGeometry.dispose();
      linesMaterial.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      textTexture.dispose();
      textSpriteMat.dispose();
      particleTexture.dispose();
    };
  }, []);

  return (
    <div className="relative flex h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] md:h-[440px] md:w-[440px] items-center justify-center">
      {/* Subtle outer glow backdrop */}
      <div className="pointer-events-none absolute h-[75%] w-[75%] rounded-full bg-cyan-500/10 blur-3xl animate-subtle-pulse" />
      
      {/* 3D Three.js container */}
      <div
        ref={mountRef}
        className="relative z-10 h-full w-full cursor-grab active:cursor-grabbing"
      />

      {/* Futuristic status badge */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center space-x-2 rounded-full border border-cyan-500/20 bg-[#050505]/70 px-3 py-1 backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF] animate-ping" />
        <span className="font-mono-tech text-[10px] tracking-widest text-cyan-300">
          NEURAL ORB • ONLINE
        </span>
      </div>
    </div>
  );
}
