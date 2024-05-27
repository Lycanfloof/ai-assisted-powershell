import { IndexViewModel } from "../viewmodel/index-viewmodel.js";

const chatContainer = document.getElementById("chat-container");
const promptInput = document.getElementById("prompt-input");
const submitButton = document.getElementById("submit-button");

const codeTemplate = document.getElementById("code-template")
const outputTemplate = document.getElementById("output-template")

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
        } else {
            GUIMessage = createOutputMessage(message.header, message.body)
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

const createOutputMessage = (header, body) => {
    const outputMessage = outputTemplate.content.cloneNode(true)

    outputMessage.querySelector("#header").textContent = header

    let term = new Terminal({ convertEol: true })
    term.open(outputMessage.querySelector("#terminal"))
    term.write(body)

    return outputMessage
}