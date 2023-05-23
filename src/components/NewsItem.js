import React, { Component } from "react";

export default class NewsItem extends Component {
 

  render(props) {
    let {title, description, imageUrl, newsUrl} = this.props;
    // we are destructuring and pulling out our title and description from the props input to the newsItem 
    return (
      <div>
        <div className="card my-3" style={{width: "18rem"}}>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href="/newsDetails" className="btn btn-sm btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}
