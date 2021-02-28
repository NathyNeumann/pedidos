class Pedido {
    static numPedido = 0;

    
    cliente;
    itemsPedidos= [];

    constructor(cliente){
        this.cliente = cliente;
        Pedido.numPedido++;
    }
    
    get cliente(){
        return this.cliente;
    }
    set cliente(cliente){
         this.cliente = cliente;
    }
    get numPedido(){
        return ("0000" + Pedido.numPedido).slice(-5);
    }
    get itemsPedidos(){
        return this.itemsPedidos;
    }

    salvaItem(novoItem){
        this.itemsPedidos.push(novoItem)
    }
   
}