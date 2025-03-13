export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    createArticle: IDL.Func(
      [
        IDL.Record({
          id: IDL.Text,
          categoryId: IDL.Text,
          status: IDL.Bool,
          title: IDL.Text,
          content: IDL.Text,
          date: IDL.Nat64,
          description: IDL.Text,
        }),
      ],
      [
        IDL.Variant({
          Ok: IDL.Record({
            id: IDL.Text,
            categoryId: IDL.Text,
            status: IDL.Bool,
            title: IDL.Text,
            content: IDL.Text,
            authorId: IDL.Text,
            date: IDL.Nat64,
            createdAt: IDL.Nat64,
            authorName: IDL.Text,
            description: IDL.Text,
            updatedAt: IDL.Nat64,
            editorId: IDL.Text,
          }),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      [],
    ),
    createCategory: IDL.Func(
      [IDL.Text],
      [
        IDL.Variant({
          Ok: IDL.Record({ id: IDL.Text, name: IDL.Text }),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      [],
    ),
    createUser: IDL.Func(
      [IDL.Text],
      [
        IDL.Variant({
          Ok: IDL.Record({
            id: IDL.Principal,
            status: IDL.Bool,
            name: IDL.Text,
            createdAt: IDL.Nat64,
            role: IDL.Text,
            updatedAt: IDL.Nat64,
          }),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      [],
    ),
    getActiveArticleById: IDL.Func(
      [IDL.Text],
      [
        IDL.Variant({
          Ok: IDL.Record({
            id: IDL.Text,
            categoryId: IDL.Text,
            status: IDL.Bool,
            title: IDL.Text,
            content: IDL.Text,
            authorId: IDL.Text,
            date: IDL.Nat64,
            createdAt: IDL.Nat64,
            authorName: IDL.Text,
            description: IDL.Text,
            updatedAt: IDL.Nat64,
            editorId: IDL.Text,
          }),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getActiveArticles: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Vec(
            IDL.Record({
              id: IDL.Text,
              categoryId: IDL.Text,
              status: IDL.Bool,
              title: IDL.Text,
              content: IDL.Text,
              authorId: IDL.Text,
              date: IDL.Nat64,
              createdAt: IDL.Nat64,
              authorName: IDL.Text,
              description: IDL.Text,
              updatedAt: IDL.Nat64,
              editorId: IDL.Text,
            }),
          ),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getActiveArticlesByCategory: IDL.Func(
      [IDL.Text],
      [
        IDL.Variant({
          Ok: IDL.Vec(
            IDL.Record({
              id: IDL.Text,
              categoryId: IDL.Text,
              status: IDL.Bool,
              title: IDL.Text,
              content: IDL.Text,
              authorId: IDL.Text,
              date: IDL.Nat64,
              createdAt: IDL.Nat64,
              authorName: IDL.Text,
              description: IDL.Text,
              updatedAt: IDL.Nat64,
              editorId: IDL.Text,
            }),
          ),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getAllArticles: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Vec(
            IDL.Record({
              id: IDL.Text,
              categoryId: IDL.Text,
              status: IDL.Bool,
              title: IDL.Text,
              content: IDL.Text,
              authorId: IDL.Text,
              date: IDL.Nat64,
              createdAt: IDL.Nat64,
              authorName: IDL.Text,
              description: IDL.Text,
              updatedAt: IDL.Nat64,
              editorId: IDL.Text,
            }),
          ),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getAllCategories: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Vec(IDL.Record({ id: IDL.Text, name: IDL.Text })),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getArticlesEditedByEditor: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Vec(
            IDL.Record({
              id: IDL.Text,
              categoryId: IDL.Text,
              status: IDL.Bool,
              title: IDL.Text,
              content: IDL.Text,
              authorId: IDL.Text,
              date: IDL.Nat64,
              createdAt: IDL.Nat64,
              authorName: IDL.Text,
              description: IDL.Text,
              updatedAt: IDL.Nat64,
              editorId: IDL.Text,
            }),
          ),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getArticlesOfAuthor: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Vec(
            IDL.Record({
              id: IDL.Text,
              categoryId: IDL.Text,
              status: IDL.Bool,
              title: IDL.Text,
              content: IDL.Text,
              authorId: IDL.Text,
              date: IDL.Nat64,
              createdAt: IDL.Nat64,
              authorName: IDL.Text,
              description: IDL.Text,
              updatedAt: IDL.Nat64,
              editorId: IDL.Text,
            }),
          ),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getInactiveArticles: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Vec(
            IDL.Record({
              id: IDL.Text,
              categoryId: IDL.Text,
              status: IDL.Bool,
              title: IDL.Text,
              content: IDL.Text,
              authorId: IDL.Text,
              date: IDL.Nat64,
              createdAt: IDL.Nat64,
              authorName: IDL.Text,
              description: IDL.Text,
              updatedAt: IDL.Nat64,
              editorId: IDL.Text,
            }),
          ),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getMe: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Record({
            id: IDL.Principal,
            status: IDL.Bool,
            name: IDL.Text,
            createdAt: IDL.Nat64,
            role: IDL.Text,
            updatedAt: IDL.Nat64,
          }),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    getUsers: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Vec(
            IDL.Record({
              id: IDL.Principal,
              status: IDL.Bool,
              name: IDL.Text,
              createdAt: IDL.Nat64,
              role: IDL.Text,
              updatedAt: IDL.Nat64,
            }),
          ),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      ['query'],
    ),
    initOwner: IDL.Func(
      [],
      [
        IDL.Variant({
          Ok: IDL.Principal,
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      [],
    ),
    updateArticle: IDL.Func(
      [
        IDL.Record({
          id: IDL.Text,
          categoryId: IDL.Text,
          status: IDL.Bool,
          title: IDL.Text,
          content: IDL.Text,
          date: IDL.Nat64,
          description: IDL.Text,
        }),
      ],
      [
        IDL.Variant({
          Ok: IDL.Record({
            id: IDL.Text,
            categoryId: IDL.Text,
            status: IDL.Bool,
            title: IDL.Text,
            content: IDL.Text,
            authorId: IDL.Text,
            date: IDL.Nat64,
            createdAt: IDL.Nat64,
            authorName: IDL.Text,
            description: IDL.Text,
            updatedAt: IDL.Nat64,
            editorId: IDL.Text,
          }),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      [],
    ),
    updateUser: IDL.Func(
      [
        IDL.Record({
          id: IDL.Principal,
          status: IDL.Bool,
          name: IDL.Text,
          role: IDL.Text,
        }),
      ],
      [
        IDL.Variant({
          Ok: IDL.Record({
            id: IDL.Principal,
            status: IDL.Bool,
            name: IDL.Text,
            createdAt: IDL.Nat64,
            role: IDL.Text,
            updatedAt: IDL.Nat64,
          }),
          Err: IDL.Variant({
            NotFound: IDL.Text,
            Unauthorized: IDL.Text,
            InternalError: IDL.Text,
            Forbidden: IDL.Text,
            BadRequest: IDL.Text,
          }),
        }),
      ],
      [],
    ),
  });
};
export const init = ({ IDL }) => {
  return [];
};
