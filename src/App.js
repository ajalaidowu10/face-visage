import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesContainer from './components/ParticlesContainer/ParticlesContainer';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
const facevisage_api = process.env.REACT_APP_FACE_VISAGE_API;

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
      route: 'signin',
      isSignedIn: false,
      userData: null
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  onPictureSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    clarifaiApp.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input
      ).then((res) => {
        fetch(`${facevisage_api}/image`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: this.state.userData.id})
        })
        .then(res => res.json())
        .then(user => this.setState(Object.assign(this.state.userData, {entries: user.data.entries})))
        this.setState({faceCapture: this.calculateFaceCapture(res)});
      })
      .catch((err) => {
        console.log('An error occured');
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
    return faceCapture;
  }
  onRouteChange = (route, data=null) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
      route = 'signin';
    }else if(route === 'home'){
      this.setState({isSignedIn: true});
      this.setState({userData: data});

    }
    this.setState({route: route});
  }
  render(){
    const { imgUrl, isSignedIn, faceCapture, route, userData } = this.state;
    return(
        <div className="App">
        <ParticlesContainer />
        <Navigation onRouteChange={ this.onRouteChange } isSignedIn={ isSignedIn }/>
      { route === 'home'
        ? 
        <div>
          <Logo/>
          <Rank userData={ userData }/>
          <ImageLinkForm onInputChange={ this.onInputChange } onPictureSubmit={ this.onPictureSubmit }/>
          <FaceRecognition imgUrl={ imgUrl } faceCapture={ faceCapture }/>
        </div>
        : ( route === 'signin'

          ? <Signin onRouteChange={ this.onRouteChange }/>
          : <Signup onRouteChange={ this.onRouteChange }/>
          )
      }
      </div>
    );
  }
}

export default App;
