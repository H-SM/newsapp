import React, { Component } from "react";

export default class NewsItem extends Component {
  render(props) {
    let {title, description} = this.props;
    // we are destructuring and pulling out our title and description from the props input to the newsItem 
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
          <img src="https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/18446/production/_129789399_microsoftteams-image-4.png" className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href="/newsDetails" className="btn btn-primary">
              Go somewhere
            </a>
          </div>
        </div>
      </div>
    );
  }
}
