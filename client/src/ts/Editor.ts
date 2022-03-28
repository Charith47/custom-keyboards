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

		let cubeGeometry = new THREE.BoxGeometry(3, 4, 3);
		let cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x0000aa });
		let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

		let planeGeometry = new THREE.PlaneGeometry(50, 100);
		let planeMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
		let plane = new THREE.Mesh(planeGeometry, planeMaterial);

		let sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
		let sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x00aa00 });
		let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

		sphere.position.set(3.5, -0.05, -1);

		plane.rotateX(-1.5708);
		plane.position.set(0, -0.85, 0);

		let pointLight = new THREE.PointLight(0xffffff); // move to editor
		pointLight.position.set(75, 75, 75);

		const keyboard = await loader.gltfLoad('keyboard-01')

		//this.scene.add(cube);
		this.scene.add(keyboard.scene)
		this.scene.add(pointLight);
		//this.scene.add(sphere)
		this.scene.add(plane);
	}
}

export { Editor };
