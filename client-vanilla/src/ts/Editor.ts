import * as THREE from 'three';
import signals from 'signals';

const _DEFAULT_CAMERA = new THREE.PerspectiveCamera(70, 1, 0.01, 1000);
_DEFAULT_CAMERA.name = 'Camrea';
_DEFAULT_CAMERA.position.set(50, 50, 50);
_DEFAULT_CAMERA.lookAt(new THREE.Vector3());

const Signal = signals.Signal;

class Editor {
	static instance: Editor;

	signals: {
		windowResized: typeof Signal,
	};
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;

	private constructor() {
		this.signals = {
			windowResized: new Signal(),
		};

		this.camera = _DEFAULT_CAMERA.clone();
		this.scene = new THREE.Scene();
		this.scene.name = 'Scene';
		this.scene.background = new THREE.Color(0x3c3c3c);
	}

	static getInstance(): Editor {
		if (!Editor.instance) {
			Editor.instance = new Editor();
		}

		return Editor.instance;
	}
}

export { Editor };
