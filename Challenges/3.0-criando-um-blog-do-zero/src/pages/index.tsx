import { ReactElement, useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';

import Header from '../components/Header';

import { getPrismicClient } from '../services/prismic';
import { formatDate } from '../utils/formatDate';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({
  postsPagination: { next_page, results },
}: HomeProps): ReactElement {
  const [posts, setPosts] = useState<Post[]>(
    results.map(post => ({
      ...post,
      first_publication_date: formatDate(post.first_publication_date),
    }))
  );
  const [nextPage, setNextPage] =
    useState<PostPagination['next_page']>(next_page);

  const handleLoadMore = (): void => {
    fetch(next_page)
      .then(res => res.json())
      .then((data: PostPagination) => {
        const formatedPosts = data.results.map(post => ({
          ...post,
          first_publication_date: formatDate(post.first_publication_date),
        }));

        setNextPage(data.next_page);
        setPosts([...posts, ...formatedPosts]);
      });
  };

  return (
    <>
      <Header />

      <main className={commonStyles.container}>
        <div className={styles.main}>
          {posts.map(post => (
            <Link key={post.uid} href={`/post/${post.uid}`}>
              <a>
                <h1>{post.data.title}</h1>
                <span>{post.data.subtitle}</span>

                <div className={styles.wrapper}>
                  <time>
                    <FiCalendar size={20} /> {post.first_publication_date}
                  </time>
                  <span>
                    <FiUser size={20} />
                    {post.data.author}
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>

        {nextPage && (
          <button
            className={styles.button}
            onClick={handleLoadMore}
            type="button"
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    { fetch: ['posts.title', 'posts.subtitle', 'posts.author'], pageSize: 1 }
  );

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: postsResponse.results,
      },
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
