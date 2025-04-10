document.addEventListener("DOMContentLoaded", () => {
    const lista = new ListaEncadeada();

    const form = document.getElementById("form-novo-aluno");
    const inputNome = document.getElementById("input-nome");
    const tbody = document.getElementById("tbody");
    const btnSalvar = document.getElementById("btn-salvar");
    const btnRenderLista = document.getElementById("btn-render-lista");
    const tituloLista = document.getElementById("titulo-lista");
    const listaSalva = document.getElementById("lista-salva");
    const tbodySalva = document.getElementById("tbody-salva");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = inputNome.value.trim();
      if (!nome) return alert("Digite um nome válido!");

      lista.adicionar(nome);
      lista.render(tbody);

      inputNome.value = "";
      btnSalvar.classList.remove("d-none");
      btnRenderLista.classList.remove("d-none");
    });

    btnSalvar.addEventListener("click", () => {
      const nomeLista = prompt("Digite o nome da lista");
      if (!nomeLista) return;

      lista.salvar(nomeLista);

      tituloLista.textContent = nomeLista;
      listaSalva.classList.remove("d-none");
      btnSalvar.classList.add("d-none");
    });

    btnRenderLista.addEventListener("click", () => {
      lista.renderListaSalva(tbodySalva);
      tbody.innerHTML = "";
      btnRenderLista.classList.remove("d-block");
    });
  });

  class Pessoa {
    static contador = 0;

    constructor(nome) {
      this.id = ++Pessoa.contador;
      this.nome = nome;
      this.status = null;
      this.next = null;
    }

    setStatus(status) {
      this.status = status;
    }
  }

  class ListaEncadeada {
    constructor() {
      this.head = null;
      this.nomeLista = null;
    }

    adicionar(nome) {
      const novaPessoa = new Pessoa(nome);
      if (!this.head) {
        this.head = novaPessoa;
      } else {
        let atual = this.head;
        while (atual.next) {
          atual = atual.next;
        }
        atual.next = novaPessoa;
      }
    }

    render(container) {
      container.innerHTML = "";
      let atual = this.head;

      while (atual) {
        const pessoa = atual;

        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = pessoa.id;

        const tdNome = document.createElement("td");
        tdNome.textContent = pessoa.nome;

        const tdStatus = document.createElement("td");
        tdStatus.textContent = pessoa.status || "-";

        const tdAcoes = document.createElement("td");
        const btnPresente = document.createElement("button");
        const btnFalta = document.createElement("button");

        btnPresente.textContent = "Presente";
        btnPresente.className = "btn btn-sm btn-success me-2";
        btnFalta.textContent = "Falta";
        btnFalta.className = "btn btn-sm btn-danger";

        btnPresente.onclick = () => {
          pessoa.setStatus("P");
          this.render(container);
        };

        btnFalta.onclick = () => {
          pessoa.setStatus("F");
          this.render(container);
        };

        tdAcoes.appendChild(btnPresente);
        tdAcoes.appendChild(btnFalta);

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdStatus);
        tr.appendChild(tdAcoes);

        container.appendChild(tr);
        atual = atual.next;
      }
    }

    salvar(nome) {
      this.nomeLista = nome;
    }

    renderListaSalva(container) {
      container.innerHTML = "";
      let atual = this.head;

      while (atual) {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = atual.id;

        const tdNome = document.createElement("td");
        tdNome.textContent = atual.nome;

        const tdStatus = document.createElement("td");
        tdStatus.textContent = atual.status || "-";

        tr.appendChild(tdId);
        tr.appendChild(tdNome);
        tr.appendChild(tdStatus);

        container.appendChild(tr);
        atual = atual.next;
      }
    }
  }
