import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness-goals.css';
import { addNewGoalsAPI, getTrackersAPI } from '../../services/adminportalService';
import Modal from 'react-modal';
import Select from 'react-select';

const AddNewGoal = ({ isOpen, onClose }) => {
    const [goalName, setGoalName] = useState('');
    const [trackerselectedlist, settrackerselectedlist] = useState([]);
    const [trackerslist, setTrackerslist] = useState([]);
    useEffect(() => {
        getTrackers();
    }, []);
    const getTrackers = async () => {
        const tracketListRes = await getTrackersAPI('', 0, 100);
        console.log("tracketListRes", JSON.stringify(tracketListRes.result));
        tracketListRes.result.forEach(element => {
            element.value = element._id;
            element.label = element.trackerName
        });
        setTrackerslist(tracketListRes.result);
    }

    const handleSelectChange = (selectedOptions) => {
        settrackerselectedlist(selectedOptions);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setGoalName(value);
    }
    const addNewGoal = async () => {
        if (!goalName) {
            return;
        }
        const selectedTrackers = [];
        trackerselectedlist.forEach((el, index) => {
            let obj = {
                _id: el._id,
                trackerName: el.trackerName
            };
            selectedTrackers.push(obj);
        })
        let reqobj = {
            "id": '',
            "goalName": goalName,
            "trackers": selectedTrackers

        };
        // console.log("reqobj", reqobj)
        // return;
        const addGoalsRes = await addNewGoalsAPI(reqobj);
        console.log("addGoalsRes", addGoalsRes);
        if (addGoalsRes) {
            onClose();
        }
    }
    const closeDialog = () => {
        onClose();
    }
    return (
        <div className="goals" id="5">
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
                    },
                    content: {
                        width: '60%', // Width of the modal content
                        minHeight: '200px', // Height of the modal content
                        height: '300px',
                        margin: '25px auto', // Center the modal
                    },
                }}
            >
                <div className="goalsformdiv p-2">
                    <div id="pt-Coupons">Add Goal</div>
                </div>
                <div className="form-goal">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-6 px-2">
                            <div className="material-textfield matinput_div">
                                <label id="10677" className="matLabel">Goal Name<span className="required">*</span></label>
                                <input type="text" className="form-control form-control-sm matInput"
                                    name='goalName' value={goalName} placeholder="Goal Name"
                                    onChange={handleChange}
                                    required />
                            </div>

                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 px-2'>
                            <div className="material-textfield matinput_div">
                                <label className="matLabel">Trackers<span className="required">*</span></label>
                                <Select
                                    className="multi-select-dropdown"
                                    options={trackerslist}
                                    isMulti
                                    value={trackerselectedlist}
                                    onChange={handleSelectChange}
                                />
                            </div>
                        </div>

                    </div>
                    <div id="9834" className="flex-container d-flex justify-content-end py-2 mt-4">
                        <button id="9835" className="save-btn-sdnd provider-submit-btn"
                            onClick={addNewGoal}>Submit</button>
                        <button className="cancelbtn mx-2" id="24" onClick={closeDialog}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddNewGoal;