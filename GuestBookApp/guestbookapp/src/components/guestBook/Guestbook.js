import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Reply from './reply'
import { Link } from 'react-router-dom';
function GuestBook() {
    const [message, setMessage] = useState('');
    const [reply, setReply] = useState('');
    const [mesageReply, setMessageReply] = useState([]);
    const [clientFirstName, setClientFirstName] = useState('');
    const [clientLastName, setClientLastName] = useState('');
    const [clientId, setClientId] = useState('')
    const [token, setToken] = useState('')
    const [allMssages, setAllMessages] = useState([])
    useEffect(() => {
        getAllMessages();
    });

    const delteMessage = async (messageId) => {
        console.log(token)
        const done = await axios.delete(`http://localhost:8000/message/${messageId}`, { headers: { 'authorization': `Bearer ${token}` } })
        console.log(done)
    }
    const addMessage = async () => {
        console.log(clientId)
        const done = await axios.post('http://localhost:8000/message', { 'userId': clientId, 'message': message }, { headers: { 'authorization': `Bearer ${token}` } })
        console.log(done)
    }

    const getAllMessages = async () => {
        const tokens = localStorage.getItem('user');
        const token1 = JSON.parse(tokens).token;
        const user = JSON.parse(tokens).user
        setToken(token1)
        setClientId(user._id)
        setClientFirstName(user.firstName)
        setClientLastName(user.lastname)
        const allMssages = await axios.get('http://localhost:8000/message', { headers: { 'authorization': `Bearer ${token1}` } })
        setAllMessages(allMssages.data)
        console.log(allMssages.data)
    }
    const Guestbook = allMssages.map(item => {
        return (
            <div key={item._id} className="card gedf-card" style={{ justifyContent: "space-between", margin: '40px', marginLeft: 'auto', marginRight: 'auto', width: '300px', height: '500' }}>
                <div class="card" style={{ width: "20rem" }}>
                    <div class="card-body">
                        <h5 class="card-title">{clientFirstName}{clientLastName}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{item.date.split('T')[0]}</h6>
                        {item.userId === clientId ? <Link class="card-text" to={`/editMessage/${item._id}/${item.message}`}>{item.message}</Link> : <p class="card-text">{item.message}</p>}
                        <form>
                            <a onClick={() => { if (item.userId === clientId) { delteMessage(item._id);} }} class="card-link">delete</a>
                            <Link class="card-link" to={`/reply/${item._id}`}> reply </Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="container">
                <div className="card gedf-card" style={{ justifyContent: "space-between", margin: '40px', marginLeft: 'auto', marginRight: 'auto', width: '400px', height: '500' }}>
                    <form onSubmit={(e) => { e.preventDefault(); addMessage(); }}>
                        <div className="card-body">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                    <div className="form-group">
                                        <label className="sr-only" >post</label>
                                        <textarea className="form-control" id="message" rows="3" placeholder="What are you thinking?" onChange={(e) => { setMessage(e.target.value); }}></textarea>
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
            <div className="column">
                {Guestbook}
            </div>
        </div>
    )
}
export default GuestBook;