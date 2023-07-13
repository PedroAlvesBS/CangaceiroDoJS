System.register([], function (_export, _context) {
    "use strict";

    return {
        setters: [],
        execute: function () {
            function _asyncToGenerator(fn) {
                return function () {
                    var gen = fn.apply(this, arguments);
                    return new Promise(function (resolve, reject) {
                        function step(key, arg) {
                            try {
                                var info = gen[key](arg);
                                var value = info.value;
                            } catch (error) {
                                reject(error);
                                return;
                            }

                            if (info.done) {
                                resolve(value);
                            } else {
                                return Promise.resolve(value).then(function (value) {
                                    step("next", value);
                                }, function (err) {
                                    step("throw", err);
                                });
                            }
                        }

                        return step("next");
                    });
                };
            }

            let HttpService = class HttpService {
                _handleErrors(res) {
                    if (!res.ok) throw new Error(res.statusText);
                    return res;
                }
                get(url) {
                    var _this = this;

                    return _asyncToGenerator(function* () {
                        return yield fetch(url).then(function (res) {
                            return _this._handleErrors(res);
                        }).then(function (res) {
                            return res.json();
                        });
                    })();
                }
            };

            _export("HttpService", HttpService);
        }
    };
});
//# sourceMappingURL=HttpService.js.map