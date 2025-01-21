import ui from "./ui.js"
import api from "./api.js"

const regexConteudo = /^[A-Za-z\s]{10,}$/
const regexAutoria = /^[A-Za-z]{3, 15}$/

function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo)
}

function validarAutoria(autoria) {
    return regexAutoria.test(autoria)
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
        alert("No pensamento é permitido apenas a inclusão de letras e espaço com no mínimo 10 caracteres")
        conteudo.focus()
        return
    }

    if (!validarAutoria(autoria)){
        alert("Na autoria é permitido apenas a inclusão de letras sem espaço com no mínimo 3 e no máximo de 15 caracteres")
        autoria.focus()
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