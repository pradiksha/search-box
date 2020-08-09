import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form"
import Container from "Users/Components"
import RenderAutosuggestField from "../Common/FormFields/RenderAutosuggestField"
import Header from "../Common/Header"
import "./styles.css"


class Form extends Component {

  state = {
    showModal: false,
    selectedData: {},
    isEdit: false,
  }

  componentDidMount() {
    const { getAllDataReq } = this.props
    getAllDataReq()
  }

  render() {
    const { dataList } = this.props
    return (
      <div>
        <Header />
        <div className="mt-5 ml-5">
          <Field
            component={RenderAutosuggestField}
            label="Search:"
            placeholder="Search users by Id, address, name"
            name="userId"
            list={dataList}
            minLengthForApiCall="1"
            className="search-field"
          />
        </div>
      </div>
    )
  }
}

const form = reduxForm({
  form: "usersForm",
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  onSubmit: () => { },
})(Form)

export default Container(form)
