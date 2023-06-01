import { defineAsyncComponent } from "vue";

// note: globEager is now deprecated. Use import.meta.glob('*', { eager: true }) instead.
const requireComponent = import.meta.glob("./components/Atom*.vue");

const install = (app) => {
    Object.keys(requireComponent).forEach((fileName) => {
        const component = defineAsyncComponent(() =>
            requireComponent[fileName]()
        );
        const componentName = fileName
            .replace(/^.\/Atom/, "")
            .replace(/\.vue$/, "");
        app.component(componentName, component);
    });
};

export default { install };
