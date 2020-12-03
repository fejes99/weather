import React, { Component } from 'react';

class RadioButtons extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <div className="ui buttons">
        <button className="ui button" onClick={() => onClick('C')} >Celsius</button>
        <button className="ui button" onClick={() => onClick('F')}>Fahrenheit</button>
        <button className="ui button" onClick={() => onClick('K')}>Kelvin</button>
      </div>
    );
  }
}

export default RadioButtons;