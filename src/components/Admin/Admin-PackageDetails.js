import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-verifications.css';
import Modal from 'react-modal';
import Card from '@mui/material/Card';

const PackageDetails = ({ isOpen, onClose, packageDet }) => {

    const [packageDetails, setPackageDetails] = useState(null);
    const [doctorConsultaionList, setdoctorConsultaionList] = useState([]);
    const [labConsultaionList, setlabConsultaionList] = useState([]);
    useEffect(() => {
        if (packageDet) {
            // debugger;
            setPackageDetails(packageDet);
            if (packageDet?.doctorConsultation.length > 0) {
                setdoctorConsultaionList(packageDet?.doctorConsultation)
            }
            if (packageDet?.labConsultations.length > 0) {
                setlabConsultaionList(packageDet?.labConsultations)
            }

            console.log("packageDetails", packageDetails);
        }
    }, [packageDet]);
    return (
        <div className='row'>
            {packageDetails ? (

                <Modal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    contentLabel="Lab Details"
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
                        },
                        content: {
                            width: '50%', // Width of the modal content
                            minHeight: '500px', // Height of the modal content
                            maxHeight: '600px',
                            margin: '25px auto', // Center the modal
                        },
                    }}
                >
                    <div id="12041" className="row space">
                        <div className="addpackagemaindiv">
                            <div className="sidelbl ps-3 mt-2">Doctor consultations</div>
                            <div id="13743" className="table-header">
                                <div id="13744" className="row">
                                    <div className="col-4 table-header-text" id="table-patients"> SPECIALITY</div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 table-header-text" id="table-patients"> FREQUENCY</div>
                                </div>
                            </div>
                            {
                                doctorConsultaionList.map((pack, index) => (
                                    <div key={index} className="table-data card-body">
                                        <div id="13744" className="row">
                                            <div className="col-4  table-data-text"> {pack.speciality}</div>
                                            <div className="col-2  table-data-text">{pack.frequency}</div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="sidelbl ps-3 mt-2">Lab consultations</div>
                            <div id="13743" className="table-header mt-0">
                                <div id="13744" className="row">
                                    <div className="col-4  table-header-text" id="table-patients"> TEST NAME</div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 table-header-text" id="table-patients"> REPEAT COUNT</div>
                                </div>
                            </div>
                            {
                                labConsultaionList.map((pack, index) => (
                                    <div key={index} className="table-data card-body">
                                        <div id="13744" className="row">
                                            <div className="col-4  table-data-text"> {pack.testName}</div>
                                            <div className="col-2  table-data-text">{pack.repeatCount}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </Modal>
            ) : ('')
            }
        </div>
    )
}

export default PackageDetails;