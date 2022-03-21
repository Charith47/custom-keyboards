import Vue from 'vue';
import Vuex from 'vuex';

import three from './three/index';
import ThreeConfig from './three/three-store';

Vue.use(Vuex);

export interface State {
	threeConfig: ThreeConfig;
	// rest of the app state
}

export default new Vuex.Store({
	modules: {
		three: three,
	},
});
