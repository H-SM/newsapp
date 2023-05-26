import React, { useEffect , useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props) => {


  const[articles, setArticles] = useState([]);
  const[loading, setLoading] = useState(false);
  const[page, setPage] = useState(1);
  const[totalResults, setTotalResultsArticles] = useState(0);

  
  const capitalizeLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  const  updateNews =async () =>{
    props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(60);
    setArticles(parseData.articles);
    setTotalResultsArticles(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
    document.title =(!(props.category === 'general')) ?`NewsMonkey - ${capitalizeLetter(props.category)}`:`NewsMonkey - Get your daily does of News free!`;
  },[]);
  const fetchMoreData = async () => {
    setPage(page + 1 );
    setLoading(true);
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parseData = await data.json();
  setArticles(articles.concat(parseData.articles));
  setTotalResultsArticles(parseData.totalResults);
  setLoading(false);
  
};
    return (
      <>
          <h2 className="text-center" style={{marginTop: '60px'}}>NewsMonkey - Top headlines - {capitalizeLetter(props.category)}</h2>

          <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles !== totalResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element, index) => (
              <div className="col-md-3" key={`${element.url}-${index}`}>
                <NewsItem
                  title={element.title}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  imageUrl={element.urlToImage ? element.urlToImage : 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
      </>
    )
}

export default News;

News.defaultProps = {
  country : "in",
  pageSize: 10,
  category: "general"
}
News.propTypes = {
  country : PropTypes.string.isRequired,
  pageSize: PropTypes.number,
  category: PropTypes.string
}