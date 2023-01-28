import Popup from "./Popup"

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector)
        this.button = this.popup.querySelector('.popup__button')
        this.submitCallBack = submitCallBack
        this.form = this.popup.querySelector('.popup__form')
        this.inputs = Array.from(this.popup.querySelectorAll('.popup__input'))
        this._submit = this._submit.bind(this)
    }

    setInputValues(data) {
        this.inputs.forEach((input) => {
            input.value = data[input.name] 
        })
    }

    _getInputValues() {
        const inputValuesList = {}
        this.inputs.forEach((input) => {
            inputValuesList[input.name] = input.value  
        })
        return inputValuesList
    }

    renderLoading(isLoading) {  
        if (isLoading) {
            if (this.popupSelector === '.profile-popup' || this.popupSelector === '.update-avatar-popup') {
                this.button.value = 'Сохранение...'
            } else if (this.popupSelector === '.card-popup') {
                this.button.value = 'Создание...'
            }
            
          } else {
            if (this.popupSelector === '.profile-popup' || this.popupSelector === '.update-avatar-popup') {
                this.button.value = 'Сохранить'
            } else if (this.popupSelector === '.card-popup') {
                this.button.value = 'Создать'
            }
          }
    }
    
    _submit(evt) {
        evt.preventDefault()
        this.renderLoading(true)
        const list = this._getInputValues() 
        this.submitCallBack(list)        
    }

    _setEventListeners() {
        super._setEventListeners()
        this.form.addEventListener('submit', this._submit)
    }

    _removeEventListeners() {
        super._removeEventListeners()
        this.form.removeEventListener('submit', this._submit)
    }

    close() {
        super.close()
        this.form.reset()
    }
}