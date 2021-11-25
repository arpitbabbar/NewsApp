import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, desc, imageUrl, newsUrl } = this.props;
        return (
            <div className="container d-flex justify-content-evenly my-3">
                <div className="card mx-2" style={{ width: "18rem" }}>
                    <img src={!imageUrl ? "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmV3c3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{desc}...</p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
