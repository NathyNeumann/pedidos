clientes =[]; //array para guardar os clientes cadastrados
let novoCliente; // pava deixar disponível  o objeto cliente
let pedido; // para deixar disponível o pedido criado

let tabelaPedido = document.getElementById('tabelaPedido'); //corpo da tabela de pedidos caso não tenha item novo pedido possa deleta-la
let tbody = document.createElement('tbody')
tabelaPedido.appendChild(tbody)

//array de clentes 
let cliente = new Cliente("Teste de Teste Teste", 00000000000, "xx x xxxxxxxx");
clientes.push(cliente);

//só para a primeiro pedido com número 1 os demais vão para "pedido"
let pedido1 = new Pedido();
pedido1.cliente = cliente;


document.querySelector('#numPedido').value = pedido1.numPedido;
let novoPedido = document.querySelector('#novoPedido');

//NOVO PEDIDO
novoPedido.addEventListener('click', function(){
    tbody.remove();
    document.querySelector('#valorTotal').value ="";
    pedido = new Pedido();
    document.querySelector('#numPedido').value = pedido.numPedido;
    novoCliente ="";
    limpaCamposCadastro();
    limpaRadioButton();
})

// RADIO BUTTON NOVO CLIENTE OU JÁ CADASTRADO HABILITA OU NÃO CAMPOS
let radioButton = document.getElementById('radioDiv');
radioButton.addEventListener('click', function(evento){
    
    if(evento.target.id  == "inlineRadio1"){
        limpaCamposCadastro();

        document.querySelector('#localiza').disabled = true; 
        document.querySelector('#idCliente').disabled = true;
        document.querySelector('#idCpf').disabled = false;
        document.querySelector('#idNome').disabled = false;
        document.querySelector('#idTel').disabled = false;
        let idCliente = (clientes.length)+1;
        document.querySelector('#idCliente').value = idCliente; 
        
    }else if(evento.target.id  == "inlineRadio2"){
        limpaCamposCadastro();

        document.querySelector('#localiza').disabled = false;
        document.querySelector('#idCliente').disabled = false;
        document.querySelector('#idCpf').disabled = true;
        document.querySelector('#idNome').disabled = true;
        document.querySelector('#idTel').disabled = true;
    }
})

//SALVA OS DADOS EM TELA PARA CADASTRO
let salvarCadastro = document.querySelector('#SalvarCliente')
salvarCadastro.addEventListener('click', function(){
    if( document.querySelector('#inlineRadio1').checked == false && document.querySelector('#inlineRadio2').checked ==false){
        alert('Selecione Novo Cadastro  ')
    }else{

        let idCpf = document.querySelector('#idCpf').value;
        let idNome = document.querySelector('#idNome').value;
        let idTel = document.querySelector('#idTel').value;
        
        
        /*
        
        //LOCALIZA CLIENTE PELO CPF - em produção...
        for (let index = 0; index < clientes.length; index++) {
            if(idCpf ==  clientes[index].cpf){
                alert('Cliente já cadastrado! Seu id é: '+ (index +1))
            }else{
                
            }
            
        }*/
        
        
         //verificar se o clienre já eh cadastrado
         novoCliente = new Cliente(idNome, idCpf, idTel);
         clientes.push(novoCliente)

         
         //usado para caso "pedido" não tenha sido inicializado com "novo cliente"
         if (pedido == undefined){
             pedido1.cliente = novoCliente;
             
         }else{
            pedido.cliente= novoCliente;
            
         }
    }
})

//localiza cliente pela posiçao do array cliente e mostra em tela
let localizarCliente = document.querySelector('#localiza');
localizarCliente.addEventListener('click', function(){
    if( document.querySelector('#inlineRadio1').checked == false && document.querySelector('#inlineRadio2').checked ==false){
        alert('Selecione Já sou cadastrado')
    }else{
        let idCiente = document.querySelector('#idCliente').value;
        let oqtem = clientes[idCiente-1];
        document.querySelector('#idNome').value = oqtem.nome;
        document.querySelector('#idCpf').value = oqtem.cpf;
        document.querySelector('#idTel').value = oqtem.tel;
        
    }
});
// habilita campos de cadastro de item 
let adicionarItens = document.querySelector('#addItem');
adicionarItens.addEventListener('click', function(){
    document.querySelector('#add').hidden = false;
})

// ADICIONA ITEM NO ARRAY DE ITENS DO PEDIDO, APAGA E MONTA A TABELA, LIMPA CAMPOS DE ITENS E CHAMA P/ EXIBIR TOTAL A PAGAR
let salvaItem = document.querySelector('#salvaItem');
salvaItem.addEventListener('click', function(){
    tbody.remove();

    let codigoItem = document.getElementById('idCodItem').value;
    let descItem = document.getElementById('idDescriItem').value;
    let valItem = document.getElementById('idValItem').value;
    let qntItem = document.getElementById('idQntItem').value;

    let novoItem = new Item(codigoItem, descItem, valItem,qntItem)

    //usado para caso "pedido" não tenha sido inicializado com "novo cliente"
    if (pedido == undefined){
        pedido1.salvaItem(novoItem);
    }else{
       pedido.salvaItem(novoItem);
    }
    
// pega tabela e montagem da tabela
tbody = document.createElement('tbody');
tabelaPedido.appendChild(tbody)
if (pedido == undefined){
    let todosItens1 = pedido1.itemsPedidos;
    todosItens1.forEach(e => { 
        tbody.appendChild(momntaLinha(e))
    });
}else{
    let todosItens = pedido.itemsPedidos;
    todosItens.forEach(e => { 
        tbody.appendChild(momntaLinha(e))
    });
}
limpaCadastroItem();//chamada funcao limpaitens
somaTotal();//exibe total a pagar
})



//CONTRUTORES TABELA LINHA E CAMPOS
function momntaLinha(cadaItem){
    let tr = document.createElement('tr');
    tr.appendChild(montaCampo(cadaItem.cod, "col-2"));
    tr.appendChild(montaCampo(cadaItem.describe, "col-7"));
    tr.appendChild(montaCampo(cadaItem.valor, "col-1"));
    tr.appendChild(montaCampo(cadaItem.quantidade, "col-1"));
    tr.appendChild(montaCampo((cadaItem.quantidade * cadaItem.valor).toFixed(2), "col-1"));
    tr.classList.add("row");
    return tr
}
function montaCampo(conteudo, classe){
    let td = document.createElement('td');
    td.textContent = conteudo;
    td.classList.add(classe)
    return td
}



//FUNÇÒES DE LIMPEZA
function limpaCamposCadastro(){ 
    document.querySelector('#idCliente').value = "";
    document.querySelector('#idCpf').value = "";
    document.querySelector('#idNome').value = "";
    document.querySelector('#idTel').value = "";
}
function limpaRadioButton(){
    document.querySelector('#inlineRadio1').checked = false;
    document.querySelector('#inlineRadio2').checked = false;
}
function limpaCadastroItem(){
    //limpeza dos dados e esconde o campo de cadastro item
    document.querySelector('#add').hidden = true;

    document.getElementById('idCodItem').value = "";
    document.getElementById('idDescriItem').value = "";
    document.getElementById('idValItem').value = "";
    document.getElementById('idQntItem').value = "";
}
//limpa array de itens do pedido, corpo tabela e saida valor total
let limparCarrinho = document.getElementById('limpaCarrinho');
limparCarrinho.addEventListener('click', limpaItensOBJ )
 function limpaItensOBJ(){
    if (pedido == undefined){
        pedido1.itemsPedidos = [];
    }else{
        pedido.itemsPedidos = [];
    }
    document.querySelector('#valorTotal').value = "";
    tbody.remove();
 }


 //SAIDA COM VALOR TOTAL
function somaTotal(){
    let valorTotal = document.querySelector('#valorTotal');
    let total;
    if (pedido == undefined){
        if(pedido1.itemsPedidos.length == 1 ){//caso só tenha 1 item
            total = (pedido1.itemsPedidos[0].quantidade *pedido1.itemsPedidos[0].valor) 
        }else{//soma valorestotal de cada item
            total = pedido1.itemsPedidos.map(a => a.totalItem()).reduce((a, b)=>{
                return a + b;  
              });
        }
    }else{
        if(pedido.itemsPedidos.length == 1 ){
            total = (pedido.itemsPedidos[0].quantidade *pedido.itemsPedidos[0].valor) 
        }else{
            total = pedido.itemsPedidos.map(a => a.totalItem()).reduce(function (a, b){
                return (a+b);  
              });
        }
    }
 valorTotal.value = `R$ ${total.toFixed(2)}`;
}