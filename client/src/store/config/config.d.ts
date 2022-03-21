import * as THREE from 'three';

/** Interface defining state property types required for config.js*/
export default interface Config {
	/** enable/disable console restrictions */
	con_restricted: boolean;
	/** camera field of view*/
	c_fov: number;
	/** camera aspect ratio*/
	c_AspectRatio: number;
	/** camera near clipping plane*/
	c_NearClip: number;
	/** camera far clipping plane*/
	c_FarClip: number;
	/** camera position [x, y, z]*/
	c_Position: [number, number, number];
	/** render scale width*/
	r_Width: number;
	/** render scale height*/
	r_Height: number;
	/** render pixel ratio*/
	r_PixelRatio: number;
	/** enable/disable helpers*/
	i_Helpers: boolean;
	/** grid helper grid size*/
	i_GridSize: number;
	/** grid helper grid divisions*/
	i_GridDivisions: number;
	/** scene background color*/
	s_BackgroundColor: THREE.Color;
}
