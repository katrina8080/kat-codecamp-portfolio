/* eslint-disable @next/next/no-img-element */
'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useGlobalState } from '@/lib/store';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoIosMenu } from 'react-icons/io';

export default function Navbar() {
  const gState = useGlobalState();

  useEffect(() => {
    if (gState.ui.mobileMenu.value) {
      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      if (typeof window != 'undefined' && window.document) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      // Unsets Background Scrolling to use when SideDrawer/Modal is closed
      document.body.style.overflow = 'unset';
    }
  }, [gState.ui.mobileMenu]);

  return (
    <div className="top-0 z-10 py-2 font-kodchasan sticky bg-black">
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <Link href="/">
              <div className="flex items-center py-5 md:py-2">
                <img className="h-[2rem] rounded-md md:h-[2.4rem]" src="/logo/colored-white.png" alt="" />
              </div>
            </Link>
          </div>

          <div className="hidden md:block text-white">
            <div className="flex md:gap-12">
              <NavButton name={'Articles'} href={'/articles/'} />
              <NavButton name={'Login'} href={'/admin/'} />
              {/* <NavButton name={'About ICP'} href={'/about/'} />
              <NavButton name={'Incubation'} href={'/'} />
              <NavButton name={'Projects'} href={'/'} />
              <NavButton name={'Investors'} href={'/'} />
              <NavButton name={'Dashboard'} href={'/'} />
              <NavButton name={'Events'} href={'/'} /> */}
            </div>
          </div>
          <MobileDrawer />
        </div>
      </div>
    </div>
  );
}

const MobileDrawer = () => {
  const gState = useGlobalState();

  return (
    <>
      <IoIosMenu
        onClick={() => {
          gState.ui.mobileMenu.set(true);
        }}
        className="text-5xl text-white md:hidden"
      />
      <div
        className={`fixed inset-0 z-[999] flex transition-all ease-in-out ${
          gState.ui.mobileMenu.value ? 'opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className={`h-full flex-1 bg-black/50`} onClick={() => gState.ui.mobileMenu.set(false)}></div>
        <div
          className={`h-full w-[80%] bg-black transition-all duration-300 ease-in-out ${
            gState.ui.mobileMenu.value ? '' : 'mr-[-100%]'
          }`}
        >
          <div className="flex h-full flex-col gap-4">
            <div className="justify-between mt-20  flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-5 px-3 items-center text-white">
                <NavButton name={'Articles'} href={'/articles/'} />
                <NavButton name={'Login'} href={'/admin/'} />
                {/* <NavButton name={'About ICP'} href={'/about/'} />
                <NavButton name={'Incubation'} href={'/'} />
                <NavButton name={'Projects'} href={'/'} />
                <NavButton name={'Investors'} href={'/'} />
                <NavButton name={'Dashboard'} href={'/'} />
                <NavButton name={'Events'} href={'/'} /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const NavButton = ({ name, href }) => {
  const pathname = usePathname();
  const gState = useGlobalState();

  return (
    <Link href={href} scroll={false}>
      <div className="group relative">
        <button
          onClick={() => gState.ui.mobileMenu.set(false)}
          className={`text-base font-medium leading-relaxed ${pathname === href ? 'text-white' : ''}`}
        >
          {name}
        </button>
        <div
          className={`${
            pathname === href ? 'w-full' : ''
          } absolute -bottom-1 left-0 h-[2px] w-0 bg-[#3C0846] transition-all duration-500 group-hover:left-0 group-hover:w-full`}
        ></div>
      </div>
    </Link>
  );
};
