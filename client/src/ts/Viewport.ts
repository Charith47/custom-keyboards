import * as THREE from 'three';

import { Editor } from './Editor';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { EffectComposer, RenderPass } from 'postprocessing';

import { GUI } from 'dat.gui';
import { SSAOPass } from './postprocessing/ssaoPass';

class Viewport {
	static instance: Viewport;

	// camera, scene
	editor: Editor;

	signals: Editor['signals'];
	canvas: Element;
	renderer: THREE.WebGLRenderer;
	composer: EffectComposer;

	// controls
	controls: OrbitControls;

	// gui
	gui: GUI;

	private constructor(editor: Editor) {
		this.editor = editor;
		this.signals = editor.signals;
		this.gui = new GUI();

		// add listners
		this.signals.windowResized.add(() => {
			this.onWindowResize();
		});

		this.canvas = document.createElement('div');
		this.canvas.setAttribute('id', 'canvas');

		this.renderer = new THREE.WebGLRenderer({
			antialias: false,
			powerPreference: 'high-performance',
			stencil: false,
			depth: false,
			//
		});

		//this.renderer.physicallyCorrectLights = true;

		this.renderer.setPixelRatio(1.0);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.composer = new EffectComposer(this.renderer);
		this.composer.addPass(
			new RenderPass(this.editor.scene, this.editor.camera)
		);

		// effect pass from class instance (ssaoPass.getInstance())
		const ssaoPass = SSAOPass.getInstance(this.composer, this.editor);
		this.composer.addPass(ssaoPass.effectPass);

		this.controls = new OrbitControls(
			this.editor.camera,
			this.renderer.domElement
		);

		this.canvas.appendChild(this.renderer.domElement);
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
		this.composer.render();
		//this.renderer.render(this.editor.scene, this.editor.camera);
	}

	public onWindowResize() {
		const newWidth = window.innerWidth;
		const newHeight = window.innerHeight;

		this.editor.camera.aspect = newWidth / newHeight;
		this.editor.camera.updateProjectionMatrix();

		this.composer.setSize(newWidth, newHeight);
		this.renderer.setSize(newWidth, newHeight);
	}
}

export { Viewport };
