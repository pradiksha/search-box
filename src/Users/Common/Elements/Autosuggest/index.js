import React from "react"
import Input from "../Input"
import "./index.css"
import { NONAME } from "dns"

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
        if(item.id.toLowerCase().includes(value.toLowerCase())) {
          tempList.push(item)
        } else if(item.name.toLowerCase().includes(value.toLowerCase())) {
          tempList.push(item)
        } else if(item.address.toLowerCase().includes(value.toLowerCase())) {
          tempList.push(item)
        }
        return null;
      })
      this.setState({ text: value, showSuggestions: true, stateList: tempList })
    } else {
      this.setState({ text: value, showSuggestions: false })
    }
  }

  renderSuggestions = (list) => {
    if (list.length === 0) {
      return null
    }
    return (
      <ul>
        {list.map(item => <li key={item.id} onClick={() => this.suggestionSelected({ item })}>
          <div>
            <h4>{item.id}</h4>
            <h5>{item.name}</h5>
            <p>{item.address}</p>
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
    const { list, placeholder, className, input, defaultValue, dropDownSearch } = this.props
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
          <div className="list" ref={(node) => { this.node = node }}>
            {this.state.showSuggestions && this.renderSuggestions(this.state.stateList)}
          </div>
        </div>
      </div>
    )
  }
}
