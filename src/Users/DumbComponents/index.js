import React, { Component } from 'react'
import { Field, reduxForm } from "redux-form"
import Container from "Users/Components"
import RenderAutosuggestField from "../Common/FormFields/RenderAutosuggestField"
import Dashboard from "./Dashboard"
import PeriodsOfActivityModal from "./PeriodsOfActivityModal"


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

 /* handleShowModal = () => {
    const { setModalVisibility } = this.props
    setModalVisibility(true)
    this.setState({ showModal: true, isEdit: false })
  }

  handleHideModal = () => {
    const { setModalVisibility } = this.props
    setModalVisibility(false)
    this.setState({ showModal: false, isEdit: false, selectedData: {} })
  }

  handleEdit = (value) => {
    const { setModalVisibility } = this.props
    setModalVisibility(true)
    this.setState({ selectedData: value, isEdit: true, showModal: true })
  }*/

  render() {
    const {
      dataList,
      dashboardFetching,
      isModalOpen,
      selectedFromDate,
      setSelectedDate,
      startTime,
      endTime,
      setStartTime,
      setEndTime,
      value,
      setTimeRange,
    } = this.props
    return (
      <div>
        <h1>Employees List</h1>
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
