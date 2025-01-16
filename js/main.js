import ui from "./ui.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos()

    const formularioPensamento = document.getElementById("pensamento-form")
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();
    const id = document.getElementById("pensamento-id").value.trim()
    const conteudo = document.getElementById("pensamento-conteudo").value.trim()
    const autoria = document.getElementById("pensamento-autoria").value.trim()

    try {
        await api.salvarPensamento({ conteudo, autoria })
        ui.renderizarPensamentos()
    } catch (error) {
        alert("Erro ao salvar pensamentos")
    }
}