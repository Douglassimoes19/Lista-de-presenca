document.addEventListener("DOMContentLoaded",function(){
   const lista = new Lista_Encadeada();
   const form = document.getElementById("novo_Aluno");
   const btn_salvar = document.createElement("button");
   btn_salvar.textContent = "Salvar";

   form.addEventListener("submit",function(event){
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    if (nome.trim() === ""){
        alert("digite um nome valido!");
        return;
    }
    lista.append(nome);
    
    document.getElementById("nome").value = "";
    document.innerHTML = lista.render();
   })

   form.addEventListener("submit", function(event){
    event.preventDefault();
    document.getElementById("btnSalva").appendChild(btn_salvar);

   })

   btn_salvar.addEventListener("click",function(){
    const nome = prompt("Digite um nome para a lista").value;
    let listas = salvaLista(lista,nome);
    console.log(listas.header);
    document.getElementById("showListas").innerText = (listas.header);
    document.getElementById("tbody").innerHTML = "";
    btn_salvar.style.display = "none";

   })

})

class Pessoa{

    static contador = 0;

    constructor(nome){
        this.id = ++Pessoa.contador;
        this.nome = nome;
        this.status = " ";
        this.next = null;
    }
}

class List{
    static contador = 0;

    constructor(lista,nome){
        this.id = ++List.contador;
        this.lista = lista;
        this.nome = nome;
        this.next = null;

    }
}

class Lista_Encadeada{
    constructor(){
        this.head = null;
        this.header = null;
    }

    append(nome){
        const pessoa = new Pessoa(nome);
        if(!this.head){
            this.head = pessoa;
            return;
        }

        let pessoa_atual = this.head;
        while(pessoa_atual.next){
            pessoa_atual = pessoa_atual.next;
        }
        pessoa_atual.next = pessoa;
    }

    listas(list, nome){
        const lista = new List(list, nome);
        if(!this.header){
            this.header = lista;
            return;
        }

        let lista_atual = this.header;
        while(lista_atual.next){
            lista_atual = lista_atual.next;
        }
        pessoa_atual.next = pessoa;
    }

    render(){
        const tBody = document.getElementById("tbody");

        tBody.innerHTML = "";

        let pessoa_atual = this.head;

        while(pessoa_atual){
            const novaLinha = document.createElement("tr");

            const id = document.createElement("td");
            id.textContent = pessoa_atual.id;
            const nome = document.createElement("td");
            nome.textContent = pessoa_atual.nome;
            const status = document.createElement("td");
            status.textContent = pessoa_atual.status;
            const btn_falta = document.createElement("button");
            btn_falta.textContent = "Falta";
            const btn_Presente = document.createElement("button");
            btn_Presente.textContent = "Presente"

            btn_Presente.style.height = "25px";
            btn_Presente.style.width = "60px";
            btn_falta.style.height = "25px";
            btn_falta.style.width = "60px";
            let contP = 0;
            let contF = 0;

            btn_Presente.addEventListener("click",function(){
                status.textContent = "P";
                contP ++;
            })
            btn_falta.addEventListener("click",function(){
                status.textContent = "F";
                contF ++;
            })

            novaLinha.appendChild(id);
            novaLinha.appendChild(nome);
            novaLinha.appendChild(status);
            novaLinha.appendChild(btn_falta);
            novaLinha.appendChild(btn_Presente);


            
            
            tBody.appendChild(novaLinha);
            pessoa_atual = pessoa_atual.next;

        }
        
    }
}

function salvaLista(lista,nome){
    const listas = new Lista_Encadeada();
    listas.listas(lista,nome);

    return listas;


}
