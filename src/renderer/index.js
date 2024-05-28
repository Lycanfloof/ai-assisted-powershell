import { IndexViewModel } from "../viewmodel/index-viewmodel.js";

const chatContainer = document.getElementById("chat-container");
const promptInput = document.getElementById("prompt-input");
const submitButton = document.getElementById("submit-button");

const codeTemplate = document.getElementById("code-template")
const outputTemplate = document.getElementById("output-template")
const errorOutputTemplate = document.getElementById("error-output-template")

const viewModel = new IndexViewModel()

submitButton.onclick = () => {
    if (promptInput.value != "") {
        viewModel.generateCode(promptInput.value)
        promptInput.value = ""
    }
}

viewModel.onResponse(
    (message) => {
        let GUIMessage = null
    
        if (message.isExecutable) {
            let onExecute = () => { viewModel.executeCode(message.id) }
            GUIMessage = createCodeMessage(message.header, message.body, onExecute)
        } else if (message.isSuccessful) {
            GUIMessage = createSuccessfulOutputMessage(message.header, message.body)
        } else {
            let onGeneration = () => { viewModel.remakeCode(message.linkedMessageId, message.body) }
            GUIMessage = createErrorOutputMessage(message.header, message.body, onGeneration)
        }
    
        chatContainer.appendChild(GUIMessage)
    }
)

const createCodeMessage = (header, body, onExecute) => {
    const codeMessage = codeTemplate.content.cloneNode(true)

    codeMessage.querySelector("#header").textContent = header
    codeMessage.querySelector("#code").textContent = body
    codeMessage.querySelector("#execute-button").onclick = onExecute

    return codeMessage
}

const createSuccessfulOutputMessage = (header, body) => {
    const outputMessage = outputTemplate.content.cloneNode(true)

    outputMessage.querySelector("#header").textContent = header

    let term = new Terminal({ convertEol: true })
    term.open(outputMessage.querySelector("#terminal"))
    term.write(body)

    return outputMessage
}

const createErrorOutputMessage = (header, body, onGeneration) => {
    const outputMessage = errorOutputTemplate.content.cloneNode(true)

    outputMessage.querySelector("#header").textContent = header

    let term = new Terminal({ convertEol: true })
    term.open(outputMessage.querySelector("#terminal"))
    term.write(body)

    outputMessage.querySelector("#regenerate-button").onclick = onGeneration

    return outputMessage
}