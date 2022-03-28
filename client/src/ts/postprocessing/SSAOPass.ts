import {
	EffectComposer,
	EffectPass,
	NormalPass,
	DepthDownsamplingPass,
	SSAOEffect,
	BlendFunction,
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
		const depthDownSamplingPass = new DepthDownsamplingPass({
			normalBuffer: normalPass.texture,
			resolutionScale: 0.5,
		});

		const normalDepthBuffer = capabilities.isWebGL2
			? depthDownSamplingPass.texture
			: undefined;

		// SMAA?

		const ssaoEffect = new SSAOEffect(editor.camera, normalPass.texture);

		this.effectPass = new EffectPass(editor.camera, ssaoEffect);
	}

	static getInstance(composer: EffectComposer, editor: Editor): SSAOPass {
		if (!SSAOPass.instance) {
			SSAOPass.instance = new SSAOPass(composer, editor);
		}

		return SSAOPass.instance;
	}
}

export { SSAOPass };
