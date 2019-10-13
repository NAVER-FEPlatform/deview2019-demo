import { VueConstructor } from 'vue';
import DeviewInfinite from './DeviewInfinite';

declare global {
    interface Window {
        Vue: VueConstructor;
    }
}

const version = '#__VERSION__#';

const install = (Vue: VueConstructor): void => {
    Vue.component('DeviewInfinite', DeviewInfinite);
};

export { DeviewInfinite };
export default {
    install,
    version,
};
