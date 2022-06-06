import React from 'react';
import Particles from 'react-tsparticles';
import { loadFirePreset } from 'tsparticles-preset-fire';
import './ParticlesContainer.css'

const ParticlesContainer = () => {
  const particlesOptions = {
  	preset: "fire"
  }
  const particlesInit = async (main) => {
    // console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFirePreset(main);
  };

  const particlesLoaded = (container) => {
    // console.log(container);
  };

  return (
    <Particles id="tsparticles" options={particlesOptions} init={particlesInit} loaded={particlesLoaded} />
  );
};

export default ParticlesContainer;