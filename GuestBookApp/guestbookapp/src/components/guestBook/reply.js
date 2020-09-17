import React from 'react'

const Reply = (props)=>{
    console.log(props);
    return (
        <div  className="card gedf-card" style={{ justifyContent: "space-between", margin: '40px', marginLeft: 'auto', marginRight: 'auto', width: '300px', height: '500' }}>
            <div class="card" style={{ width: "20rem" }}>
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <h6 class="card-subtitle mb-2 text-muted"></h6>
                </div>
            </div>
        </div>
    )
}
export default Reply;