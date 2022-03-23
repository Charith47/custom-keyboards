import * as THREE from 'three';
import { Editor } from './Editor';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class Viewport {
	static instance: Viewport;

	editor: Editor; // camera, scene

	signals: Editor['signals'];
	canvas: Element;
	renderer: THREE.WebGLRenderer;
	controls: OrbitControls;

	private constructor(editor: Editor) {
		this.editor = editor;
		this.signals = editor.signals;

		// add listners
		this.signals.windowResized.add(() => {
			this.onWindowResize();
		});

		this.canvas = document.createElement('div');
		this.canvas.setAttribute('id', 'canvas');

		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(1.0);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.controls = new OrbitControls(
			this.editor.camera,
			this.renderer.domElement
		);

		let pointLight = new THREE.PointLight(0xffffff);
		pointLight.position.set(75, 75, 75);

		let geometry = new THREE.BoxGeometry(10, 20, 30);
		let material = new THREE.MeshPhongMaterial({ color: 0x0000aa });
		let cube = new THREE.Mesh(geometry, material);

		this.editor.scene.add(pointLight);
		this.editor.scene.add(cube);

		this.canvas.appendChild(this.renderer.domElement);
		console.log('child appended');
		this.animate();
	}

	static getInstance(editor: Editor): Viewport {
		if (!Viewport.instance) {
			Viewport.instance = new Viewport(editor);
		}
		return Viewport.instance;
	}

	public animate() {
		requestAnimationFrame(() => {
			this.animate();
		});
		this.controls.update();
		this.renderer.render(this.editor.scene, this.editor.camera);
	}

	public onWindowResize() {
		const newWidth = window.innerWidth;
		const newHeight = window.innerHeight;

		this.editor.camera.aspect = newWidth / newHeight;
		this.editor.camera.updateProjectionMatrix();

		this.renderer.setSize(newWidth, newHeight);
	}
}

export { Viewport };
