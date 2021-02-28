class Item {
    #cod;
    #describe;
    #valor;
    #quantidade;

    constructor(cod, describe, valor, quantidade){
        this.#cod = cod;
        this.#describe = describe;
        this.#valor = valor;
        this.#quantidade = quantidade;
    }

    get cod(){
        return this.#cod;
    }
    get describe(){
        return this.#describe;
    }
    get valor(){
        return this.#valor;
    }
    get quantidade(){
        return this.#quantidade;
    }
    set quantidade(quantidade){
        return this.#quantidade = quantidade;
    }

    totalItem(){
       return (this.#quantidade * this.#valor);
    }
}
