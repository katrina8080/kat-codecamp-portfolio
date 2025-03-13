/* eslint-disable @next/next/no-img-element */
'use client';

import type { NextPage } from 'next';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Wave from 'react-wavify';
import Particles from '@/components/Particles';
import Teams from '@/components/Teams';
import Footer from '@/components/Footer';

const About: NextPage = () => {
  return (
    <main className="overflow-hidden scroll-smooth font-kodchasan bg-black">
      <Navbar />
      <section className="bg-[#111111] flex flex-col md:min-h-[60vh] overflow-hidden py-10">
        <div className="container flex flex-1 flex-col gap-4 justify-center">
          <div className="text-icp-pink font-semibold">About ICP</div>
          <div className="text-white font-semibold text-[16px] md:text-[24px]">
            The Internet Computer adds autonomous serverless cloud functionality to the public internet making it
            possible to build almost any system or service entirely on a decentralized network using “canister
            software,” an evolution of smart contracts.
          </div>
          <div className="text-white font-semibold text-[16px]">
            The Internet Computer is the fastest, most efficient, and only infinitely scalable general-purpose L1
            blockchain — incubated and launched by the DFINITY Foundation in May 2021. The Internet Computer is a World
            Computer blockchain that can host anything from a social network to a large enterprise system — removing the
            need for centralized IT. <br /> <br /> The Internet Computer advanced blockchain code is tamperproof and
            unstoppable. It can truly scale, and runs with incredible efficiency serving web experiences to endusers,
            interacting with Web2, and trustlessly creating transactions on other chains. ICP is the last-generation
            public decentralized smart contract network. Thanks to the lowest in the industry on-chain data storage
            price and cutting-edge tech, you can host and automate any sort of dapp and service on ICP smart contracts
            called canisters.
          </div>
        </div>
      </section>

      <section className="flex flex-col min-h-[40vh] overflow-hidden relative py-10">
        <div className="container flex flex-1 flex-col gap-4 justify-center">
          <div className="text-icp-pink font-semibold">Lorem ipsum dolor sit amet</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Sample
              title={'Lorem ipsum dolor sit amet'}
              description={'Sed iaculis est sapien, vitae aliquam ipsum dapibus'}
              content={'Lorem ipsum dolor sit amet'}
            />
            <Sample
              title={'Lorem ipsum dolor sit amet'}
              description={'Sed iaculis est sapien, vitae aliquam ipsum dapibus'}
              content={'Lorem ipsum dolor sit amet'}
            />
            <Sample
              title={'Lorem ipsum dolor sit amet'}
              description={'Sed iaculis est sapien, vitae aliquam ipsum dapibus'}
              content={'Lorem ipsum dolor sit amet'}
            />
            <Sample
              title={'Lorem ipsum dolor sit amet'}
              description={'Sed iaculis est sapien, vitae aliquam ipsum dapibus'}
              content={'Lorem ipsum dolor sit amet'}
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col min-h-[40vh] overflow-hidden relative py-10 bg-[url('/bg/bg-about.png')] bg-cover bg-center bg-no-repeat">
        <div className="container gap-10 flex flex-col">
          <div className="text-white text-[24px] font-semibold">The architecture of the IC</div>
          <div className="text-white text-[16px]">
            The Internet Computer Protocol runs on servers with standardized hardware, which we call nodes. Nodes are
            distributed globally and hosted in independent data centers to ensure fault tolerance and decentralization.
            Nodes are grouped together into subnets, where each subnet constitutes its own blockchain that makes
            progress independently of the other subnets, resulting in unprecedented performance and scalability in the
            blockchain space. <br /> <br /> All subnets are connected and orchestrated by the Internet Computer Protocol
            to give rise to the Internet Computer. The IC improves and evolves at a rapid pace through regular and
            seamless roll-outs of software updates that boost performance, iron out bugs, and introduce entirely new
            capabilities. Continuous hardware upgrades, adding nodes or subnets, make the IC scale virtually without
            bounds — scaling the IC is always possible by adding additional nodes.
          </div>
        </div>
      </section>

      <section className="flex flex-col min-h-[40vh] overflow-hidden relative py-10">
        <div className="container flex flex-1 flex-col gap-4 justify-center">
          <div className="text-icp-blue font-semibold">ICP is a utility token which is used for these purposes:</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Sample
              title={'Lorem ipsum dolor sit amet'}
              description={'Sed iaculis est sapien, vitae aliquam ipsum dapibus'}
              content={'Lorem ipsum dolor sit amet'}
            />
            <Sample
              title={'Lorem ipsum dolor sit amet'}
              description={'Sed iaculis est sapien, vitae aliquam ipsum dapibus'}
              content={'Lorem ipsum dolor sit amet'}
            />
            <Sample
              title={'Lorem ipsum dolor sit amet'}
              description={'Sed iaculis est sapien, vitae aliquam ipsum dapibus'}
              content={'Lorem ipsum dolor sit amet'}
            />
            <Sample
              title={'Lorem ipsum dolor sit amet'}
              description={'Sed iaculis est sapien, vitae aliquam ipsum dapibus'}
              content={'Lorem ipsum dolor sit amet'}
            />
          </div>
        </div>
      </section>

      <section className="bg-[#111111] flex flex-col md:min-h-[60vh] overflow-hidden py-10">
        <div className="flex flex-col md:flex-row container gap-10">
          <img className="flex flex-1 object-scale-down items-center" src="/assets/about-icon.png" alt="" />
          <div className="flex flex-1 flex-col justify-center gap-4">
            <div className="md:text-[48px] text-[25px] text-center md:text-left font-semibold text-white">
              1000s of developers are now building on the Internet Computer
            </div>
            <div className="md:text-[40px] text-[20px] font-semibold text-icp-yellow text-center md:text-left">
              Join the movement
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Sample = ({ title, description, content }) => {
  return (
    <div className="text-white flex flex-col bg-[#1C1C1C]">
      <div className="py-5 text-icp-yellow text-[20px] bg-[#111111] px-4">{title}</div>
      <div className="p-4 text-[14px] flex flex-col gap-4">
        <div className="font-light text-white">{description}</div>
        <div className="font-light text-icp-blue">{content}</div>
      </div>
    </div>
  );
};

const ChainKey = ({ img, title, description, content }) => {
  return (
    <div className="text-white flex flex-col bg-[#1C1C1C]">
      <img src={img} alt="" />
      <div className="p-4 text-[14px] flex flex-col gap-4">
        <div className="font-light text-white">{title}</div>
        <div className="font-light text-white">{description}</div>
        <div className="font-light text-icp-blue">{content}</div>
      </div>
    </div>
  );
};

export default About;
