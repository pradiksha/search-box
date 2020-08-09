import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import DatePicker from "react-datepicker";
//import moment from "moment/min/moment.min"
import moment from "moment-timezone/builds/moment-timezone-with-data"
import TimeRangeSlider from "react-time-range-slider"

import "react-datepicker/dist/react-datepicker.css";
import "./styles.css"

class PeriodsOfActivityModal extends Component {

  handleChange = (date, activityPeriodArray, startDateArray, endDateArray, startTimeArray, endTimeArray) => {
    const { setSelectedDate, setStartTime, setEndTime, setTimeRange } = this.props
    const formatedDate = moment(date, "DD/MM/YYYY").format("DD/MM/YYYY")
    const index = activityPeriodArray.indexOf(formatedDate)
    setSelectedDate(date)
    const startIndex = startDateArray.indexOf(formatedDate)
    if (startIndex !== -1) {
      setStartTime(startTimeArray[startIndex])
      const endIndex = endDateArray.indexOf(formatedDate)
      if (endIndex !== -1) {
        setEndTime(endTimeArray[endIndex])
        setTimeRange({ start: moment(startTimeArray[startIndex], "hh:mm A").format("HH:mm"), end: moment(endTimeArray[endIndex], "hh:mm A").format("HH:mm") })
      }
    } else {
      setStartTime("00:00")
      setEndTime("00:00")
      setTimeRange({ start: "00:00", end: "00:00" })
    }

  }

  render() {
    const {
      show,
      handleHideModal,
      selectedData,
      selectedFromDate,
      startTime,
      endTime,
      value,
    } = this.props
    const { activity_periods } = selectedData
    const activityPeriodArray = []
    const startDateArray = []
    const endDateArray = []
    const startTimeArray = []
    const endTimeArray = []
    activity_periods && activity_periods.map(data => {
      const formatedStartDate = moment(data.start_time, "MMM DD YYYY hh:mmA").format("DD/MM/YYYY")
      activityPeriodArray.push(formatedStartDate)
      startDateArray.push(formatedStartDate)
      const formatedStartTime = moment(data.start_time, "MMM DD YYYY hh:mm A").format("hh:mm A")
      startTimeArray.push(formatedStartTime)
      const formatedEndDate = moment.utc(data.end_time, "MMM DD YYYY hh:mmA").format("DD/MM/YYYY")
      activityPeriodArray.push(formatedEndDate)
      endDateArray.push(formatedEndDate)
      const formatedEndTime = moment(data.end_time, "MMM DD YYYY hh:mmA").format("hh:mm A")
      endTimeArray.push(formatedEndTime)
      return null;
    }
    )

    return (
      <Modal
        className="todo-modal"
        show={show}
        onHide={handleHideModal}
      >
        <Modal.Header closeButton >
          <Modal.Title>Activity Period</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="d-flex">
              <p className="lable-txt">Date: </p>
              <DatePicker
                selected={selectedFromDate}
                dateFormat="dd/MM/yyyy"
                onChange={date => this.handleChange(date, activityPeriodArray, startDateArray, endDateArray, startTimeArray, endTimeArray)}
                dayClassName={date =>
                  activityPeriodArray.indexOf(moment(date, "DD/MM/YYYY").format("DD/MM/YYYY")) !== -1 ? "random" : undefined
                }
              />
            </div>
            <div className="d-flex">
              <p className="lable-txt">Start Time:<span className="time">{startTime}</span></p>
              <p className="lable-txt">End Time:<span className="time">{endTime}</span></p>
            </div>
            <div className="d-flex">
              <p className="lable-txt">Time Range:</p>
              <TimeRangeSlider
                disabled={false}
                format={24}
                maxValue={"23:59"}
                minValue={"00:00"}
                name={"time_range"}
                value={value}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}
export default PeriodsOfActivityModal