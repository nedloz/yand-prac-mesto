import Popup from "./Popup"

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, buttonSelector, clickCallBack) {
        super(popupSelector)
        this.clickCallBack = clickCallBack
        this.button = this.popup.querySelector(buttonSelector);
        this._clickCallBack = this._clickCallBack.bind(this)
    }
    
    open(cardId) {
        super.open()
        this.cardId = cardId
    }

    _clickCallBack() {
        this.clickCallBack(this.cardId)
        this.close()
    }

    _setEventListeners() {
        super._setEventListeners()
        this.button.addEventListener('click', this._clickCallBack)
    }
}