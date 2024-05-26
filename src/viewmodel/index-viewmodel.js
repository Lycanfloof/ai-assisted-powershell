import { ObservableDictionary } from "../util/observable-dictionary.js";

export class IndexViewModel {
    constructor() {
        this.messages = new ObservableDictionary()
    }

    generateCode = async (prompt) => {
        let response = await window.electronAPI.makeRequestToAPI(prompt)
        this.putMessage(crypto.randomUUID(), prompt, response, true)
    }
    
    executeCode = (id) => {
        let message = this.messages.get(id)

        let prompt = message.header
        let code = message.body

        //TODO: PowerShell's Output.
        
        this.putMessage(crypto.randomUUID(), "Execution of prompt: " + prompt, "TODO: PowerShell's Output", false)
    }

    putMessage = (id, header, body, isExecutable) => {
        let message = {
            id: id,
            header: header,
            body: body,
            isExecutable: isExecutable
        }
        
        this.messages.put(id, message)
    }

    onResponse = (onPut) => {
        this.messages.onPut = onPut
    }
}