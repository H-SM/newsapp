import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

  constructor(){
    super();
    this.state ={
      articles: [],
      loading: false
    }
  }

  async componentDidMount(){
    // this component will run after render method runs - this is also called cdm 
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=dc525278bd27404d815bb0708ee6d305";
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({articles : parseData.articles});

  }
  render() {
    return (
      <>
      <div className="container my-3">
        <h2>NewsMonkey - Top headlines</h2>
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-3" key={element.url}>
            <NewsItem  title={element.title} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"} newsUrl={element.url}/>
            </div>;
          })}
          {/* {element.title?element.title.slice(0,45):""} */}
          </div>
        </div>
      </>
    )
  }
}
