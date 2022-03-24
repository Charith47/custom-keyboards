import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Editor } from './Editor';

class Loader {
	scene: THREE.Scene;
	reader: FileReader;
	gltfLoader: GLTFLoader;

	constructor(editor: Editor) {
		this.scene = editor.scene;
		this.reader = new FileReader();
		this.gltfLoader = new GLTFLoader();
	}

	/**Loads gltf from modles/resource/*/
	public gltfLoad(resource: String) {
		this.gltfLoader.load(
			`models/${resource}/scene.gltf`,
			(gltf) => {
				this.normalizeScale(gltf.scene, 100);
				this.scene.add(gltf.scene);
			},
			(xhr) => {
				// TODO progress circle
				console.log((xhr.loaded / xhr.total) * 100, '%');
			},
			(error) => {
				// TODO notify user
				console.log(error);
			}
		);
	}

	/** Uniformly scales the model to normal size */
	private normalizeScale(scene: THREE.Group, amount: number): THREE.Group {
		scene.scale.set(amount, amount, amount);
		return scene;
	}
}

export { Loader };
