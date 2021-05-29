export default class UserInfo {
    constructor(name, about, avatar) {
        this._name = document.querySelector(name);
        this._description = document.querySelector(about);
        this._avatar = avatar;
      } 

    getUserInfo() {
    return {
        name: this._name.textContent,
        about: this._description.textContent,
        id: this._id
        }
    }
    
    setUserInfo(data) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._id = data.id;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
    
    getUserId() {
        return this._id;
    }
}