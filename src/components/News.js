import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
   
constructor(){
  super();
  console.log("Hello i am constructot");
  this.state={
        articles : [],
        loading: false,
        page:1
  }
}
async componentDidMount(){
  let url ="https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=44dafbd80c6842489be2b8c471d9a8fa&page=1";
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({articles: parsedData.articles})
}
 handlePrevClick = async ()=>{
  let url =`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=44dafbd80c6842489be2b8c471d9a8fa&page=${this.state.page- 1}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles
  })

}
 handleNextClick =async ()=>{
  console.log("click me");
  let url =`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=44dafbd80c6842489be2b8c471d9a8fa&page=${this.state.page+1}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  this.setState({
    page: this.state.page + 1,
    articles: parsedData.articles
  })

}

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>NewsMonkey -Top Headlines</h1>
      <div className="row">
      {this.state.articles.map((element)=>{

       return <div className="col-md-4"  key={element.url}>
          <NewsItem title ={element.title?element.title.slice(0,50):""} description ={element.description?element.description.slice(0,80):""} imageUrl ={element.urlToImage} newsUrl ={element.url}/>
        </div>
      })}
        
        
        
      </div>
      <div className="container d-flex justify-content-between my-2">
      <button disabled ={this.state.page<=1} type="button" class="btn btn-dark" onClick={this.handlePrevClick}> &larr;Previous</button>
      <button type="button" class="btn btn-dark" onClick = {this.handleNextClick}>Next &rarr;</button>
      </div>
      
      
      
      </div>
    )
  }
}
