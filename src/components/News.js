import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        console.log("Constructer Here");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        // for default page sise of 20
        // let url = "https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7eafdd48b73b406badd7b3c84bb53679&page=1&pagesize=20";
        // taking page size from props
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7eafdd48b73b406badd7b3c84bb53679&page=1&pagesize=${this.props.pageSize}`;
        //this.state({ loading: true });
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        //this.state({ loading: false });
        this.setState({ articles: parsedData.articles, totalresults: parsedData.totalResults, loading: false });
    }

    handleNextClick = async () => {

        if (!(this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize))) {
            //let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7eafdd48b73b406badd7b3c84bb53679&page=${this.state.page + 1}&pagesize=20`;
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7eafdd48b73b406badd7b3c84bb53679&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            console.log(parsedData);
            this.setState({
                articles: parsedData.articles,
                page: this.state.page + 1,
                loading: false
            })
        }
    }

    handlePrevClick = async () => {


        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=7eafdd48b73b406badd7b3c84bb53679&page=${this.state.page - 1}&pagesize=20`;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7eafdd48b73b406badd7b3c84bb53679&page=1&pagesize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading: false
        })

    }
    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{ margin: "35px 0px" }}>News Monkey - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!(this.state.loading) && this.state.articles.map((element) => {
                        return (<div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 45) : ""} desc={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>

                        )
                    })}


                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>


            </div>
        )
    }
}
