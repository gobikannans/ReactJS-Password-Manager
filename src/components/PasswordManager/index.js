import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const initialBgColor = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    userInput: '',
    passwordInput: '',
    searchInput: '',
    isShowPassword: false,
    passwordList: [],
  }

  onWebsiteName = event => {
    this.setState({websiteInput: event.target.value})
  }

  onUsername = event => {
    this.setState({userInput: event.target.value})
  }

  onPassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddClick = event => {
    event.preventDefault()
    const {websiteInput, userInput, passwordInput} = this.state

    const BgColor =
      initialBgColor[Math.ceil(Math.random() * initialBgColor.length - 1)]

    const newPassword = {
      id: uuidv4(),
      bgColor: BgColor,
      website: websiteInput,
      userName: userInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      userInput: '',
      passwordInput: '',
    }))
  }

  onShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onSearchList = () => {
    const {searchInput, passwordList} = this.state

    const searchResults = passwordList.filter(eachWebsite =>
      eachWebsite.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  onDeleteList = deleteId => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(
        eachPassword => eachPassword.id !== deleteId,
      ),
    })
  }

  render() {
    const {
      websiteInput,
      userInput,
      passwordInput,
      searchInput,
      isShowPassword,
    } = this.state

    const passwordFilterList = this.onSearchList()
    const passwordCount = passwordFilterList.length

    return (
      <div className="bg-container">
        <div className="pm-container">
          <div className="app-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="logo-img"
            />
          </div>
          <div className="card-container-one">
            <div className="details-container">
              <h1 className="input-heading">Add New Password</h1>
              <form className="form-container" onSubmit={this.onAddClick}>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="details-logo"
                  />
                  <input
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.onWebsiteName}
                    className="input"
                    value={websiteInput}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="details-logo"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.onUsername}
                    className="input"
                    value={userInput}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="details-logo"
                  />
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onPassword}
                    className="input"
                    value={passwordInput}
                  />
                </div>
                <button type="submit" className="btn-style">
                  Add
                </button>
              </form>
            </div>
            <div className="pm-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="pm-img"
              />
            </div>
          </div>

          <div className="card-container-two">
            <div className="card-search">
              <div className="password-len-container">
                <h1 className="password-name">Your Passwords</h1>
                <div className="password-len">
                  <p>{passwordCount}</p>
                </div>
              </div>
              <div className="search-container">
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                    className="details-logo"
                  />
                  <input
                    type="search"
                    placeholder="Search"
                    onChange={this.onSearchInput}
                    className="input"
                    value={searchInput}
                  />
                </div>
              </div>
            </div>
            <div>
              <hr className="hr-line" />
            </div>

            <div className="show-password">
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onChange={this.onShowPassword}
                value={isShowPassword}
              />
              <label htmlFor="checkbox">Show Passwords</label>
            </div>

            {passwordFilterList.length === 0 ? (
              <div className="no-password-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-img"
                />
                <p className="noPassword">No Passwords</p>
              </div>
            ) : (
              <ul className="password-list-container">
                {passwordFilterList.map(eachPassword => (
                  <PasswordItem
                    passwordDetails={eachPassword}
                    key={eachPassword.id}
                    onDeleteList={this.onDeleteList}
                    ShowPassword={isShowPassword}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
