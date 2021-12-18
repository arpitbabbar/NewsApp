import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setarticles] = useState([]);
    // eslint-disable-next-line
    const [loading, setloading] = useState(true);
    const [page, setpage] = useState(1);
    const [totalResults, settotalResults] = useState(0);
    const [hasMore, sethasMore] = useState(true);



    const capitalizeFirstLetter = (string) => {
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
    //     document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    // }
    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setarticles(parsedData.articles);
        settotalResults(parsedData.totalResults);
        console.log(parsedData);
        console.log(articles);
        console.log(totalResults);
        setloading(false);
        //  this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
        props.setProgress(100);
    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
        updateNews();
        // eslint-disable-next-line
    }, [])

    // const componentDidMount = async () => {

    //     //using without updateNewsMethod

    //     // for default page sise of 20
    //     // let url = "https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=1&pagesize=20";
    //     // taking page size from props
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=1&pagesize=${props.pageSize}`;
    //     // //this.state({ loading: true });
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // //this.state({ loading: false });
    //     // this.setState({ articles: parsedData.articles, totalresults: parsedData.totalResults, loading: false });



    //     // console.log(this.state.page);
    //     this.updateNews();

    // }

    // const handleNextClick = async () => {

    //     //using without updateNewsMethod

    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalresults / props.pageSize))) {
    //     //     //let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=${this.state.page + 1}&pagesize=20`;
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=${this.state.page + 1}&pagesize=${props.pageSize}`;
    //     //     this.setState({ loading: true });
    //     //     let data = await fetch(url);
    //     //     let parsedData = await data.json();
    //     //     console.log(parsedData);
    //     //     this.setState({
    //     //         articles: parsedData.articles,
    //     //         page: this.state.page + 1,
    //     //         loading: false
    //     //     })
    //     // }

    //     //Using call back function insetstate (but page is not correct)
    //     // this.setState({ page: this.state.page + 1 }, () => { this.updateNews() });

    //     //using await proper state maintained
    //     await setpage(page + 1);
    //     await updateNews();
    //     //console.log(this.state.page);


    // }

    // const handlePrevClick = async () => {

    //     //using without updateNewsMethod

    //     // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=${this.state.page - 1}&pagesize=20`;
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5a4b1eb3ee834820854543ba15e03422&page=1&pagesize=${props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parsedData = await data.json();
    //     // console.log(parsedData);
    //     // this.setState({
    //     //     articles: parsedData.articles,
    //     //     page: this.state.page - 1,
    //     //     loading: false
    //     // })
    //     // this.setState({ page: this.state.page - 1 }, () => { this.updateNews() });

    //     //using await
    //     await setpage(page - 1);
    //     await updateNews();
    //     //console.log(this.state.page);


    // }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
        setpage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        //console.log(parsedData);
        setarticles(articles.concat(parsedData.articles));
        settotalResults(parsedData.totalResults);
        setloading(false);
        // this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults });
        // console.log(this.state.articles.length);
        // console.log(this.state.totalResults);
        // console.log(articles.length);
        if ((articles.length + props.pageSize) === totalResults) {
            sethasMore(false);
            return;
        }

    };
    return (
        <>
            <h2 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }} >News Monkey - Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {/* {loading && <Spinner />} */}

            <div>
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Spinner />}
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
                            {articles.map((element) => {
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
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalresults / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
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