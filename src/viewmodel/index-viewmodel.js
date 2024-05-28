import { ObservableDictionary } from "../util/observable-dictionary.js";

export class IndexViewModel {
    constructor() {
        this.messages = new ObservableDictionary()
    }

    generateCode = async (prompt) => {
        let response = await window.electronAPI.makeRequestToAPI(prompt)
        this.putMessage(crypto.randomUUID(), prompt, response, true, true)
    }
    
    executeCode = async (id) => {
        let message = this.messages.get(id)

        let prompt = message.header
        let code = message.body

        let response = await window.electronAPI.executeCode(code)
        
        this.putMessage(crypto.randomUUID(), "Execution of prompt: " + prompt, response.output, false, response.isSuccessful, id)
    }

    remakeCode = async (id, output) => {
        let message = this.messages.get(id)

        let prompt = message.header
        let code = message.body

        let response = await window.electronAPI.remakeRequestToAPI(code, output)
        this.putMessage(crypto.randomUUID(), prompt, response, true, true)
    }

    putMessage = (id, header, body, isExecutable, isSuccessful, linkedMessageId = null) => {
        let message = {
            id: id,
            header: header,
            body: body,
            isExecutable: isExecutable,
            isSuccessful: isSuccessful,
            linkedMessageId: linkedMessageId
        }
        
        this.messages.put(id, message)
    }

    onResponse = (onPut) => {
        this.messages.onPut = onPut
    }
}