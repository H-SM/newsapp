import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Top headlines</h2>
        <div className="row">
          <div class="col-md-3">
          <NewsItem title="my title... " description="the description ..."/>
          </div>
          <div class="col-md-3">
          <NewsItem title="my title... " description="the description ..."/>
          </div>
          <div class="col-md-3">
          <NewsItem title="my title... " description="the description ..."/>
          </div>
        </div>
        <div className="row">
        <div className="col-md-3">
        <NewsItem title="my title... " description="the description ..."/>
        </div>
        <div className="col-md-3">
        <NewsItem title="my title... " description="the description ..."/>
        </div>
        <div className="col-md-3">
        <NewsItem title="my title... " description="the description ..."/>
        </div>
        </div>
      </div>
    )
  }
}
