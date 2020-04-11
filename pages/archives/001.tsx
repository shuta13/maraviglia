import React, { useEffect } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  TorusKnotBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  AmbientLight,
  PointLight,
} from "three";

// types, interface
type HandleResizeParams = {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};

const handleResize = ({ camera, renderer }: HandleResizeParams) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
};

const _001: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      1,
      1000
    );
    camera.position.set(-10, 0, 15);
    camera.lookAt(scene.position);

    // const clock = new Clock();

    const geometry = new TorusKnotBufferGeometry(3, 1, 256, 10);
    const material = new MeshStandardMaterial({ color: 0xcccccc });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const pointLight = new PointLight(0xffffff, 0.8);
    scene.add(pointLight);

    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor("#1d1d1d");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    window.addEventListener("resize", () => handleResize({ camera, renderer }));
  };
  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize);
  });
  return (
    <>
      <div className="container">
        <canvas className="canvas" ref={onCanvasLoaded}></canvas>
      </div>
    </>
  );
};

export default _001;
