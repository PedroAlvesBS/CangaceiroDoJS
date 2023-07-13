System.register(['../../util/HttpService.js', './Negociacao.js'], function (_export, _context) {
    "use strict";

    var HttpService, Negociacao;
    return {
        setters: [function (_utilHttpServiceJs) {
            HttpService = _utilHttpServiceJs.HttpService;
        }, function (_NegociacaoJs) {
            Negociacao = _NegociacaoJs.Negociacao;
        }],
        execute: function () {
            class NegociacaoService {
                constructor() {
                    this._http = new HttpService();
                }
                obtemNegociacaoDaSemana() {
                    return this._http.get('negociacoes/semana').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
                        throw new Error('Não foi possivel obter as negociacoes.');
                    });
                }
                obtemNegociacaoDaSemanaAnterior() {
                    return this._http.get('negociacoes/anterior').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
                        throw new Error('Não foi possivel obter as negociacoes da semana anterior');
                    });
                }
                obtemNegociacaoDaSemanaRetrasada() {
                    return this._http.get('negociacoes/retrasada').then(dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)), err => {
                        throw new Error('Não foi possivel obter as negociacoes da semana retrasada');
                    });
                }

                async obtemNegociacoesDoPeriodo() {
                    try {
                        const periodo = await Promise.all([this.obtemNegociacaoDaSemana(), this.obtemNegociacaoDaSemanaAnterior(), this.obtemNegociacaoDaSemanaRetrasada()]);
                        return periodo.reduce((novoArray, item) => novoArray.concat(item), []).sort((a, b) => b.data.getTime() - a.data.getTime());
                    } catch (err) {
                        console.log(err);
                        throw new Error('Nao foi possivel obter as negociacoes do periodo');
                    }
                }
            }

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map