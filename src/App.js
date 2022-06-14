import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesContainer from './components/ParticlesContainer/ParticlesContainer';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
const facevisage_api = process.env.REACT_APP_FACE_VISAGE_API;

const initState = {
      input: '',
      imgUrl: '',
      faceCapture: [],
      route: 'signin',
      isSignedIn: false,
      userData: null
}

class App extends Component{
  constructor(){
    super();
    this.state = initState;
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }
  onPictureSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    fetch(`${facevisage_api}/facevisage/image`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({imgUrl: this.state.input})
    })
    .then(res => res.json())
    .then(faceRes => {
        fetch(`${facevisage_api}/users/entries`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: this.state.userData.id})
        })
        .then(res => res.json())
        .then(user => this.setState(Object.assign(this.state.userData, {entries: user.data.entries})))
        .catch(console.log)
        this.setState({faceCapture: this.calculateFaceCapture(faceRes.data)});
      })
      .catch((err) => {
        console.log('An Clarifai error occured');
      });
  }
  calculateFaceCapture = (data) => {
    const img = document.getElementById('img');
    const imgWidth = Number(img.width);
    const imgHeight = Number(img.height);

    const faceCapture = data.outputs[0].data.regions.map(output => {
        let { bottom_row, left_col, right_col, top_row } = output.region_info.bounding_box; 
        return {
          top: top_row * imgHeight,
          bottom: imgHeight - (bottom_row * imgHeight),
          left: left_col * imgWidth,
          right: imgWidth - (right_col * imgWidth)
        }
    });
    
    return faceCapture;
  }
  onRouteChange = (route, data=null) => {
    if (route === 'signout') {
      this.setState(initState);
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
