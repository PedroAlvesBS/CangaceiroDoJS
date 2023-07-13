import { HttpService } from '../../util/HttpService.js';
import { Negociacao } from './Negociacao.js';
import { ApplicationException } from '../../util/ApplicationException.js';

export class NegociacaoService {
    constructor(){
        this._http = new HttpService();
    }
    obtemNegociacaoDaSemana() {
        return this._http
            .get('negociacoes/semana')
            .then(
                dados => 
                    dados.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                ,
                err =>  {
                    throw new ApplicationException('Não foi possivel obter as negociacoes.');
                }
            );  
    }
    obtemNegociacaoDaSemanaAnterior() {
        return this._http
            .get('negociacoes/anterior')
            .then(
                dados =>
                    dados.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                ,
                err =>  {
                    throw new ApplicationException('Não foi possivel obter as negociacoes da semana anterior');
                }
            );  
    }
    obtemNegociacaoDaSemanaRetrasada() {
        return this._http
            .get('negociacoes/retrasada')
            .then(
                dados => 
                    dados.map(objeto =>
                        new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                        ,
                        err =>  {
                            throw new ApplicationException('Não foi possivel obter as negociacoes da semana retrasada');
                        }
            );  
    }

    async obtemNegociacoesDoPeriodo(){
        try {
            const periodo = await Promise.all([
                this.obtemNegociacaoDaSemana(),
                this.obtemNegociacaoDaSemanaAnterior(),
                this.obtemNegociacaoDaSemanaRetrasada()
            ]);
            return periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a, b) => b.data.getTime() - a.data.getTime());
        } catch (err) {
            console.log(err);
            throw new ApplicationException('Nao foi possivel obter as negociacoes do periodo');
        }
    }
}