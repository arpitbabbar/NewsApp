import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setarticles] = useState([]);
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);
    // document.title = `${capitalizeFirstLetter(this.props.category)} - NewsMonkey`


    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Using Class Based components

    // constructor(props) {
    //     super(props);
    //     // console.log("Constructer Here");
    //     this.state = {
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResults: 0,
    //         hasMore: true

    //     }
    //     document.title = `${capitalizeFirstLetter(this.props.category)} - NewsMonkey`
    // }
    const updateNews = async () => {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        this.props.setProgress(100);
    }

    const componentDidMount = async () => {

        //using without updateNewsMethod

        // for default page sise of 20
        // let url = "https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=1&pagesize=20";
        // taking page size from props
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=1&pagesize=${this.props.pageSize}`;
        // //this.state({ loading: true });
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // //this.state({ loading: false });
        // this.setState({ articles: parsedData.articles, totalresults: parsedData.totalResults, loading: false });



        // console.log(this.state.page);
        this.updateNews();

    }

    handleNextClick = async () => {

        //using without updateNewsMethod

        // if (!(this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize))) {
        //     //let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=${this.state.page + 1}&pagesize=20`;
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     console.log(parsedData);
        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1,
        //         loading: false
        //     })
        // }

        //Using call back function insetstate (but page is not correct)
        // this.setState({ page: this.state.page + 1 }, () => { this.updateNews() });

        //using await proper state maintained
        await this.setState({ page: this.state.page + 1 });
        await this.updateNews();
        console.log(this.state.page);


    }

    handlePrevClick = async () => {

        //using without updateNewsMethod

        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=${this.state.page - 1}&pagesize=20`;
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=1&pagesize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // console.log(parsedData);
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // })
        // this.setState({ page: this.state.page - 1 }, () => { this.updateNews() });

        //using await
        await this.setState({ page: this.state.page - 1 });
        await this.updateNews();
        //console.log(this.state.page);


    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults });
        console.log(this.state.articles.length);
        console.log(this.state.totalResults);
        if (this.state.articles.length === this.state.totalResults) {
            this.setState({ hasMore: false });
            return;
        }

    };
    return (
        <>
            <h2 className="text-center" style={{ margin: "35px 0px" }}>News Monkey - Top {capitalizeFirstLetter(this.props.category)} Headlines</h2>
            {this.state.loading && <Spinner />}

            <div>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={(this.state.totalResults > this.state.articles.length) ? <Spinner /> : "That's All For Today"}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    <div className="container">
                        <div className="row">
                            {/* WHile WORKING WITH LOADING */}
                            {/* {!(this.state.loading) && this.state.articles.map((element) => {
                        return (<div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div> */}

                            {/* wORKING WITH INFINITE SCROLL */}
                            {this.state.articles.map((element) => {
                                return (<div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                                )
                            })}


                        </div>
                    </div>
                </InfiniteScroll>
            </div>


            {/* USING NEXT AND PREV BUTTONS */}
            {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
                </div> */}


        </>
    )

}

News.defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general"
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;