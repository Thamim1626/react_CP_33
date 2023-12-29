import {Component} from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  inital: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    activeFilterId: languageFiltersData[0].language,
    isDisplay: apiStatusConstants.inital,
    updatedRepoList: [],
    fetchError: false,
  }

  componentDidMount() {
    this.repoListFetch()
  }

  activeFilterIdChange = id => {
    this.setState(
      {activeFilterId: id, isDisplay: apiStatusConstants.inital},
      this.repoListFetch,
    )
  }

  renderListItems = () => {
    const {activeFilterId, updatedRepoList} = this.state
    return (
      <ul className="repo-list">
        {updatedRepoList.map(eachItem => (
          <RepositoryItem eachItem={eachItem} key={eachItem.id} />
        ))}
      </ul>
    )
  }

  repoListFetch = async () => {
    const {activeFilterId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeFilterId}`
    try {
      const response = await fetch(url)
      const data = await response.json()
      const fetchArray = data.popular_repos

      const caseChange = fetchArray.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        updatedRepoList: caseChange,
        isDisplay: apiStatusConstants.success,
      })
    } catch (e) {
      this.setState({
        isDisplay: apiStatusConstants.failure,
      })
    }
  }

  renderFilterTab = () => {
    const {activeFilterId, updatedRepoList} = this.state

    return (
      <ul className="filter-list">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            eachItem={eachItem}
            activeFilterId={activeFilterId}
            key={eachItem.id}
            activeFilterIdChange={this.activeFilterIdChange}
          />
        ))}
      </ul>
    )
  }

  apiRender = () => {
    const {isDisplay} = this.state
    switch (isDisplay) {
      case apiStatusConstants.inital:
        return <h1 className="loader">loading............</h1>
      case apiStatusConstants.failure:
        return (
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
            className="fail-image"
          />
        )
      default:
        return this.renderListItems()
    }
  }

  render() {
    const {activeFilterId, updatedRepoList, isDisplay} = this.state

    return (
      <div className="repo-main">
        <h1 className="repo-heading">Popular</h1>
        {this.renderFilterTab()}
        {this.apiRender()}
      </div>
    )
  }
}

export default GithubPopularRepos
