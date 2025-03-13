'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useStateContext } from '@/lib/contexts/state';
import { useGlobalState } from '@/lib/store';
import { useGlobalStatePersist } from '@/lib/store/persist';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Jdenticon from 'react-jdenticon';
import useEstimatedReadingTime from '@/lib/hooks/useEstimatedReadingTime';
import useHtmlToText from '@/lib/hooks/useHtmlToText';
import { Badge } from '@/components/ui/badge';
import { useParallax } from 'react-scroll-parallax';

export default function CategoryPage() {
  const gState = useGlobalState();
  const gStateP = useGlobalStatePersist();
  const router = useRouter();
  const catId = useSearchParams().get('id');
  const [{ actor }] = useStateContext();
  const parallax = useParallax<HTMLDivElement>({
    startScroll: 0,
    endScroll: 1000,
    translateY: [0, 500],
  });

  const readingTimeInMinutes = useEstimatedReadingTime();
  const htmlToText = useHtmlToText();

  const onLoad = async () => {
    if (!actor) return;

    // const users = await actor.getUsers();
    // gState.users.set(
    //   users.Ok.map((v) => ({
    //     ...v,
    //     id: v.id.toString(),
    //     createdAt: (parseInt(v.createdAt) / 1000000).toString(),
    //     updatedAt: (parseInt(v.updatedAt) / 1000000).toString(),
    //   })) || [],
    // );

    const categories = await actor.getAllCategories();
    const activeArticles: any = await actor.getActiveArticles();
    const articles = await actor.getActiveArticlesByCategory(catId);
    const cat = categories.Ok.find((v) => v.id === catId);

    gState.articles.set(
      activeArticles.Ok.map((v) => ({
        ...v,
        createdAt: parseInt(v.createdAt) / 1000000,
        date: parseInt(v.date) / 1000000,
        updatedAt: parseInt(v.updatedAt) / 1000000,
      })),
    );
    gState.categoryPage.set({
      categoryId: catId,
      categoryName: cat.name,
      articles: articles.Ok.map((v) => ({
        ...v,
        createdAt: parseInt(v.createdAt) / 1000000,
        date: parseInt(v.date) / 1000000,
        updatedAt: parseInt(v.updatedAt) / 1000000,
      })),
    });
  };

  useEffect(() => {
    onLoad();
  }, [actor]);

  return (
    <main className="scroll-smooth">
      <div ref={parallax.ref}>
        <div className="bg-black">
          <Navbar />
        </div>

        {/* Category Header */}
        <div className="relative py-8 text-center bg-gray-50">
          <div className="text-center uppercase text-sm tracking-widest text-icp-yellow">Category</div>
          <h1 className="text-3xl font-bold uppercase mt-2 tracking-wide">{gState.categoryPage.value.categoryName}</h1>

          <div className="absolute bottom-0 inset-x-0">
            <div className="text-8xl tracking-widest opacity-[0.02] select-none">CATEGORY</div>
          </div>
        </div>
      </div>

      <section className="relative z-[1] min-h-[calc(100vh-96px)] bg-white shadow-top">
        <div className="container py-14">
          {/* Article List */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 select-none">
            {gState.categoryPage.articles.value.map((article) => {
              return (
                <div
                  key={article.id}
                  className="bg-white px-8 py-6 rounded border border-gray-300 transition duration-200 ease-in-out hover:shadow-lg hover:cursor-pointer"
                  onClick={() => {
                    gStateP['article'].set(JSON.parse(JSON.stringify(article)));
                    router.push(`/articles/?id=${article.id}`);
                  }}
                >
                  {/* Author Profile */}
                  <div className="flex items-center gap-4">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="" alt={article.authorId} />
                      <AvatarFallback>
                        <Jdenticon size="48" value={article.authorId} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{article.authorName}</div>
                  </div>

                  {/* Title */}
                  <div className="mt-4">
                    <h1 className="font-bold text-2xl text-gray-800 line-clamp-2">{article.title}</h1>
                    <p className="text-gray-500 mt-1 line-clamp-2">{article.description}</p>
                  </div>

                  {/* Stats */}
                  <div className="text-gray-500 pt-4 flex items-center gap-2">
                    <div>
                      {`${new Date(article.createdAt).toLocaleString('en-US', {
                        timeZone: 'Asia/Manila',
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      })}`}
                    </div>
                    <div> • </div>
                    <div>{`${readingTimeInMinutes.calculate(htmlToText.convert(article.content))} min read`}</div>
                    <div> • </div>
                    <div>
                      <Badge variant="secondary" className="text-icp-yellow">
                        {gState.categories.value.find((c) => c.id === article.categoryId)?.name}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
