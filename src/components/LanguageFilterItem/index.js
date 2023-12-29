import './index.css'

const LanguageFilterItem = props => {
  const {eachItem, activeFilterId, activeFilterIdChange} = props
  const {id, language} = eachItem

  const callcAtiveFilterIdChange = () => {
    activeFilterIdChange(language)
  }

  const style =
    activeFilterId === language
      ? 'filter-item-button-active'
      : 'filter-item-button'

  return (
    <li className="filter-item">
      <button className={style} onClick={callcAtiveFilterIdChange}>
        {language}{' '}
      </button>
    </li>
  )
}

export default LanguageFilterItem
