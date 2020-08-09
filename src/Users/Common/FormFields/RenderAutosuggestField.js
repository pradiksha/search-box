import React from "react"
import Autosuggest from "../Elements/Autosuggest"

const RenderAutosuggestField = ({
  input,
  label,
  defaultValue,
  list,
  meta,
  search,
  minLengthForApiCall,
  placeholder,
  dropDownSearch,
  poiType,
  className,
}) => (
  <Autosuggest
    input={input}
    list={list}
    placeholder={placeholder}
    defaultValue={defaultValue}
    onFocus={() => {
      if (input.onFocus) input.onFocus(input.value)
    }}
    onBlur={() => {
      if (input.onBlur) input.onBlur(input.value)
    }}
    label={label}
    isInvalid={(meta.touched && (!meta.active) && !!meta.error)}
    error={meta.error}
    search={search}
    dropDownSearch={dropDownSearch}
    minLengthForApiCall={minLengthForApiCall}
    poiType={poiType}
    className={className}
  />
)

export default RenderAutosuggestField
