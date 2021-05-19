export default class UserInfo {
    constructor(headingSelector, subheadingSelector) {
        this._name = document.querySelector(headingSelector);
        this._description = document.querySelector(subheadingSelector);
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