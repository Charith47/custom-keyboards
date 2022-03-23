import * as THREE from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Editor } from './Editor';

class Loader {
	scene: THREE.Scene;
	reader: FileReader;

	constructor(editor: Editor) {
		this.scene = editor.scene;
		this.reader = new FileReader();
	}

}

export { Loader };
