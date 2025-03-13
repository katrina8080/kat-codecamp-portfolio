import React from 'react';
import { useCallback } from 'react';
import Particles from 'react-tsparticles';
import type { Container, Engine } from 'tsparticles-engine';

import particleJson from './../../public/particlesjs-config.json';
import { loadSlim } from 'tsparticles-slim';

const ParticleSection = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // LOGGING
  }, []);

  return (
    <>
      <Particles
        className="absolute inset-x-0 top-0 h-screen"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particleJson as any}
      />
    </>
  );
};

export default ParticleSection;
