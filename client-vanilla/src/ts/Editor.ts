import * as THREE from 'three';

const _DEFAULT_CAMERA = new THREE.PerspectiveCamera(70, 1, 0.01, 1000);
_DEFAULT_CAMERA.name = 'Camrea';
_DEFAULT_CAMERA.position.set(50, 50, 50);
//_DEFAULT_CAMERA.lookAt(new THREE.Vector3());

class Editor {
	static instance: Editor;
	camera: THREE.PerspectiveCamera;
	scene: THREE.Scene;

	private constructor() {
		this.camera = _DEFAULT_CAMERA.clone();
		this.scene = new THREE.Scene();
		this.scene.name = 'Scene';
		this.scene.background = new THREE.Color(0x3C3C3C);
	}

	static getInstance(): Editor {
		if (!Editor.instance) {
			Editor.instance = new Editor();
		}

		return Editor.instance;
	}

}

export { Editor };
