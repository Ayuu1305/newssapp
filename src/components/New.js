import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class New extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
    }

  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Corrected property name
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title=`${this.capitalize(this.props.category)} - NewsMoneky`
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=af386c97b76b45ac9275ae89176868fb&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedata = await data.json();
    this.props.setProgress(70);
    
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
   this.setState({page:this.state.page+1})
   const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=af386c97b76b45ac9275ae89176868fb&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      page: this.state.page - 1,
      articles: this.state.articles.concat(parsedata.articles),
      loading: false,
      
    });

  };

  render() {
    return (
      <>
        <h1 className="text-center">NewsMoneky - Top {this.capitalize(this.props.category)} Headline   </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >

        <div className="container">          

        <div className="row">
          {
            this.state.articles.map(
              (
                element // Use parentheses instead of curly braces
              ) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ""
                    }
                    imgurl={element.urlToImage}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              )
            )}
        </div>
        </div>
        </InfiniteScroll>
        
      </>
    );
  }
}

export default New;
