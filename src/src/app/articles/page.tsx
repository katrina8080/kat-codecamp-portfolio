'use client';

import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import usePublic from '@/lib/hooks/usePublic';
import { useGlobalState } from '@/lib/store';
import { useGlobalStatePersist } from '@/lib/store/persist';
import { ChevronLeft } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Jdenticon from 'react-jdenticon';
import useEstimatedReadingTime from '@/lib/hooks/useEstimatedReadingTime';
import { Badge } from '@/components/ui/badge';
import useHtmlToText from '@/lib/hooks/useHtmlToText';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function ArticlesPage() {
  const gState = useGlobalState();
  const gStateP = useGlobalStatePersist();
  const id = useSearchParams().get('id');
  const router = useRouter();

  const readingTimeInMinutes = useEstimatedReadingTime();
  const htmlToText = useHtmlToText();

  const { actor } = usePublic();

  useEffect(() => {
    if (id && actor) {
      (async () => {
        const article = await actor.getActiveArticleById(id);
        if (article.Ok) {
          gStateP['article'].set({
            ...article.Ok,
            createdAt: parseInt(article.Ok.createdAt) / 1000000,
            date: parseInt(article.Ok.date) / 1000000,
            updatedAt: parseInt(article.Ok.updatedAt) / 1000000,
          });
        }
      })();
    }
  }, [id, actor]);

  return (
    <main className="scroll-smooth bg-black min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 bg-gray-200">
        <div className="container py-14">
          {/* Blank State */}
          {!id && gState.categories.length === 0 && (
            <div className="flex justify-center items-center mt-[7rem]">
              <div className="text-center">
                <img className="mx-auto" src="/assets/file.svg" alt="" />
                <div className="text-3xl font-bold mt-4">No article found</div>
                <p className="text-gray-500 mt-2 text-lg">Please check back later</p>
              </div>
            </div>
          )}

          {/* Article List */}
          {!id && gState.categories.length > 0 && (
            <div className="space-y-12">
              {gState.categories.value.map((cat, index) => (
                <div key={cat.id} className={cn(cat.articles.length === 0 && 'hidden')}>
                  {/* Category Header */}
                  <div className="pb-8 flex justify-between items-baseline">
                    <Link href={`/articles/category/?id=${cat.id}`}>
                      <h1 className="text-3xl font-bold">{cat.name}</h1>
                    </Link>
                    <div>
                      <Link href={`/articles/category/?id=${cat.id}`}>
                        <Button variant="link" className="text-gray-500 font-normal">
                          View All
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Article List */}
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 select-none">
                    {cat.articles.slice(0, cat.showCount).map((article) => {
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

                  {/* Load More */}
                  {cat.showCount < cat.articles.length && (
                    <div className="flex justify-center mt-8">
                      <Button
                        onClick={() => {
                          gState.categories[index]['showCount'].set((v) => v + 3);
                        }}
                        variant="outline"
                        className="border border-gray-300 font-poppins"
                        size="lg"
                      >
                        Load More
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Article */}
          {id && gStateP['article'].value && (
            <div className="">
              <Button
                onClick={() => {
                  router.push('/articles');
                }}
                variant="outline"
                className="border border-gray-300 font-poppins"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="bg-white px-8 py-12 rounded border border-gray-300 mt-8">
                <div className="text-center font-black uppercase text-sm tracking-widest text-icp-yellow">
                  {gState.categories.value.find((c) => c.id === gStateP['article'].value.categoryId)?.name}
                </div>

                {/* Title */}
                <div className="pt-3 mx-auto text-center max-w-2xl">
                  <h1 className="text-2xl md:text-4xl font-bold">{gStateP['article'].value.title}</h1>
                  {/* <p className="text-gray-500 pt-1">{gStateP['article'].value.description}</p> */}
                </div>

                {/* Stats */}
                <div className="text-gray-500 pt-6 flex justify-center items-center gap-2 uppercase font-medium text-sm tracking-wider">
                  <div>
                    {`${new Date(gStateP['article'].value.createdAt).toLocaleString('en-US', {
                      timeZone: 'Asia/Manila',
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                    })}`}
                  </div>
                  <div> • </div>
                  <div>{`${readingTimeInMinutes.calculate(htmlToText.convert(gStateP['article'].value.content))} min read`}</div>
                </div>

                {/* Profile */}
                <div className="flex justify-center items-center gap-4 mt-6">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" alt={gStateP['article'].value.authorId} />
                    <AvatarFallback>
                      <Jdenticon size="48" value={gStateP['article'].value.authorId} />
                    </AvatarFallback>
                  </Avatar>
                  <div className="font-medium text-lg">{gStateP['article'].value.authorName}</div>
                </div>

                {/* Content */}
                <div className="py-6 flex justify-center mt-6">
                  <div
                    className={cn(
                      'prose lg:prose-2xl',
                      'prose-figcaption:text-center',
                      'prose-figure:flex prose-figure:flex-col prose-figure:items-center',
                      'xl:prose-img:max-w-screen-lg prose-img:max-h-[500px] prose-img:object-cover',
                    )}
                    dangerouslySetInnerHTML={{ __html: gStateP['article'].value.content }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
