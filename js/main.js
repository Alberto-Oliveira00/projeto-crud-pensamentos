import ui from "./ui.js"
import api from "./api.js"

const regexConteudo = /^[A-Za-z\s]{10,}$/

function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo)
}

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
    const data = document.getElementById("pensamento-data").value

    if (!validarConteudo(conteudo)){
        alert("É permitido apenas a inclusão de letras e espaço com no mínimo 10 caracteres")
        return
    }

    if(!validarData(data)) {
        alert("Não é permitido o cadastro de datas futuras. Selecione outra data.")
    }

    try {
        if(id) {
            await api.editarPensamento({ id, conteudo, autoria, data })
        } else {
            await api.salvarPensamento({ conteudo, autoria, data })            
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

function validarData(data) {
    const dataAtual = new Date()
    const dataInserida = new Date(data)
    return dataInserida <= dataAtual
}