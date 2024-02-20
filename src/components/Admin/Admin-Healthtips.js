import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../Styles/Admin-Healthtips.css';
import { getAlltipsAPI, postHealthTipAPI, createAdminHealthTipsAPI } from '../../services/adminportalService';
import moment from 'moment';

const HealthTips = () => {

    const [allTipsArray, setallTipsArray] = useState([]);
    const [createTipForm, setCreateTipForm] = useState({
        title: '',
        description: ''
    });
    useEffect(() => {
        getAllTips();
    }, []);

    const getAllTips = async () => {

        const allTips = await getAlltipsAPI();
        console.log("allTips", allTips);
        setallTipsArray(allTips);
    }

    const post = async (id) => {
        console.log("id", id)
        let reqobj = {
            tipID: id
        };
        const postHealthTipRes = await postHealthTipAPI(reqobj);
        console.log("postHealthTipRes", postHealthTipRes);
        if (postHealthTipRes) {
            getAllTips();
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // debugger;
        setCreateTipForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const submitTip = async () => {
        console.log("createTipForm", createTipForm)
        let reqobj = {
            tipTitle: createTipForm.title,
            tipDescription: createTipForm.description
        }
        // return;
        const createAdminHealthTipsRes = await createAdminHealthTipsAPI(reqobj);
        console.log("createAdminHealthTipsRes", createAdminHealthTipsRes);
        if (createAdminHealthTipsRes) {
            getAllTips();
            setCreateTipForm({
                title: '',
                description: ''
            });
        }
    }
    return (
        <div className='health-tips-card'>
            <div className='row'>
                <div className='col-5'>
                    <div className='health-tips-card-header'>
                        <p className='tips-heading'>Create new tip</p>
                    </div>
                    <div className='create-health-tips-card-content'>
                        <div className='row'>
                            <label className='create-tip-lbl'>Title</label>
                            <input type="text"
                                className="form-control"
                                name="title"
                                value={createTipForm.title}
                                onChange={handleChange}
                                required />
                        </div>
                        <div className='row'>
                            <label className='create-tip-lbl'>Description</label>
                            <textarea type="text"
                                className="form-control"
                                name="description"
                                value={createTipForm.description}
                                onChange={handleChange}
                                required ></textarea>
                        </div>
                        <div className='d-flex justify-content-end mt-4'>
                            <button className='create-health-tip-btn' onClick={submitTip}>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='col-7 all-tips'>
                    <div className='health-tips-card-header'>
                        <p className='tips-heading'>All Tips</p>
                    </div>
                    <div className='health-tips-card-content'>
                        <div className='row'>
                            <div className="col-2 tableheader" >Title</div>
                            <div className="col-3 tableheader">Description</div>
                            <div className="tableheader col-2" >Created Date</div>
                            <div className="col-2 tableheader">Created By</div>
                            <div className="col-3 tableheader">Status</div>
                        </div>
                        {allTipsArray.map((tip, index) => (
                            <div className='row tip-card' key={index}>
                                <div className='col-2 titledata'>{tip.tipTitle}</div>
                                <div className='col-3 titledata'>{tip.tipDescription}</div>
                                <div className='col-2 titledata'>{moment(new Date(tip.createdOn)).format("DD-MM-YYYY")}</div>
                                <div className='col-2 titledata'>{tip.providerName}</div>
                                <div className='col-3 titledata d-flex justify-content-between'>
                                    {
                                        tip.status === 'TIP_INITIATED' ? (
                                            <div className='statusdatapublished'>{tip.status === 'TIP_PUBLISHED' ? 'Posted' : 'To be Posted'}</div>
                                        ) : (
                                            <div className='statusdatatobepublished'>{tip.status === 'TIP_PUBLISHED' ? 'Posted' : 'To be Posted'}</div>
                                        )
                                    }
                                    <button className="post-btn" id="postbtn" onClick={() => post(tip._id)}>Post</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HealthTips;