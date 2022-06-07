import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesContainer from './components/ParticlesContainer/ParticlesContainer';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_KEY
});

class App extends Component{
  constructor(){
    super();
    this.state ={
      input: '',
      imgUrl: '',
      faceCapture: {},
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  }
  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    console.log('Submited');
    clarifaiApp.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input
      ).then((res) => this.setState({faceCapture: this.calculateFaceCapture(res)}))
      .catch((err) => {
        console.log('erooo');
      });
  }
  calculateFaceCapture = (data) => {
    const { bottom_row, left_col, right_col, top_row } = data.outputs[0].data.regions[0].region_info.bounding_box;
    const img = document.getElementById('img');
    const imgWidth = Number(img.width);
    const imgHeight = Number(img.height);
     
    let faceCapture = {
      top: top_row * imgHeight,
      bottom: imgHeight - (bottom_row * imgHeight),
      left: left_col * imgWidth,
      right: imgWidth - (right_col * imgWidth)
    }
    console.log(imgWidth, imgHeight);
    console.log(data.outputs[0].data.regions[0])
    console.log(faceCapture);
    return faceCapture;
  }
  render(){
    return(
      <div className="App">
        <ParticlesContainer />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm onInputChange={ this.onInputChange } onButtonSubmit={ this.onButtonSubmit }/>
        <FaceRecognition imgUrl={ this.state.imgUrl } faceCapture={ this.state.faceCapture }/>
      </div>

    );
  }
}

export default App;
