/* eslint-disable @next/next/no-img-element */
'use client';

import type { NextPage } from 'next';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Wave from 'react-wavify';
import Particles from '@/components/Particles';
import Teams from '@/components/Teams';
import Footer from '@/components/Footer';

const Home: NextPage = () => {
  return (
    <main className="overflow-hidden scroll-smooth font-kodchasan bg-black">
      <Navbar />
      <section className="min-h-[83vh] overflow-hidden relative md:min-h-screen bg-[url('/bg/bg.png')] bg-cover bg-center bg-no-repeat">
        <Particles />
        <Wave
          fill="#3C0843"
          paused={false}
          className="absolute inset-0 opacity-20"
          options={{
            height: 350,
            amplitude: 80,
            speed: 0.15,
            points: 4,
          }}
        />
        <Wave
          fill="#150C2E"
          paused={false}
          className="absolute inset-0 opacity-10"
          options={{
            height: 340,
            amplitude: 80,
            speed: 0.14,
            points: 4,
          }}
        />
        <Wave
          fill="#3C0843"
          paused={false}
          className="absolute inset-0 opacity-20"
          options={{
            height: 330,
            amplitude: 80,
            speed: 0.13,
            points: 4,
          }}
        />

        <div className="flex container flex-1 justify-between flex-col items-center">
          <div className="flex flex-col gap-2 md:pt-16 pt-20">
            <div className="">
              <img className="max-h-[6rem] mx-auto" src="/logo/colored-white.png" alt="" />
            </div>

            <div className="text-white text-center mt-4 md:mt-8 max-w-screen-sm md:text-2xl">
              Where Ideas Transform into Innovations on the Internet Computer.
            </div>
          </div>
          <div className="flex flex-1 absolute bottom-[6rem] flex-col md:flex-row gap-2 md:gap-14 mx-auto">
            <Link href={'/articles'}>
              <div className="mx-auto rounded-md text-center backdrop-blur-md bg-white/10 px-8 py-3 text-white hover:bg-[#CD207C] active:scale-90">
                Learn About ICP
              </div>
            </Link>
            <Link href={'https://telegram.me/ICPHubPH'}>
              <div className="mx-auto rounded-md bg-white/10 text-center backdrop-blur-md px-8 py-3 text-white hover:bg-[#CD207C] active:scale-90">
                Join our telegram channel
              </div>
            </Link>
            <Link href={'https://twitter.com/icphub_PH'}>
              <div className="mx-auto rounded-md bg-white/10 text-center backdrop-blur-md px-8 py-3 text-white hover:bg-[#CD207C] active:scale-90">
                Follow us on X
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* <section className="container min-h-[60vh] flex overflow-hidden">
        <div className="flex flex-col gap-8 md:flex-row text-center md:text-left items-center justify-center py-10">
          <div className="text-white gap-4 flex flex-1 flex-col">
            <div className="font-semibold text-xl">About ICP.HUB PHILIPPINES</div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </div>
          </div>
          <div className="flex flex-1 justify-center">
            <img src="/assets/digital-world.png" alt="" />
          </div>
          <div className="flex flex-1">
            <div className="text-white">
              ICP.HUB PHILIPPINES Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </div>
          </div>
        </div>
      </section>

      <section className="container min-h-[50vh] overflow-hidden flex">
        <div className="flex flex-1 flex-col justify-center">
          <div className="text-white font-semibold text-2xl pb-5 text-center">Our Key Goals</div>

          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex flex-col bg-gray-800/50 gap-3 text-center md:text-left p-4 pb-11 border-b-8 border-[#29ABE2]">
              <div className="text-[#29ABE2] text-xl font-semibold">Lorem ipsum dolor sit amet,</div>
              <div className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </div>
            </div>
            <div className="flex flex-col bg-gray-800/50 gap-3 text-center md:text-left p-4 pb-11 border-b-8 border-[#CC207C]">
              <div className="text-[#CC207C] text-xl font-semibold">Lorem ipsum dolor sit amet,</div>
              <div className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </div>
            </div>
            <div className="flex flex-col bg-gray-800/50 gap-3 text-center md:text-left p-4 pb-11 border-b-8 border-[#F99E36]">
              <div className="text-[#F99E36] text-xl font-semibold">Lorem ipsum dolor sit amet,</div>
              <div className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </div>
            </div>
            <div className="flex flex-col bg-gray-800/50 gap-3 text-center md:text-left p-4 pb-11 border-b-8 border-[#5D2785]">
              <div className="text-[#5D2785] text-xl font-semibold">Lorem ipsum dolor sit amet,</div>
              <div className="text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container min-h-screen md:min-h-[50vh] overflow-hidden flex py-10">
        <div className="flex flex-1 flex-col justify-center">
          <div className="text-white font-semibold text-2xl pb-5 text-center">Our Teams</div>
          <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
            <Teams name={'Jirumaa Dela Cruz'} position={'CEO'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'CEO'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'CEO'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'CEO'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'CEO'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'CEO'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'CEO'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'CEO'} profile={'/profile/person.jpg'} />
          </div>
        </div>
      </section>

      <section className="container min-h-screen md:min-h-[50vh] overflow-hidden flex py-10">
        <div className="flex flex-1 flex-col justify-center">
          <div className="text-white font-semibold text-2xl pb-5 text-center">Our Advisors</div>
          <div className="grid md:grid-cols-4 gap-4 grid-cols-1">
            <Teams name={'Jirumaa Dela Cruz'} position={'Advisor'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'Advisor'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'Advisor'} profile={'/profile/person.jpg'} />
            <Teams name={'Jirumaa Dela Cruz'} position={'Advisor'} profile={'/profile/person.jpg'} />
          </div>
        </div>
      </section>

      <section className="container min-h-fit md:min-h-[50vh] overflow-hidden flex py-10">
        <div className="flex flex-1 flex-col justify-center">
          <div className="text-white font-semibold text-2xl pb-10 text-center">Our Strategic Partners</div>
          <div className="grid md:grid-cols-5 gap-y-10 gap-x-5 grid-cols-2">
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
            <Partners logo={'/partners/dvcode.png'} />
          </div>
        </div>
      </section> */}
      <Footer />
    </main>
  );
};

export default Home;

const Partners = ({ logo }) => {
  return (
    <div className="text-white flex flex-col items-center">
      <img className="flex  object-scale-down h-[30px] md:h-[50px]" src={logo} alt="" />
    </div>
  );
};
