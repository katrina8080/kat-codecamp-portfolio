/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import * as React from 'react';
import { LuFacebook } from 'react-icons/lu';
import { RiTiktokLine } from 'react-icons/ri';

export default function Footer() {
  return (
    <footer className="bg-[#111111]">
      <div className="container py-10 items-center flex-col md:flex-row flex md:gap-10 gap-4">
        <div className="flex flex-1 justify-between flex-col md:flex-row items-center md:gap-10 gap-4">
          <img className="h-[3rem] md:h-[2.4rem]" src="/logo/colored-white.png" alt="" />

          <Link href={'https://twitter.com/icphub_PH'}>
            <div className="mx-auto rounded-md text-center backdrop-blur-md bg-white/10 px-8 py-3 mt-6 md:mt-0 text-white hover:bg-[#CD207C] active:scale-90">
              Follow us on X
            </div>
          </Link>
        </div>
      </div>
    </footer>
  );
}
