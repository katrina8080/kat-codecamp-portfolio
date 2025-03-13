import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  createArticle: ActorMethod<
    [
      {
        id: string;
        categoryId: string;
        status: boolean;
        title: string;
        content: string;
        date: bigint;
        description: string;
      },
    ],
    | {
        Ok: {
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        };
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  createCategory: ActorMethod<
    [string],
    | { Ok: { id: string; name: string } }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  createUser: ActorMethod<
    [string],
    | {
        Ok: {
          id: Principal;
          status: boolean;
          name: string;
          createdAt: bigint;
          role: string;
          updatedAt: bigint;
        };
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getActiveArticleById: ActorMethod<
    [string],
    | {
        Ok: {
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        };
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getActiveArticles: ActorMethod<
    [],
    | {
        Ok: Array<{
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        }>;
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getActiveArticlesByCategory: ActorMethod<
    [string],
    | {
        Ok: Array<{
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        }>;
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getAllArticles: ActorMethod<
    [],
    | {
        Ok: Array<{
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        }>;
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getAllCategories: ActorMethod<
    [],
    | { Ok: Array<{ id: string; name: string }> }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getArticlesEditedByEditor: ActorMethod<
    [],
    | {
        Ok: Array<{
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        }>;
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getArticlesOfAuthor: ActorMethod<
    [],
    | {
        Ok: Array<{
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        }>;
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getInactiveArticles: ActorMethod<
    [],
    | {
        Ok: Array<{
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        }>;
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getMe: ActorMethod<
    [],
    | {
        Ok: {
          id: Principal;
          status: boolean;
          name: string;
          createdAt: bigint;
          role: string;
          updatedAt: bigint;
        };
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  getUsers: ActorMethod<
    [],
    | {
        Ok: Array<{
          id: Principal;
          status: boolean;
          name: string;
          createdAt: bigint;
          role: string;
          updatedAt: bigint;
        }>;
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  initOwner: ActorMethod<
    [],
    | { Ok: Principal }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  updateArticle: ActorMethod<
    [
      {
        id: string;
        categoryId: string;
        status: boolean;
        title: string;
        content: string;
        date: bigint;
        description: string;
      },
    ],
    | {
        Ok: {
          id: string;
          categoryId: string;
          status: boolean;
          title: string;
          content: string;
          authorId: string;
          date: bigint;
          createdAt: bigint;
          authorName: string;
          description: string;
          updatedAt: bigint;
          editorId: string;
        };
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
  updateUser: ActorMethod<
    [
      {
        id: Principal;
        status: boolean;
        name: string;
        role: string;
      },
    ],
    | {
        Ok: {
          id: Principal;
          status: boolean;
          name: string;
          createdAt: bigint;
          role: string;
          updatedAt: bigint;
        };
      }
    | {
        Err:
          | { NotFound: string }
          | { Unauthorized: string }
          | { InternalError: string }
          | { Forbidden: string }
          | { BadRequest: string };
      }
  >;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
