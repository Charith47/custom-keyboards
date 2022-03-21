import * as THREE from 'three';
import ThreeConfig from './three-store';

/**Store for three.js settings*/
export default {
	state: (): ThreeConfig => ({
		camera: null,
		scene: null,
		renderer: null,
		controls: null,
		gridHelper: null,
		axesHelper: null,
		pointLightHelper: null,

		con_restricted: false,
		c_fov: 70,
		c_AspectRatio: 1.777777,
		c_NearClip: 0.1,
		c_FarClip: 1000,
		c_Position: [0, 0, 0],
		r_Width: 1920,
		r_Height: 1080,
		r_PixelRatio: 2.0,
		i_Helpers: false,
		i_GridSize: 100,
		i_GridDivisions: 25,
		s_BackgroundColor: new THREE.Color(0x3c3c3c),
	}),
	mutations: {
		setCamera: (state: ThreeConfig, camera: ThreeConfig['camera']): void => {
			state.camera = camera;
		},
		setScene: (state: ThreeConfig, scene: ThreeConfig['scene']): void => {
			state.scene = scene;
		},
		setRenderer: (
			state: ThreeConfig,
			renderer: ThreeConfig['renderer']
		): void => {
			state.renderer = renderer;
		},
		setControls: (
			state: ThreeConfig,
			controls: ThreeConfig['controls']
		): void => {
			state.controls = controls;
		},
		setGridHelper: (
			state: ThreeConfig,
			gridHelper: ThreeConfig['gridHelper']
		): void => {
			state.gridHelper = gridHelper;
		},
		setAxesHelper: (
			state: ThreeConfig,
			axesHelper: ThreeConfig['axesHelper']
		): void => {
			state.axesHelper = axesHelper;
		},
		setPointLightHelper: (
			state: ThreeConfig,
			pointLightHelper: ThreeConfig['pointLightHelper']
		): void => {
			state.pointLightHelper = pointLightHelper;
		},
	},
};
