import { VueConstructor } from 'vue';
import DeviewRecycle from './DeviewRecycle';

declare global {
    interface Window {
        Vue: VueConstructor;
    }
}

const version = '#__VERSION__#';

const install = (Vue: VueConstructor): void => {
    Vue.component('DeviewRecycle', DeviewRecycle);
};

export { DeviewRecycle };
export default {
    install,
    version,
};
