import * as THREE from 'three';
import Config from './config';

/**Store for config.js settings*/
export default {
	state: (): Config => ({
		con_restricted: false,
		c_fov: 70,
		c_AspectRatio: 1.777777,
		c_NearClip: 0.1,
		c_FarClip: 1000,
		c_Position: [0, 0, 0],
		r_Width: 1920,
		r_Height: 1080,
		r_PixelRatio: 1.0,
		i_Helpers: false,
		i_GridSize: 100,
		i_GridDivisions: 25,
		s_BackgroundColor: new THREE.Color(0x3c3c3c),
	}),
	mutations: {

	},
};
