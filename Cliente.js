class Cliente {
    static idCliente = 0;

    #nome;
    #cpf;
    #tel;
    //#idCliente;

    constructor(nome, cpf, tel){
        this.nome = nome;
        this.cpf = cpf;
        this.tel = tel;
        //this.idCliente = idCliente;
        Cliente.idCliente++;
    }

    get nome(){
        return this.#nome;
    }
    set nome(nome){
         this.#nome = nome;
    }
    get cpf(){
        return this.#cpf;
    }
    set cpf(cpf){
         this.#cpf =cpf;
    }
    get tel(){
        return this.#tel;
    }
    set tel(tel){
        this.#tel = tel;
    }

    get idCliente(){
        return Cliente.idCliente;
    }
    //set idCliente(idCliente){
    //     this.#idCliente = idCliente;
    // }
}