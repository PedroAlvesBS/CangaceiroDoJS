function getNegociacoesDao() {
    return ConnectionFactory
            .getConnection()
            .then(conn => new NegociacaoDao(conn));
}