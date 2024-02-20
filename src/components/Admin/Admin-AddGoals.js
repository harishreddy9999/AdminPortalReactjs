import React, { useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness-goals.css';
import { addNewGoalsAPI } from '../../services/adminportalService';
import Modal from 'react-modal';

const AddNewGoal = ({ isOpen, onClose }) => {
    const [goalName, setGoalName] = useState('');
    const [trackerselectedlist, settrackerselectedlist] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setGoalName(value);
    }
    const addNewTracker = async () => {
        if (!goalName) {
            return;
        }
        let reqobj = {
            "id": '',
            "goalName": goalName,
            "trackers": trackerselectedlist

        };
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
                        width: '50%', // Width of the modal content
                        minHeight: '200px', // Height of the modal content
                        height: '250px',
                        margin: '25px auto', // Center the modal
                    },
                }}
            >
                <div className="goalsformdiv p-2">
                    <div id="pt-Coupons">Add Goal</div>
                </div>
                <div className="form-goal">
                    <div className="row">
                        <div className="col-4 col-lg-12 col-md-6 col-sm-12 pt-2">
                            <div className="material-textfield matinput_div">
                                <label id="10677" className="matLabel">Goal Name<span className="required">*</span></label>
                                <input type="text" className="form-control form-control-sm matInput"
                                    name='goalName' value={goalName} placeholder="Goal Name"
                                    onChange={handleChange}
                                    required />
                            </div>

                        </div>


                    </div>
                    <div id="9834" className="flex-container d-flex justify-content-end py-2 mt-4">
                        <button id="9835" className="save-btn-sdnd provider-submit-btn"
                            onClick={addNewTracker}>Submit</button>
                        <button className="cancelbtn mx-2" id="24" onClick={closeDialog}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AddNewGoal;