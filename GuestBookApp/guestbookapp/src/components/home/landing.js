import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
const Home = () => {
    return (
        <div className="row" style={{display:"inline-grid"}}>
            <div className="card" style={{ width: "18rem",display:"inline-block" }}>
                <img className="card-img-top" src="https://cdn.shopify.com/s/files/1/1221/1094/products/Black_Guest_Book_large.png?v=1560266158" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Welcome to our Guest Book Please if you want to leave us a message login first</p>
                    <a className="btn btn-primary"><Link to="/login">Login</Link></a>
                </div>
            </div>
            <div className="card" style={{ width: "18rem",display:"inline-block" }}>
                <img className="card-img-top" src="https://cdn.rosemood.co.uk/media/Cms/2020-01-08/17582636/cache/wedding-guest-book-messages-rosemood.jpg" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Welcome to our Guest Book Please if you want to leave us a message login first</p>
                    <a className="btn btn-primary"><Link to="/login">Login</Link></a>
                </div>
            </div>
            <div className="card" style={{ width: "18rem",display:"inline-block" }}>
                <img className="card-img-top" src="https://images-na.ssl-images-amazon.com/images/I/519or5TjG-L._AC_SY355_.jpg" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Welcome to our Guest Book Please if you want to leave us a message login first</p>
                    <a className="btn btn-primary"><Link to="/login">Login</Link></a>
                </div>
            </div>
        </div>
    )
};
export default Home;