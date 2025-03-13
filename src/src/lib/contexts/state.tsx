'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { createActor } from '@/declarations/cms';
import CONFIG from '@/lib/config';
import { toast } from '@/components/ui/use-toast';
import useLocalStorage from '../hooks/useLocalStorage';

export enum RoleEnum {
  AUTHOR = 'author',
  EDITOR = 'editor',
  ADMIN = 'admin',
}
export type Role = 'author' | 'editor' | 'admin';

export const StateContext = createContext<any>({});
export const useStateContext = () => useContext(StateContext);

export function StateProvider({ children }) {
  const [identity, setIdentity] = useState(null);
  const [actor, setActor] = useState(null);
  const [agent, setAgent] = useState(null);
  const [user, setUser] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const [updateArticle, setUpdateArticle] = useLocalStorage('updateArticle', null);

  const initOwner = async () => {
    if (!actor) return;

    const initOwner: any = await actor.initOwner();
    console.log('initOwner', initOwner);
  };

  const onLoad = async () => {
    const agent = new HttpAgent({
      host: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
      verifyQuerySignatures: false,
    });

    const actor = createActor(CONFIG.canisterId, {
      agent,
    });

    setActor(actor);
  };

  const login = async () => {
    // create an auth client
    let authClient = await AuthClient.create();

    // start the login process and wait for it to finish
    await authClient.login({
      identityProvider: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
      onSuccess: async () => {
        console.log('login success');
        const identity = authClient.getIdentity();

        const agent = new HttpAgent({
          host: process.env.NEXT_PUBLIC_INTERNET_IDENTITY_URL,
          identity,
          verifyQuerySignatures: false,
        });

        const actor = createActor(CONFIG.canisterId, {
          agent,
        });

        setAgent(agent);
        setActor(actor);
        setIdentity(identity);
      },
    });
  };

  // Actor Listener
  useEffect(() => {
    if (identity == null) return;

    (async () => {
      if (actor) {
        // Fetch user information
        const user: any = await actor.getMe();

        if (user.Err) {
          // Log error message
          console.error('getMe: ', user.Err);

          // Create user and set user state
          const register: any = await actor.createUser(identity.getPrincipal().toText());
          setUser(register.Ok);
        }
      }
    })();
  }, [actor, identity]);

  // Load Content based on User Role
  useEffect(() => {
    if (!identity) return;

    // Check current user if admin, else check if author or editor
    (async () => {
      const isAdmin = identity?.getPrincipal()?.toText() === process.env.NEXT_PUBLIC_ADMIN_PRINCIPAL_ID;
      setIsAdmin(isAdmin);

      const user = await actor.getMe();

      if (user.Ok) {
        console.log('user', user.Ok);
        setUser(user.Ok);
        const { role } = user.Ok;

        // Check user role and set flags accordingly
        if (role === RoleEnum.AUTHOR) {
          setIsAuthor(true);
        } else if (role === RoleEnum.EDITOR) {
          setIsEditor(true);
        } else {
          // Reset flags and show unauthorized access message
          setIsAuthor(false);
          setIsEditor(false);

          toast({
            title: 'Unauthorized Access',
            description: 'You are not authorized to access this page.',
            variant: 'destructive',
          });
        }
      }
    })();
  }, [identity]);

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <StateContext.Provider
      value={[
        { identity, actor, agent, user, isAdmin, isEditor, isAuthor, updateArticle },
        {
          setIdentity,
          setActor,
          setAgent,
          setUser,
          login,
          setIsAdmin,
          setIsAuthor,
          setIsEditor,
          initOwner,
          toast,
          setUpdateArticle,
        },
      ]}
    >
      {children}
    </StateContext.Provider>
  );
}
