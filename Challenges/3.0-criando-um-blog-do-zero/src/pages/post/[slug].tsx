import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';
import Prismic from '@prismicio/client';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';
import { formatDate } from '../../utils/formatDate';
import { phrasesPerMinutes } from '../../utils/phrasesPerMinutes';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import Header from '../../components/Header';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: string;
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({
  post: { data, first_publication_date },
}: PostProps): ReactElement {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Carregando...</div>;
  }

  const post = {
    first_publication_date: formatDate(first_publication_date),
    data: {
      title: data.title,
      banner: {
        url: data.banner.url,
      },
      author: data.author,
      content: data.content.map(content => ({
        heading: content.heading,
        body: RichText.asHtml(content.body),
      })),
    },
  };

  const readingTime = phrasesPerMinutes(
    data.content.map(content => RichText.asText(content.body))
  );

  return (
    <>
      <Header />

      <img className={styles.banner} src={post.data.banner.url} alt="banner" />

      <div className={commonStyles.container}>
        <main className={styles.content}>
          <header className={styles.header}>
            <h1>{post.data.title}</h1>

            <div>
              <time>
                <FiCalendar size={20} /> {post.first_publication_date}
              </time>

              <span>
                <FiUser size={20} /> {post.data.author}
              </span>

              <time>
                <FiClock size={20} /> {readingTime} min
              </time>
            </div>
          </header>

          {post.data.content.map(content => (
            <article key={content.heading} className={styles.article}>
              <h1>{content.heading}</h1>

              <div
                className={styles.post}
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: content.body }}
              />
            </article>
          ))}
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      pageSize: 5,
    }
  );

  const paths = postsResponse.results.map(post => ({
    params: { slug: post.uid },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(params.slug), {});

  return {
    props: {
      post: response,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
