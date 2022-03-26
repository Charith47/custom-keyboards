import * as THREE from 'three';
import signals from 'signals';

import { Loader } from './Loader';

const _DEFAULT_CAMERA = new THREE.PerspectiveCamera(
	70,
	window.innerWidth / window.innerHeight,
	0.01,
	1000
);
_DEFAULT_CAMERA.name = 'Camrea';
_DEFAULT_CAMERA.position.set(10, 10, 10);
_DEFAULT_CAMERA.lookAt(new THREE.Vector3());

const axesHelper = new THREE.AxesHelper(25);
const gridHelper = new THREE.GridHelper(100, 25);

const Signal = signals.Signal;

class Editor {
	static instance: Editor;

	signals: Record<string, any> = {};

	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;

	objects: Record<string, any> = {};

	pickableObjects: THREE.Mesh[] = [];
	originalMaterials: { [id: string]: THREE.Material | THREE.Material[] } = {};

	private constructor() {
		this.signals = {
			windowResized: new Signal(),
			mouseMoved: new Signal(),
		};

		this.camera = _DEFAULT_CAMERA.clone();
		this.scene = new THREE.Scene();
		this.scene.name = 'Scene';
		this.scene.background = new THREE.Color(0x3c3c3c);

		this.scene.add(axesHelper);
		this.scene.add(gridHelper);

		this.setupScene();
	}

	static getInstance(): Editor {
		if (!Editor.instance) {
			Editor.instance = new Editor();
		}

		return Editor.instance;
	}

	public async setupScene() {
		const loader = new Loader();

		let cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
		let cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000aa });
		cubeMaterial.name = 'cubemat';
		let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.name = 'cube';

		let geometry = new THREE.PlaneGeometry(50, 100);
		let material = new THREE.MeshPhongMaterial({ color: 0xffffff });
		let plane = new THREE.Mesh(geometry, material);

		plane.rotateX(-1.5708);
		plane.position.set(0, -0.85, 0);

		let pointLight = new THREE.PointLight(0xffffff); // move to editor
		pointLight.position.set(75, 75, 75);

		const keyboard = await loader.gltfLoad('keyboard-01');

		this.scene.add(cube);
		this.scene.add(keyboard.scene);
		this.scene.add(pointLight);
		this.scene.add(plane);

		this.scene.traverse((child) => {
			if ((child as THREE.Mesh).isMesh) {
				const mesh = child as THREE.Mesh;
				this.pickableObjects.push(mesh);
				this.originalMaterials[mesh.name] = (mesh as THREE.Mesh).material;
			}
		});
	}
}

export { Editor };
