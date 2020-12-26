const Services = (function(){
    class ServiceRegistry {
       services = {};

        register(name, service) {
            console.log(`Service [${name}] registered`);
            if(this.services[name] !== undefined)
                throw `Service [${name}] already registered`;

            this.services[name] = service;

        }

        get(name) {
            if(this.services[name] === undefined)
                throw `Service [${name}] not found`;

            return this.services[name];
        }
    }
    var instance;
    return {
        getInstance: function(){
            if (!instance) {
                console.log("New Instance of Logger");
                instance = new ServiceRegistry();
                delete instance.constructor;
            }
            return instance;
        }
    };
})();

export default Services.getInstance();