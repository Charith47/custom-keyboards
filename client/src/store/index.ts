import Vue from 'vue';
import Vuex from 'vuex';

import three from './config/index';
import Config from './config/config';

Vue.use(Vuex);

export interface State {
	threeConfig: Config;
	// rest of the app state
}

export default new Vuex.Store({
	modules: {
		three: three,
	},
});
