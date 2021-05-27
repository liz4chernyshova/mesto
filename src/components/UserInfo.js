export default class UserInfo {
    constructor(headingSelector, subheadingSelector, avatar) {
        this._name = document.querySelector(headingSelector);
        this._description = document.querySelector(subheadingSelector);
        this._avatar = avatar;
      } 
    
    getUserInfo() {
    return {
        name: this._name.textContent,
        about: this._description.textContent
        }
    }
    
    setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.src = data.avatar;
    }
}