import CwButton from "./components/CwButton.vue";
import CwInput from "./components/CwInput.vue";
import CwAButton from "./components/CwAButton.vue"
const components = [CwButton,CwInput,CwAButton];
const install = function(App:any, options:any) {
    components.forEach((component) => {
        App.component(component.name,component);
    });
};
export default { install } // 批量的引入*
