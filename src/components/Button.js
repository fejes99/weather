import React, { Component } from 'react';

class Button extends Component {
  render() {
    const { onClick } = this.props;
    return(
      <div className="ui buttons">
        <button onClick={() => onClick(this.props.value)} className="ui button" >{this.props.name}</button>
      </div>
    );
  }
}

export default Button;