'use client';

import dynamic from 'next/dynamic';
const ParallaxProvider = dynamic(() => import('react-scroll-parallax').then((mod) => mod.ParallaxProvider), {
  ssr: false,
});

export default ParallaxProvider;
