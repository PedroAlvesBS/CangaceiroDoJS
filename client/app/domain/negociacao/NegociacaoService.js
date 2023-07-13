System.register(['../../util/HttpService.js', './Negociacao.js', '../../util/ApplicationException.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao, ApplicationException;
    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }, function (_utilApplicationExceptionJs) {
            ApplicationException = _utilApplicationExceptionJs.ApplicationException;
        }],
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

            let NegociacaoService = class NegociacaoService {
                constructor() {
                    this._http = new HttpService();
                }
                obtemNegociacaoDaSemana() {
                    return this._http.get('negociacoes/semana').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
                        throw new ApplicationException('Não foi possivel obter as negociacoes.');
                    });
                }
                obtemNegociacaoDaSemanaAnterior() {
                    return this._http.get('negociacoes/anterior').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
                        throw new ApplicationException('Não foi possivel obter as negociacoes da semana anterior');
                    });
                }
                obtemNegociacaoDaSemanaRetrasada() {
                    return this._http.get('negociacoes/retrasada').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
                        throw new ApplicationException('Não foi possivel obter as negociacoes da semana retrasada');
                    });
                }

                obtemNegociacoesDoPeriodo() {
                    var _this = this;

                    return _asyncToGenerator(function* () {
                        try {
                            const periodo = yield Promise.all([_this.obtemNegociacaoDaSemana(), _this.obtemNegociacaoDaSemanaAnterior(), _this.obtemNegociacaoDaSemanaRetrasada()]);
                            return periodo.reduce(function (novoArray, item) {
                                return novoArray.concat(item);
                            }, []).sort(function (a, b) {
                                return b.data.getTime() - a.data.getTime();
                            });
                        } catch (err) {
                            console.log(err);
                            throw new ApplicationException('Nao foi possivel obter as negociacoes do periodo');
                        }
                    })();
                }
            };

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map