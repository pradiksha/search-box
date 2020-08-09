import React from "react"
import Input from "../Input"
import search from"../../Images/search.svg"
import "./index.css"

export default class Autosuggest extends React.Component {
  state = {
    text: this.props.defaultValue || "",
    showSuggestions: false,
    stateList: this.props.list || [],
  }
  searchSuggestions = (e) => {
    let tempList = []
    const { value } = e.target
    const { minLengthForApiCall, list } = this.props
    if (value.length >= minLengthForApiCall) {
      list.map((item) => {
        if (item.id.toLowerCase().includes(value.toLowerCase())) {
          tempList.push(item)
        } else if (item.name.toLowerCase().includes(value.toLowerCase())) {
          tempList.push(item)
        } else if (item.address.toLowerCase().includes(value.toLowerCase())) {
          tempList.push(item)
        }
        return null;
      })
      this.setState({ text: value, showSuggestions: true, stateList: tempList })
    } else {
      this.setState({ text: value, showSuggestions: false })
    }
  }

  highlight = ({ text, name, index }) => {
    const re = new RegExp("(" + text + ")", "gi")
    const cls = "blue"
    const template = `<span class=${cls}>${text}</span>`
    const label = name.replace(re, template)
    if (index === 1) {
      return <h4 dangerouslySetInnerHTML={{ __html: label }} />
    } else if (index === 2) {
      return <h5 dangerouslySetInnerHTML={{ __html: label }} />
    } else if (index === 3) {
      return <p dangerouslySetInnerHTML={{ __html:label }} />
    }

  }
  renderSuggestions = (list) => {
    if (list.length === 0) {
      return (<ul>
        <li className="no-user">No User Found</li>
      </ul>)
    }
    const { text } = this.state
    return (
      <ul>
        {list.map(item => <li key={item.id} onClick={() => this.suggestionSelected({ item })}>
          <div>
            {item.id.toLowerCase().includes(text.toLowerCase()) ?
              this.highlight({ text, name: item.id, index: 1 })
              : <h4>{item.id}</h4>
            }
            {item.name.toLowerCase().includes(text.toLowerCase()) ?
              this.highlight({ text, name: item.name, index: 2 })
              : <h5>{item.name}</h5>
            }
            {item.address.toLowerCase().includes(text.toLowerCase()) ?
              this.highlight({ text, name: item.address, index: 3 })
              : <p>{item.address}</p>
            }
          </div>
        </li>)}
      </ul>
    )
  }
  handleClick = () => {
    if (!this.state.showSuggestions) {
      document.addEventListener("click", this.handleOutsideClick, false)
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false)
    }

    this.setState({
      showSuggestions: false,
    })
  }
  handleOutsideClick = (e) => {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return
    }
    this.handleClick()
  }

  suggestionSelected = (value) => {
    const { input, dropDownSearch, poiType } = this.props
    this.setState({
      text: value.item.name,
      showSuggestions: false,
    })
    if (poiType) {
      input.onChange(value.item.name)
    } else {
      input.onChange(value.item.id)
    }
    if (dropDownSearch) {
      dropDownSearch(value.item.id)
    }
  }

  render() {
    const { placeholder, className, input, defaultValue, dropDownSearch } = this.props
    if (defaultValue) {
      if (dropDownSearch) {
        dropDownSearch(input.value)
      }
    }
    const inputProps = {
      ...this.props,
      value: this.state.text,
      onChange: this.searchSuggestions,
      onFocus: this.handleClick,
      placeholder,
      type: "text",
    }
    return (
      <div className={`as-wrap ${className}`}>
        <div className="as">
          <Input {...inputProps} />
          <img className="search-img-style" src={search} alt="search" />
          <div className="list" ref={(node) => { this.node = node }}>
            {this.state.showSuggestions && this.renderSuggestions(this.state.stateList)}
          </div>
        </div>
      </div>
    )
  }
}
