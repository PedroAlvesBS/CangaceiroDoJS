System.register([], function (_export, _context) {
    "use strict";

    function controller(...seletores) {
        const elements = seletores.map(seletor => document.querySelector(seletor));

        return function (constructor) {

            const construtorOriginal = constructor;

            const construtorNovo = function () {
                const instance = new construtorOriginal(...elements);
                Object.getOwnPropertyNames(construtorOriginal.prototype).forEach(property => {
                    if (Reflect.hasMetadata('bindEvent', instance, property)) {
                        associaEvento(instance, Reflect.getMetadata('bindEvent', instance, property));
                    }
                });
            };

            construtorNovo.prototype = construtorOriginal.prototype;

            return construtorNovo;
        };
    }

    _export('controller', controller);

    function associaEvento(instance, metadado) {
        document.querySelector(metadado.selector).addEventListener(metadado.event, event => {
            if (metadado.prevent) event.preventDefault();
            instance[metadado.propertyKey](event);
        });
    }
    return {
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=Controller.js.map