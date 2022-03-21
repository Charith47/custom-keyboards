import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
/** Interface defining state property types required for three.js*/
export default interface ThreeConfig {
	/** three.js camera instance*/
	camera: THREE.Camera | null;
	/** three.js scene instance*/
	scene: THREE.Scene | null;
	/** three.js renderer instance*/
	renderer: THREE.Renderer | null;
	/** three.js orbit controls instance*/
	controls: typeof OrbitControls | null;
	/** three.js grid helper instance*/
	gridHelper: THREE.GridHelper | null;
	/** three.js axes helper instance*/
	axesHelper: THREE.AxesHelper | null;
	/** three.js point light helper instance*/
	pointLightHelper: THREE.PointLightHelper | null;

	/** enable/disable console restrictions */
	con_restricted: Boolean;
	/** camera field of view*/
	c_fov: Number;
	/** camera aspect ratio*/
	c_AspectRatio: Number;
	/** camera near clipping plane*/
	c_NearClip: Number;
	/** camera far clipping plane*/
	c_FarClip: Number;
	/** camera position [x, y, z]*/
	c_Position: [Number, Number, Number];
	/** render scale width*/
	r_Width: Number;
	/** render scale height*/
	r_Height: Number;
	/** render pixel ratio*/
	r_PixelRatio: Number;
	/** enable/disable helpers*/
	i_Helpers: Boolean;
	/** grid helper grid size*/
	i_GridSize: Number;
	/** grid helper grid divisions*/
	i_GridDivisions: Number;
	/** scene background color*/
	s_BackgroundColor: THREE.Color;
}
