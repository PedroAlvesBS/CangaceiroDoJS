class Negociacao {
    constructor(_date, _quantidade, _valor){
        Object.assign(this,{ _quantidade, _valor})
        this._data = new Date(_date.getTime())
        Object.freeze(this);
    }

    get volume(){
        return this._quantidade * this._valor;
    }
    get data(){
        return new Date(this._data.getTime());
    }
    get quantidade(){
        return this._quantidade;
    }
    get valor(){
        return this._valor;
    }
    equals(negociacao){
        return JSON.stringify(this) == JSON.stringify(negociacao);
    }
}