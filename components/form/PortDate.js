import React from "react";
import DatePicker from "react-datepicker";

import { FormGroup, Label } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default class PortDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateValue: moment(),
    };
  }

  handleChange = (date) => {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    this.setState({
      dateValue: date,
    });

    setFieldValue(name, date, true);
    setFieldTouched(name, true, true);
  };

  render() {
    const {
      label,
      field,
      form: { touched, errors },
    } = this.props;

    return (
      <FormGroup>
        <Label>{label}</Label>
        <div className="input-group">
          <DatePicker
            selected={this.state.dateValue}
            onChange={this.handleChange}
            peekNextMounth
            showMonthDropdown
            showYearDropdown
            maxDate={moment()}
            dropdownMode="select"
          />
          {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
        </div>
      </FormGroup>
    );
  }
}
