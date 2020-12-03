import React, { Component } from 'react';


class SearchBar extends Component {
  state={ city: '' };

  onFormSubmit = e => {
    e.preventDefault();
    console.log(this.props.errMessage);

    this.props.onSubmit(this.state.city);
  }

  render() {
    return (
      <div className="ui">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <label>Unesi grad</label>
          <input type="text" value={this.state.city} onChange={e => this.setState({ city: e.target.value })} />
          <button className="ui button">Search</button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
