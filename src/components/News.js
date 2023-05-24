import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

  constructor(){
    super();
    this.state ={
      articles: [],
      loading: false,
      page : 1
    }
  }

  async componentDidMount(){
    // this component will run after render method runs - this is also called cdm 
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=dc525278bd27404d815bb0708ee6d305&page=1&pageSize=20";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({articles : parseData.articles, totalResults : parseData.totalResults, totalPage : (Math.ceil(this.state.totalResults/20))});

  }
   handlePrevClick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dc525278bd27404d815bb0708ee6d305&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log("next");
    this.setState({
      page : this.state.page - 1,
      articles : parseData.articles
    });
  }
   handleNextClick= async ()=>{
    if( this.state.page + 1 > this.state.totalPage){}else{
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dc525278bd27404d815bb0708ee6d305&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log("next");
    this.setState({
      page : this.state.page + 1,
      articles : parseData.articles
    });
    }
  }
  render() {
    return (
      <>
      <div className="sticky-container">
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
        </div>
        <div className="container my-3">
          <div className="text-center">
          <h2>NewsMonkey - Top headlines</h2>
          </div>
          <div className="row">
            {this.state.articles.map((element) => (
              <div className="col-md-3" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description ? element.description.slice(0, 88) : ''}
                  imageUrl={element.urlToImage ? element.urlToImage : 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
                  newsUrl={element.url}
                />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}
