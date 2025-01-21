import ui from "./ui.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos()

    const formularioPensamento = document.getElementById("pensamento-form")
    const btnCancelar = document.getElementById("botao-cancelar")
    const inputBusca = document.getElementById("campo-busca")

    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
    btnCancelar.addEventListener("click", manipularCancelamento)
    inputBusca.addEventListener("input", manipularBusca)
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value.trim()
    const conteudo = document.getElementById("pensamento-conteudo").value.trim()
    const autoria = document.getElementById("pensamento-autoria").value.trim()

    try {
        if(id) {
            await api.editarPensamento({ id, conteudo, autoria })
        } else {
            await api.salvarPensamento({ conteudo, autoria })            
        }
        ui.renderizarPensamentos()
    } 
    catch (error) {
        alert("Erro ao salvar pensamentos")
    }
}

function manipularCancelamento() {
    ui.limparFormulario()
}

async function manipularBusca () {
    const termoBusca = document.getElementById("campo-busca").value
    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca)
        ui.renderizarPensamentos(pensamentosFiltrados)
    } catch (error) {
        alert("Erro ao realizar busca")
    }
}