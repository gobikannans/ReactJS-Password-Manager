import './index.css'

const PasswordItem = props => {
  const {passwordDetails, onDeleteList, ShowPassword} = props
  const {id, website, userName, password, bgColor} = passwordDetails

  const initial = userName.slice(0, 1).toUpperCase()

  const onDelete = () => {
    onDeleteList(id)
  }

  return (
    <li className="list-container">
      <div className={`${bgColor} initial-container`}>
        <p className="initial">{initial}</p>
      </div>
      <div className="web-container">
        <p className="input-para">{website}</p>
        <p className="input-para">{userName}</p>
        {ShowPassword ? (
          <p className="input-para">{password}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            alt="stars"
            className="stars-img"
          />
        )}
      </div>
      <div>
        <button type="button" className="delete-btn" onClick={onDelete}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
