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
  apiKey: ''
});

class App extends Component{
  constructor(){
    super();
    this.state ={
      input: '',
      imgUrl: '',
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
      ).then(
        function(response){
          //do something with reponse
          console.log(response.outputs[0].data.regions[0].region_info);
        },
        function(error){
          console.log('erooo');
          //there was an error
        }
    )
  }
  render(){
    return(
      <div className="App">
        <ParticlesContainer />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm inputChange={ this.onInputChange } buttonSubmit={ this.onButtonSubmit }/>
        <FaceRecognition imgUrl={ this.state.imgUrl }/>
      </div>

    );
  }
}

export default App;
