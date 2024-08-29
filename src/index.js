import components from "./components";

const plugin = {
    install (Vue)
    {
        for (const prop in components)
        {
            console.log("prop: " + prop);
            if (components.hasOwnProperty(prop))
            {
                Vue.component(component.name, component);
            }
        }
    }
}

export default plugin;
