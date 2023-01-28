import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this.img = this.popup.querySelector('.image-popup__image')
        this.title = this.popup.querySelector('.image-popup__title')
    }
    
    open(src, title) {
        this.img.src = src
        this.img.alt = title
        this.title.textContent = title
        super.open()
    }
}