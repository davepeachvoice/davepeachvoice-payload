import React from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  image: {
    url: string;
  };
  category: Category;
}

interface Category {
  name: string;
}

interface CardProps {
  article: Article;
}

export default function Card(props: CardProps) {
  const imageUrl =
    process.env.NODE_ENV !== 'development'
      ? props.article.image.url
      : process.env.API_URL + props.article.image.url;
  return (
    <Link href={{ pathname: 'article', query: { id: props.article.id } }}>
      <a className='uk-link-reset'>
        <div className='uk-card uk-card-muted'>
          <div className='uk-card-media-top'>
            <img src={imageUrl} alt={props.article.image.url} height='100' />
          </div>
          <div className='uk-card-body'>
            <p id='category' className='uk-text-uppercase'>
              {props.article.category.name}
            </p>
            <p id='title' className='uk-text-large'>
              {props.article.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}
