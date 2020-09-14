import React, { useState } from 'react'
import Axios from 'axios';
const EditMessage = (props) => {
    const { match: { params } } = props
    console.log(props)
    const [message, setMessage] = useState('')
    const editMessage = async () => {
        const tokens = localStorage.getItem('user');
        const token1 = JSON.parse(tokens).token;
        const result = await Axios.patch('http://localhost:8000/message/${params.id}', { "message": message }, { headers: { 'authorization': `Bearer ${token1}` } })
        console.log(result)
    }
    return (
        <div className="container">
            <div className="card gedf-card" style={{ justifyContent: "space-between", margin: '40px', marginLeft: 'auto', marginRight: 'auto', width: '400px', height: '500' }}>
                <form onSubmit={(e) => { e.preventDefault(); editMessage() }}>
                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab">
                                <div className="form-group">
                                    <label className="sr-only" >post</label>
                                    <textarea className="form-control" id="message" rows="3" placeholder="What are you thinking?" value={params.message} onChange={(e) => { setMessage(e.target.value); }}></textarea>
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