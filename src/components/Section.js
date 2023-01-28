export default class Section {
    constructor({ renderer }, containerSelector) {  
        this.renderer = renderer 
        this.container = document.querySelector(containerSelector)
    }

    renderItems(items) {
        this.container.innerHTML = '';
        items.forEach((item) => {
            this.renderer(item)
        });
    }
    
    addItem(item) {
        this.container.append(item)
    }
}