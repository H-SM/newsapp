import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 10,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=
dc525278bd27404d815bb0708ee6d305&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      loading: false,
      totalResults: parseData.totalResults,
      totalPage: Math.ceil(this.state.totalResults / this.props.pageSize),
    });
  }

  async componentDidMount() {
    // this component will run after render method runs - this is also called cdm
    this.updateNews();
  }
  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1 });
    //the await here solves the bug for 1st page to not load < bc of api load, idk ... >
    this.updateNews();
  };
  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
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
            <p>
              Page - {this.state.page} / {this.state.totalPage}
            </p>
            <button
              type="button"
              disabled={this.state.page + 1 > this.state.totalPage}
              className="btn btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
        <div className="container my-3">
          <div className="text-center">
            <h2>NewsMonkey - Top headlines</h2>
            {this.state.loading && <Spinner />}
          </div>
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => (
                <div className="col-md-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
          </div>
        </div>
      </>
    );
  }
}
