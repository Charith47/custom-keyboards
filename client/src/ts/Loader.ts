import * as THREE from 'three';

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

class Loader {
	reader: FileReader;
	gltfLoader: GLTFLoader;

	constructor() {
		this.reader = new FileReader();
		this.gltfLoader = new GLTFLoader();
	}

	/**Loads gltf from modles/resource/*/
	public gltfLoad(resource: String): Promise<GLTF> {
		return new Promise((resolve, reject) => {
			this.gltfLoader.load(
				`models/${resource}/scene.gltf`,
				(gltf) => {
					this.normalizeScale(gltf.scene, 50);
					resolve(gltf);
				},
				(xhr) => {
					// TODO progress circle
					console.log((xhr.loaded / xhr.total) * 100, '%');
				},
				(error) => {
					// TODO notify user
					reject(error);
				}
			);
		});
	}

	/** Uniformly scales the model to normal size */
	private normalizeScale(scene: THREE.Group, amount: number): THREE.Group {
		scene.scale.set(amount, amount, amount);
		return scene;
	}
}

export { Loader };
