import React, { useEffect , useState } from 'react';
//useEffect to replace componentdidmount
import NewsItem from './NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props) => {


  const[articles, setArticles] = useState([]);
  const[loading, setLoading] = useState(false);
  const[page, setPage] = useState(1);
  const[totalResults, setTotalResultsArticles] = useState(0);
  // const[totalPages, setTotalPages] = useState(0);

  
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
    // setTotalPages((Math.ceil(totalResults/props.pageSize)));
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(()=>{
    updateNews();
    document.title =(!(props.category === 'general')) ?`NewsMonkey - ${capitalizeLetter(props.category)}`:`NewsMonkey - Get your daily does of News free!`;
  },[]);
  // async componentDidMount(){
  //   // this component will run after render method runs - this is also called cdm 
  //   this.updateNews();
  // }
//    handlePrevClick= async ()=>{
// await this.setState({page : this.state.page - 1});
//   //the await function fixed up the problem for the 2nd page to not load 
//   this.updateNews();
//   }
//    handleNextClick= async ()=>{
// await this.setState({page : this.state.page + 1});
// this.updateNews();
//   }
  const fetchMoreData = async () => {
    setPage(page + 1 );
    setLoading(true);
  // this.setState({ loading: true, page: this.state.page + 1 }); // Update the page state before fetching data
  let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  let data = await fetch(url);
  let parseData = await data.json();
  // console.log(parseData);
  setArticles(articles.concat(parseData.articles));
  setTotalResultsArticles(parseData.totalResults);
  // setTotalPages((Math.ceil(totalResults/props.pageSize)));
  setLoading(false);
  
};
    return (
      <>
      {/* <div className="sticky-container">
          <div className="container d-flex justify-content-between componentSticky">
            <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-dark"
              onClick={this.handlePrevClick}
            >
              &larr; Previous
            </button>
            <p>Page - {this.state.page} / {this.state.totalPage}</p>
            <button type="button" disabled={this.state.page + 1 > this.state.totalPage}
            className="btn btn-dark" onClick={this.handleNextClick}>
              Next &rarr;
            </button>
          </div>
        </div> */}
          <h2 className="text-center" style={{marginTop: '60px'}}>NewsMonkey - Top headlines - {capitalizeLetter(props.category)}</h2>
          {/* {this.state.loading && <Spinner/>} */}

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