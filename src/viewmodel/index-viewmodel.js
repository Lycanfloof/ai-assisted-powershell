import { ObservableDictionary } from "../util/observable-dictionary.js";

export class IndexViewModel {
    constructor() {
        this.messages = new ObservableDictionary()
    }

    generateCode = (prompt) => {
        //TODO: API's Response.
        this.putMessage(crypto.randomUUID(), prompt, "TODO: API's Response.", true)
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