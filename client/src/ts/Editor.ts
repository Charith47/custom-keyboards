import * as THREE from 'three';
import signals from 'signals';

const _DEFAULT_CAMERA = new THREE.PerspectiveCamera(
	70,
	window.innerWidth / window.innerHeight,
	0.01,
	1000
);
_DEFAULT_CAMERA.name = 'Camrea';
_DEFAULT_CAMERA.position.set(50, 50, 50);
_DEFAULT_CAMERA.lookAt(new THREE.Vector3());

const axesHelper = new THREE.AxesHelper(5);
const gridHelper = new THREE.GridHelper(100, 25);

const Signal = signals.Signal;

class Editor {
	static instance: Editor;

	signals: {
		windowResized: typeof Signal;
	};
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;
	//helpers: {};

	private constructor() {
		//this.helpers = {};
		this.signals = {
			windowResized: new Signal(),
		};

		this.camera = _DEFAULT_CAMERA.clone();
		this.scene = new THREE.Scene();
		this.scene.name = 'Scene';
		this.scene.background = new THREE.Color(0x3c3c3c);

		this.scene.add(axesHelper);
		this.scene.add(gridHelper);
	}

	static getInstance(): Editor {
		if (!Editor.instance) {
			Editor.instance = new Editor();
		}

		return Editor.instance;
	}
    
}

export { Editor };
