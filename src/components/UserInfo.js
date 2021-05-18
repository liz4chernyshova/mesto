export default class UserInfo {
    constructor(heading, subheading) {
        this._name = heading;
        this._description = subheading;
      }
    
    getUserInfo() {
    return {
        heading: this._name.textContent,
        subheading: this._description.textContent
    }
    }
    
    setUserInfo(data) {
    this._name.textContent = data.heading;
    this._description.textContent = data.subheading;
    }
}