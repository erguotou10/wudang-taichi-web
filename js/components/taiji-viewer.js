/**
 * 太极 3D 渲染器 - 标准 Three.js 版本
 * 通过 import map 加载 Three.js
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class TaijiViewer {
  constructor(canvasId) {
    this.canvasId = canvasId;
    this._destroyed = false;
    this._scene = null;
    this._camera = null;
    this._renderer = null;
    this._controls = null;
    this._mixer = null;
    this._model = null;
    this._isPlaying = true;
    this._clock = null;
  }

  async init() {
    const canvas = document.getElementById(this.canvasId);
    if (!canvas) {
      console.warn('Canvas not found:', this.canvasId);
      return;
    }

    // 等待一帧确保 layout 完成
    await new Promise(resolve => requestAnimationFrame(resolve));

    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width || 400;
    const height = rect.height || 300;

    // 渲染器
    this._renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this._renderer.setSize(width, height, false);
    this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this._renderer.outputColorSpace = THREE.SRGBColorSpace;
    this._renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // 场景
    this._scene = new THREE.Scene();

    // 相机
    this._camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this._camera.position.set(3, 3, 5);
    this._camera.lookAt(0, 1, 0);

    // 控制器
    this._controls = new OrbitControls(this._camera, canvas);
    this._controls.target.set(0, 1, 0);
    this._controls.enableDamping = true;
    this._controls.dampingFactor = 0.08;
    this._controls.minDistance = 2;
    this._controls.maxDistance = 15;
    this._controls.maxPolarAngle = Math.PI / 2 + 0.3;
    this._controls.update();

    // 光照
    this._setupLights();

    // 地面
    this._setupGround();

    // 占位模型
    this._createPlaceholder();

    // 时钟
    this._clock = new THREE.Clock();

    // 渲染循环
    this._animate();

    // 窗口缩放
    this._onResize = () => {
      const r = canvas.parentElement.getBoundingClientRect();
      const w = r.width || 400;
      const h = r.height || 300;
      this._camera.aspect = w / h;
      this._camera.updateProjectionMatrix();
      this._renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', this._onResize);
  }

  _setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this._scene.add(ambient);

    const directional = new THREE.DirectionalLight(0xffffff, 1.0);
    directional.position.set(5, 8, 5);
    this._scene.add(directional);

    const fill = new THREE.DirectionalLight(0xd4a574, 0.3);
    fill.position.set(-3, 4, -2);
    this._scene.add(fill);
  }

  _setupGround() {
    const geo = new THREE.PlaneGeometry(20, 20);
    const mat = new THREE.MeshStandardMaterial({ color: 0xf5f0eb, roughness: 0.9 });
    const ground = new THREE.Mesh(geo, mat);
    ground.rotation.x = -Math.PI / 2;
    this._scene.add(ground);
  }

  _createPlaceholder() {
    const group = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xb8322a, roughness: 0.7 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xf5deb3, roughness: 0.6 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2c, roughness: 0.8 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4a574, metalness: 0.5, roughness: 0.3 });

    // 躯干
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.2, 1.2, 16), bodyMat);
    body.position.y = 1.2;
    group.add(body);

    // 头
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), skinMat);
    head.position.y = 2.0;
    group.add(head);

    // 手臂
    const armGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.8, 8);
    const leftArm = new THREE.Mesh(armGeo, bodyMat);
    leftArm.position.set(-0.45, 1.4, 0);
    leftArm.rotation.z = 0.5;
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, bodyMat);
    rightArm.position.set(0.45, 1.4, 0);
    rightArm.rotation.z = -0.5;
    group.add(rightArm);

    // 腿
    const legGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.9, 8);
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.set(-0.15, 0.45, 0);
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.set(0.15, 0.45, 0);
    group.add(rightLeg);

    // 底座太极圈
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.03, 8, 32), goldMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    group.add(ring);

    this._scene.add(group);
    this._model = group;
  }

  _animate() {
    if (this._destroyed) return;
    requestAnimationFrame(() => this._animate());

    const delta = this._clock.getDelta();
    if (this._mixer && this._isPlaying) this._mixer.update(delta);
    if (this._controls) this._controls.update();
    if (this._renderer) this._renderer.render(this._scene, this._camera);
  }

  togglePlay() {
    this._isPlaying = !this._isPlaying;
    if (this._isPlaying) this._clock.start();
    return this._isPlaying;
  }

  setPlaying(playing) {
    this._isPlaying = playing;
    if (playing) this._clock.start();
  }

  setSpeed(speed) {
    if (this._mixer) this._mixer.timeScale = speed;
  }

  setViewAngle(angle) {
    if (!this._camera || !this._controls) return;
    const targets = {
      front: { x: 0, y: 2, z: 5 },
      side: { x: 5, y: 2, z: 0 },
      top: { x: 0, y: 6, z: 0.1 }
    };
    const target = targets[angle] || targets.front;
    const start = { x: this._camera.position.x, y: this._camera.position.y, z: this._camera.position.z };
    const duration = 600;
    const startTime = Date.now();

    const animate = () => {
      const t = Math.min((Date.now() - startTime) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      this._camera.position.set(
        start.x + (target.x - start.x) * ease,
        start.y + (target.y - start.y) * ease,
        start.z + (target.z - start.z) * ease
      );
      this._controls.target.set(0, 1, 0);
      this._controls.update();
      if (t < 1) requestAnimationFrame(animate);
    };
    animate();
  }

  destroy() {
    this._destroyed = true;
    if (this._renderer) this._renderer.dispose();
    if (this._controls) this._controls.dispose();
    if (this._onResize) window.removeEventListener('resize', this._onResize);
  }
}
