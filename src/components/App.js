import React, { Component } from 'react';
import SearchBar from './SearchBar';
import Button from './Button';
import Mapa from './Mapa';
import axios from 'axios';

class App extends Component {
  state = {
    city: '',
    temp: null,
    lat: null,
    long: null,
    errMessage: '',
    measurement: 'K'
  }

  clearState =() => {
    this.setState({
      city: '',
      temp: null,
      measurement: 'K'
    })
  }

  onSearchSubmit = (city) => {
    this.clearState();

    const key = '536dd89a8107e8f5f539928bf3f9225d';

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((res) => {
      console.log(res);
      this.setState({
        city: city,
        lat: res.data.coord.lat,
        long: res.data.coord.lon,
        temp: Math.round(res.data.main.temp)
      })
    });
  }

  onClickFindMe = () => {
    this.clearState();

    const { lat, long } = this.state;
    const key = '536dd89a8107e8f5f539928bf3f9225d';

    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`)
    .then(res => this.setState({
      city: res.data.name,
      temp: Math.round(res.data.main.temp)
    }))
    .catch(err => this.setState({
      errMessage: err.message
    }));
    
  }

  setMeasurment = (newMeasurment) => {
    const { temp } = this.state;
    const { measurement } = this.state;

    if(temp) {
      const newTemp = () => {
        // eslint-disable-next-line default-case
        switch (measurement) {
          case 'C': {
            // eslint-disable-next-line default-case
            switch (newMeasurment) {
              case 'C': return  temp;
              case 'K': return temp + 273.15;
              case 'F': return ((temp * 9/5) + 32);
            }
            break;
          }
          case 'K': {
            // eslint-disable-next-line default-case
            switch (newMeasurment) {
              case 'C': return temp - 273.15;
              case 'K': return temp;
              case 'F': return (temp - 273.15) * 9/5 + 32;
            };
            break;
          }
  
          case 'F': {
            // eslint-disable-next-line default-case
            switch (newMeasurment) {
              case 'C': return (temp - 32) * 5/9;
              case 'K':  return (temp - 32) * 5/9 + 273.15;
              case 'F': return temp;
            };
            break;
          }
        } 
      }

      this.setState({
        temp: Math.round(newTemp()),
        measurement: newMeasurment
      });
    }
  };

  getPosition = () => {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(res, rej);
    })
    .then(res => this.setState({
      lat: res.coords.latitude,
      long: res.coords.longitude
    }))
    .then(res => this.onClickFindMe())
    .catch(rej => this.setState({
      errMessage: rej.message
    }));
  }

  render() {
    let { temp } = this.state;
    let { measurement } = this.state;
    let { city } = this.state;

    const showTemp = () => {
      if(temp && city) {
        return (
          <div>
            <div>Temperatura u {city} je {temp} {measurement}</div>
            <div className="radio-btns">
              <Button onClick={this.setMeasurment} value={"K"} name={"Kelvin"}></Button>
              <Button onClick={this.setMeasurment} value={"C"} name={"Celsius"}></Button>
              <Button onClick={this.setMeasurment} value={"F"} name={"Fahrenheit"}></Button>
            </div>
          </div>
        );
      }
    }

    const renderMap = () => {
      if(this.state.lat && this.state.long) {
        return <Mapa lat={this.state.lat} long={this.state.long}></Mapa>;
      }
    }

    return (
      <>
      <div className="ui container segment" style={{ marginTop: '20px' }}>
        <SearchBar errMessage={this.state.errMessage} onSubmit={this.onSearchSubmit} />
        <button className="ui button" onClick={this.getPosition} >Find me</button>
        {showTemp()}
      </div>
        {renderMap()}
      </>
    );
  }
}

export default App;