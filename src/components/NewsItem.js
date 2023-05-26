import React from "react";

const NewsItem = (props) => {
 
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    // we are destructuring and pulling out our title and description from the props input to the newsItem 
    return (
      <div>
        <div className="card my-3" >
          <img src={imageUrl} className="card-img-top" alt="..."style={{height:"12em",overflow: "hidden"}}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <span className="badge rounded-pill bg-success">{source}</span>
            <p className="card-text"> {description}...</p>
            <p className="card-text"><small className="text-muted">By {author?author:"-ANONYMOUS-"}{date?(" on "+(new Date(date).toGMTString())):""}</small></p>
            <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}
export default NewsItem