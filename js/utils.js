export function cloneNode(tempSelector, eventName = "", handlerEvent = "", classAdded = "", classRemoved = "", classToggled = "", elementSelector = "", rootElement = "") {
    const temp = document.querySelector(tempSelector || "")
    if(temp) {
        // Cloned Template
        const clonedTemp = temp.content.cloneNode(true)
        if(eventName && handlerEvent)
            // Attach Event Handler
            clonedTemp.addEventListener(eventName, handlerEvent)
        if(classRemoved && elementSelector)
            clonedTemp.querySelector(elementSelector).classList.remove(classRemoved)
        if(classAdded && elementSelector)
            clonedTemp.querySelector(elementSelector).classList.add(classAdded)
        if(classToggled && elementSelector)
            clonedTemp.querySelector(elementSelector).classList.toggle(classToggled)
        if(rootElement)
            rootElement.append(clonedTemp)
    }
}
