'use client'; // This is a client component

import { Card, Title, Text } from '@tremor/react';
import Search from './search';
import ArticleTable from './table';
import { useEffect, useState } from 'react';
import { Article, TArticleList } from './types/article';
import { signIn, useSession } from 'next-auth/react';
import useApiClient from './hooks/useApiClient';

// export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const apiClient = useApiClient(process.env.NEXT_PUBLIC_API);
  const search = searchParams.q ?? '';
  const [articlesList, setArticlesList] = useState<TArticleList>();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
    if (!session) {
      return;
    }
    apiClient
      ?.get<TArticleList>(
        `/article/list${search ? +'?freeTextSearch=' + search : ''}`
      )
      .then((response) => {
        setArticlesList(response);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [search, session, status, apiClient]);

  // useEffect(() => {
  //   apiClient
  //     ?.get<TArticleList>(`/article/list?freeTextSearch=${search}`)
  //     .then((response) => {
  //       setArticlesList(response);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Articles</Title>
      <Text>Manage Articles</Text>
      <Search />
      <Card className="mt-6">
        <ArticleTable articlesList={articlesList} />
      </Card>
    </main>
  );
}
