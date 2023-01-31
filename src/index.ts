import CwButton from "./components/CwButton.vue";
import CwInput from "./components/CwInput.vue";
import CwEButton from "./components/CwEButton.vue"
const components = [CwButton,CwInput,CwEButton];
const install = function(App:any, options:any) {
    components.forEach((component) => {
        App.component(component.name,component);
    });
};
export default { install } // 批量的引入*
