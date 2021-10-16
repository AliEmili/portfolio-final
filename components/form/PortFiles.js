import React from "react";

import { FormGroup, Label } from "reactstrap";

export default class PortDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataValue: [],
    };
  }

  handleChange = (event) => {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    this.setState({
      dataValue: event.target.files,
    });

    setFieldValue(name, event.target.files, true);
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
          <input
            type="file"
            name="picturesUrl"
            accept="image/*"
            multiple
            onChange={this.handleChange}
          />
          {touched[field.name] && errors[field.name] && (
            <div className="error">{errors[field.name]}</div>
          )}
        </div>
      </FormGroup>
    );
  }
}
