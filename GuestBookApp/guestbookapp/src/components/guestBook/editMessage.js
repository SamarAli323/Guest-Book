import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
function EditMessage(props) {
    const [message, setMessage] = useState('')
    const [button ,setButton] = useState('')
    const messageId = props.location.pathname.split('/')[2];
    const messagePart = props.location.pathname.split('/')[3];
    const sendMessages = async () => {
        const tokens = localStorage.getItem('user');
        const token = JSON.parse(tokens).token;
        const result = await Axios.patch(`http://localhost:8000/message/${messageId}`, { "message": message }, { headers: { 'authorization': `Bearer ${token}` } })
        console.log(result)
        if(result.data){
            setButton(<Redirect to="/GuestBook"/>)
        }
    };
    useEffect(()=>{
        setMessage(messagePart)
    },[])


    return (
        <div className="container">
        {button}
            <div className="card gedf-card" style={{ justifyContent: "space-between", margin: '40px', marginLeft: 'auto', marginRight: 'auto', width: '400px', height: '500' }}>
                <form onSubmit={(e) => { e.preventDefault(); sendMessages()}}>
                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div className="form-group">
                                    <label className="sr-only" >post</label>
                                    <textarea className="form-control" id="message" rows="3" placeholder="What are you thinking?" value={message} onChange={(e) => {setMessage(e.target.value);console.log(message)} }></textarea>
                                </div>

                            </div>
                        </div>
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary">share</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};
export default EditMessage;