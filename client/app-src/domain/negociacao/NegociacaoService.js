import { HttpService } from '../../util/HttpService';
import { Negociacao } from './Negociacao';
import { ApplicationException } from '../../util/ApplicationException';

export class NegociacaoService {
    constructor(){
        this._http = new HttpService();
    }
    obtemNegociacoesDaSemana() {
        return this._http
            .get(`${SERVICE_URL}/negociacoes/semana`)
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
    obtemNegociacoesDaSemanaAnterior() {
        return this._http
            .get(`${SERVICE_URL}/negociacoes/anterior`)
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
    obtemNegociacoesDaSemanaRetrasada() {
        return this._http
            .get(`${SERVICE_URL}/negociacoes/retrasada`)
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
            let periodo = await Promise.all([
                this.obtemNegociacoesDaSemana(),
                this.obtemNegociacoesDaSemanaAnterior(),
                this.obtemNegociacoesDaSemanaRetrasada()
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