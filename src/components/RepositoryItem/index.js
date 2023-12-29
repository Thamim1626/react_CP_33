import {FaCodeFork} from 'react-icons/fa6'
import {CiStar} from 'react-icons/ci'
import {AiOutlineIssuesClose} from 'react-icons/ai'

import './index.css'

const RepositoryItem = props => {
  const {eachItem} = props
  const {avatarUrl, forksCount, id, issuesCount, name, starsCount} = eachItem

  return (
    <li className="repo-item">
      <img src={avatarUrl} alt={name} className="repo-item-avatar" />
      <p className="repo-item-name">{name}</p>
      <div className="detail-div-for-flex-start">
        <div className="repo-item-inner">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="star"
            className="icon"
          />
          <p className="repo-item-inner-des">{starsCount} Stars</p>
        </div>
        <div className="repo-item-inner">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="icon"
          />
          <p className="repo-item-inner-des">{forksCount} Forks</p>
        </div>
        <div className="repo-item-inner">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="icon"
          />
          <p className="repo-item-inner-des">{issuesCount} Open Issues</p>
        </div>
      </div>
    </li>
  )
}

export default RepositoryItem
