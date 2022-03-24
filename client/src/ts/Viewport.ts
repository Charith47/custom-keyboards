import * as THREE from 'three';

import { Editor } from './Editor';
import { Loader } from './Loader'; // move to editor
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';

import { GUI } from 'dat.gui';

class Viewport {
	static instance: Viewport;

	editor: Editor; // camera, scene

	signals: Editor['signals'];
	canvas: Element;
	renderer: THREE.WebGLRenderer;
	controls: OrbitControls;

	// passes and composition
	composer: EffectComposer;
	renderPass: RenderPass;
	saoPass: SAOPass;

	// gui
	gui: GUI;

	private constructor(editor: Editor) {
		this.editor = editor;
		this.signals = editor.signals;

		// add listners
		this.signals.windowResized.add(() => {
			this.onWindowResize();
		});

		this.canvas = document.createElement('div');
		this.canvas.setAttribute('id', 'canvas');

		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setPixelRatio(2.0);
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		// post processing passes
		this.composer = new EffectComposer(this.renderer);

		this.renderPass = new RenderPass(this.editor.scene, this.editor.camera);
		this.composer.addPass(this.renderPass);

		this.saoPass = new SAOPass(
			this.editor.scene,
			this.editor.camera,
			true,
			true,
			new THREE.Vector2(window.innerWidth, window.innerHeight)
		);
		this.composer.addPass(this.saoPass);

		this.gui = new GUI();
		this.gui
			.add(this.saoPass.params, 'output', {
				Beauty: 0,
				Default: 1,
				SAO: 2,
				Depth: 3,
				Normal: 4,
			})
			.onChange((value) => {
				this.saoPass.params.output = parseInt(value);
			});

		// this.gui.add(this.saoPass.params, 'saoBias', -1, 1);
		// this.gui.add(this.saoPass.params, 'saoIntensity', 0, 1);
		// this.gui.add(this.saoPass.params, 'saoScale', 0, 10);
		// this.gui.add(this.saoPass.params, 'saoKernelRadius', 1, 100);
		// this.gui.add(this.saoPass.params, 'saoMinResolution', 0.0, 1);
		// this.gui.add(this.saoPass.params, 'saoBlur', true);
		// this.gui.add(this.saoPass.params, 'saoBlurRadius', 0, 200);
		// this.gui.add(this.saoPass.params, 'saoBlurStdDev', 0.5, 150);
		// this.gui.add(this.saoPass.params, 'saoBlurDepthCutoff', 0.0, 0.1);

		this.saoPass.params = {
			output: 0,
			saoBias: -0.942,
			saoIntensity: 0.02,
			saoScale: 20,
			saoKernelRadius: 100,
			saoMinResolution: 0,
			saoBlur: true,
			saoBlurRadius: 8,
			saoBlurStdDev: 100,
			saoBlurDepthCutoff: 0.1,
		};

		this.controls = new OrbitControls(
			this.editor.camera,
			this.renderer.domElement
		);

		let pointLight = new THREE.PointLight(0xffffff); // move to editor
		pointLight.position.set(75, 75, 75);

		//let geometry = new THREE.BoxGeometry(3, 3, 3);
		//let material = new THREE.MeshPhongMaterial({ color: 0x0000aa });
		//let cube = new THREE.Mesh(geometry, material);

		let geometry = new THREE.PlaneGeometry(50, 100);
		let material = new THREE.MeshPhongMaterial({ color: 0xffffff });
		let plane = new THREE.Mesh(geometry, material);

		plane.rotateX(-1.5708)
		plane.position.set(0,-0.85,0)

		const loader = new Loader(this.editor);
		loader.gltfLoad('keyboard-01');

		this.editor.scene.add(pointLight);
		//this.editor.scene.add(cube);
		this.editor.scene.add(plane);

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
		//this.renderer.render(this.editor.scene, this.editor.camera);
		this.composer.render();
	}

	public onWindowResize() {
		const newWidth = window.innerWidth;
		const newHeight = window.innerHeight;

		this.editor.camera.aspect = newWidth / newHeight;
		this.editor.camera.updateProjectionMatrix();

		// set post processing sizes ?
		this.renderer.setSize(newWidth, newHeight);
	}
}

export { Viewport };
