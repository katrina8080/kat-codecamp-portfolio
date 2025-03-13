'use client';

export const internetIdentityUrl = process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL;
export const canisterId = process.env.NEXT_PUBLIC_CMS_CANISTER_ID;
export const currentMode = Number(process.env.NEXT_PUBLIC_ENV) || 0;
export const config = [
  // dev mode
  {
    api_url: 'https://example.com/api',
    imgur: process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID,
  },
  // prod mode
  {
    api_url: 'https://example.com/api',
    imgur: process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID,
  },
];

export default {
  project: 'icp',
  setting: config[currentMode],
  internetIdentityUrl,
  canisterId,
};
