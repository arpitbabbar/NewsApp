import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, desc, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div className="container d-flex justify-content-evenly my-3">

                <div className="card mx-2" style={{ width: "18rem" }}>
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{ zIndex: '1', left: '85%' }}>
                        {source}
                    </span>
                    <img src={!imageUrl ? "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmV3c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{desc}...</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
                    </div>
                </div>
            </div>
        )
    }
}
