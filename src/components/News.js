import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {

  static defaultProps = {
    country : "in",
    pageSize: 10,
    category: "general"
  }
  static propTypes = {
    country : PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeLetter= (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    this.state ={
      articles: [],
      loading: false,
      page : 1,
      totalResults : 0
    }
    document.title =(!(this.props.category === 'general')) ?`NewsMonkey - ${this.capitalizeLetter(this.props.category)}`:`NewsMonkey - Get your daily does of News free!`;
  }

  async updateNews(){
    this.props.setProgress(10);
    this.setState({loading: true});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=043166a63d344b90aab8bfe7e0bda839&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(60);

    this.setState({
    articles : parseData.articles, 
    totalResults : parseData.totalResults, 
    totalPage : (Math.ceil(this.state.totalResults/this.props.pageSize)), 
    loading : false
    });
    this.props.setProgress(100);
  }
  async componentDidMount(){
    // this component will run after render method runs - this is also called cdm 
    this.updateNews();
  }
//    handlePrevClick= async ()=>{
// await this.setState({page : this.state.page - 1});
//   //the await function fixed up the problem for the 2nd page to not load 
//   this.updateNews();
//   }
//    handleNextClick= async ()=>{
// await this.setState({page : this.state.page + 1});
// this.updateNews();
//   }
fetchMoreData = async () => {
  this.setState({ loading: true, page: this.state.page + 1 }); // Update the page state before fetching data
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=043166a63d344b90aab8bfe7e0bda839&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parseData = await data.json();
  console.log(parseData);
  this.setState({
    articles: this.state.articles.concat(parseData.articles),
    totalResults: parseData.totalResults,
    totalPage: Math.ceil(parseData.totalResults / this.props.pageSize),
    loading: false,
  });
};
  render() {
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
          <h2 className="text-center">NewsMonkey - Top headlines - {this.capitalizeLetter(this.props.category)}</h2>
          {/* {this.state.loading && <Spinner/>} */}

          <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles !== this.state.totalResults}
        loader={this.state.loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {this.state.articles.map((element, index) => (
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
}