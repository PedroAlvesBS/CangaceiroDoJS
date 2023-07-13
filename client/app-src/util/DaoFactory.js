import { ConnectionFactory } from './ConnectionFactory.js';
import { NegociacaoDao } from '../domain/negociacao/NegociacaoDao.js';

export async function getNegociacoesDao() {
    return await ConnectionFactory
            .getConnection()
            .then(conn => new NegociacaoDao(conn));
}