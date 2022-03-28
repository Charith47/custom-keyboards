import * as THREE from 'three';
import {
	EffectComposer,
	EffectPass,
	NormalPass,
	DepthDownsamplingPass,
	SSAOEffect,
	BlendFunction,
	TextureEffect,
} from 'postprocessing';
import { Editor } from '../Editor';

class SSAOPass {
	static instance: SSAOPass;

	effectPass: EffectPass;

	// takes composer
	private constructor(composer: EffectComposer, editor: Editor) {
		const renderer = composer.getRenderer();
		const capabilities = renderer.capabilities;

		// camera? scene?

		// normal
		const normalPass = new NormalPass(editor.scene, editor.camera);
		const depthDownsamplingPass = new DepthDownsamplingPass({
			normalBuffer: normalPass.texture,
			resolutionScale: 0.5,
		});

		const normalDepthBuffer = depthDownsamplingPass.texture;

		// SMAA?
		// @ts-ignore
		const ssaoEffect = new SSAOEffect(editor.camera, normalPass.texture, {
			depthAwareUpsampling: true,
			normalDepthBuffer,
            resolutionScale: 0.5,
			samples: 32,
			rings: 16,
			radius: 1.0,
			intensity: 4.0,
			fade: 0,
			bias: 0.025,
			luminanceInfluence: 0.5,
			blendFunction: BlendFunction.MULTIPLY,
		});

		const textureEffect = new TextureEffect({
			blendFunction: BlendFunction.SKIP,
			texture: depthDownsamplingPass.texture,
		});

		this.effectPass = new EffectPass(editor.camera, ssaoEffect, textureEffect);
	}

	static getInstance(composer: EffectComposer, editor: Editor): SSAOPass {
		if (!SSAOPass.instance) {
			SSAOPass.instance = new SSAOPass(composer, editor);
		}

		return SSAOPass.instance;
	}
}

export { SSAOPass };
