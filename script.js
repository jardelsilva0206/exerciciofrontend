var idAnimal = null
function salvar() {

    var data = {
        "nome": document.querySelector("#nomeAnimal").value,
        "especie": document.querySelector("#especieAnimal").value, "raca": document.querySelector("#racaAnimal").value,
        "altura": document.querySelector("#alturaAnimal").value, "peso": document.querySelector("#pesoAnimal").value,
        "tipoPelagemPlumagem": document.querySelector("#pelagemPlumagemAnimal").value,
        "tipoTratamento": document.querySelector("#tipoTratamento").value
    }
    console.log(data)
    if (idAnimal != null) {
        var update = {
            "id": this.idAnimal,
            "nome": document.querySelector("#nomeAnimal").value,
            "especie": document.querySelector("#especieAnimal").value, "raca": document.querySelector("#racaAnimal").value,
            "altura": document.querySelector("#alturaAnimal").value, "peso": document.querySelector("#pesoAnimal").value,
            "tipoPelagemPlumagem": document.querySelector("#pelagemPlumagemAnimal").value,
            "tipoTratamento": document.querySelector("#tipoTratamento").value
        }
        console.log("entrei no if certo")
        fetch("http://localhost:8080/animal/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
        })
            .then((response) => response.json())
            .then((update) => {
                console.log("Success:", update);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        this.idAnimal = null;
    } else {
        console.log(this.idAnimal);
        fetch("http://localhost:8080/animal/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

}
function mostrarAnimais() {
    var cadastros
    fetch("http://localhost:8080/animal/all").then(response => {
        return response.json()
    }).then(body => {
        var arquivos = JSON.stringify(body)
        cadastros = body
        console.log(arquivos)
        for (i = 0; i < cadastros.length; i++) {
            document.querySelector("#cadastros").innerHTML += '<input id="animaisCadastrados" type="radio" name="opcao" value="' + cadastros[i].id +
                '"><tr>ID: ' + cadastros[i].id + ' Nome:' + cadastros[i].nome + ' Espécie: ' + cadastros[i].especie + ' Raça: ' + cadastros[i].raca + ' Altura: '
                + cadastros[i].altura + ' Peso: ' + cadastros[i].peso + ' Pelagem/Plumagem: ' + cadastros[i].tipoPelagemPlumagem +
                ' Tratamento: ' + cadastros[i].tipoTratamento + '</tr><br>'
        }
    })
}

function deletarAnimal() {
    var idDelete = document.querySelector('input[name="opcao"]:checked').value
    fetch("http://localhost:8080/animal/delete/" + idDelete, {
        method: "DELETE"
    })
    alert("Animal ID= " + idDelete + " excluido");
    document.location.reload(true);
}

function atualizarAnimal() {
    var idUpdate = document.querySelector('input[name="opcao"]:checked').value
    var cadastro
    fetch("http://localhost:8080/animal/find/" + idUpdate).then(response => {
        return response.json()
    }).then(body => {
        var arquivos = JSON.stringify(body)
        cadastro = body
        document.getElementById('nomeAnimal').value = body.nome
        document.getElementById('especieAnimal').value = body.especie
        document.getElementById('racaAnimal').value = body.raca
        document.getElementById('alturaAnimal').value = body.altura
        document.getElementById('pesoAnimal').value = body.peso
        document.getElementById('pelagemPlumagemAnimal').value = body.tipoPelagemPlumagem
        document.getElementById('tipoTratamento').value = body.tipoTratamento
        this.idAnimal = body.id

    })


}


