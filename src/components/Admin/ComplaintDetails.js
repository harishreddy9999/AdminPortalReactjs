import React, { useState, useEffect } from 'react';
import '../../App.css';
import '../../Styles/ComplaintDetails.css';
import Modal from 'react-modal';
import moment from 'moment';


const ComplaintDetails = ({ isOpen, onClose, complaint }) => {

    const [complaintDetails, setComplaintDetails] = useState(null);
    const [issueDescription, setIssueDescription] = useState('');
    useEffect(() => {
        if (complaint) {

            setComplaintDetails(complaint);
            setIssueDescription(complaint.issueDescription)
            console.log("complaintDetails", complaintDetails);
        }
    }, [complaint]);


    return (

        <div className='row'>
            {
                complaintDetails ? (
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={onClose}
                        contentLabel="Lab Details"
                        style={{
                            overlay: {
                                backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
                            },
                            content: {
                                width: '40%', // Width of the modal content
                                minHeight: '400px', // Height of the modal content
                                maxHeight: '600px',
                                margin: '25px auto', // Center the modal
                                overflow: 'hidden'
                            },
                        }}
                    >
                        <div className="doctormain" id="doctormain" >
                            <div className="complaintDetailHeading screen-heading" id="doctorcomplaintDetailHeading">Issue from Docisn
                            </div>
                            <div className="complaintDeailDatediv d-flex" id="doctorcomplaintDeailDatediv">
                                <div className="lbl pat-details-side-heading" id="doctorcomplaintDeailDatelbl">Date : </div>
                                <div className="complaintDeailDate" id="doctorcomplaintDeailDate">{moment(complaintDetails.createdOn).format('DD/MM/YYYY')}</div>
                            </div>
                            <div className="raisedByDetaildiv d-flex" id="doctorraisedByDetaildiv">
                                <div className="lbl pat-details-side-heading" id="docappraisedByDetaillbl">RaisedBy : </div>
                                <div className="raisedByDetail" id="docappraisedByDetail">{complaintDetails.providerName}</div>
                            </div>
                            <div className="subjectDetaildiv d-flex" id="docappsubjectDetaildiv">
                                <div className="lbl pat-details-side-heading" id="docappsubjectDetaillbl">Subject : </div>
                                <div className="subjectDetail" id="docappsubjectDetail">{complaintDetails.title}</div>

                            </div>
                            <div className="lbl pat-details-side-heading" id="docappdescrptionlbl">Description :</div>
                            <textarea className="descrptiontext form-control" id="docappdescrptiontext"
                                type="text"
                                value={issueDescription}
                                onChange={(e) => setIssueDescription(e.target.value)}
                                required
                                readOnly>

                            </textarea>
                            {/* <div className="lbl pt-3" id="docappattachmentslbl">Attchments : </div> */}

                            <div className="d-flex justify-content-center">
                                <button className="canceldismiss provider-cancel-btn me-1 mt-4" id="no">Dismiss</button>
                            </div>
                        </div>
                    </Modal>
                ) : ''
            }

        </div>
    )
}

export default ComplaintDetails;