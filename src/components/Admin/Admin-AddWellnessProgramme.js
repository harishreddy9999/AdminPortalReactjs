import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness.css';
import Modal from 'react-modal';
import { getSpecialitiesAPI } from '../../services/userPatientsSrv';
import Select from 'react-select';
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { updateWellnessProgramsAPI } from '../../services/adminportalService';

const CreateWellnessProgramme = ({ isOpen, onClose }) => {

    const [specialitiesList, setSpecialitiesList] = useState([]);
    const [programmeName, setProgrammeName] = useState('');
    const [selectedSpecialities, setSelectedSpecialities] = useState([]);
    const [doctorEligibility, setDoctorEligibility] = useState('');
    useEffect(() => {
        getSpecialities();
    }, [])
    var modules = {
        toolbar: [
            [{ size: ["small", false, "large", "huge"] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
                { align: [] }
            ],
            [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
        ]
    };
    var formats = [
        "header", "height", "bold", "italic",
        "underline", "strike", "blockquote",
        "list", "color", "bullet", "indent",
        "link", "image", "align", "size",
    ];
    const handleProcedureContentChange = (content) => {
        console.log("content---->", content);
        setDoctorEligibility(content)
    };
    const getSpecialities = async () => {
        const apiRes = await getSpecialitiesAPI();
        // console.log("apiRes", JSON.stringify(apiRes))
        const list = apiRes.map((item, index) => {
            return {
                label: item.imageName,
                value: index // You can set the value to the index or any unique identifier
            };
        });
        setSpecialitiesList(list)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setProgrammeName(value);
    }

    const handleSelectChange = (selectedOptions) => {
        console.log("selectedOptions", selectedOptions)
        setSelectedSpecialities(selectedOptions);
    };

    const closeDialog = () => {
        onClose();
    }

    const addNewProgramme = async () => {

        console.log("selectedSpecialities", selectedSpecialities);
        const labelsArray = selectedSpecialities.map(item => item.label);
        const doctorEligibilityStr = doctorEligibility.replace(/class="[^"]*"/g, '');
        console.log(labelsArray, doctorEligibilityStr);
        let reqObj = {
            id: "",
            programName: programmeName,
            specialization: labelsArray,
            doctorEligibilityCriteria: doctorEligibilityStr
        }
        console.log("reqObj", reqObj);
        // return;
        const apiRes = await updateWellnessProgramsAPI(reqObj);
        console.log("apiRes", apiRes);
        if (apiRes.message === "success") {
            onClose();
        }
    }
    return (
        <div className='row'>
            <Modal
                isOpen={isOpen}
                onRequestClose={onClose}
                contentLabel="Lab Details"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
                    },
                    content: {
                        minWidth: '50%', // Width of the modal content
                        maxWidth: '60%',
                        minHeight: '300px', // Height of the modal content
                        maxHeight: '500px',
                        margin: '25px auto', // Center the modal
                        overflow: 'hidden',
                        padding: '0',
                        overflowY: 'scroll'
                    },
                }}
            >
                <div className="packageformdiv p-2">
                    <div id="pt-Coupons" className="addpackage">Add Programme</div>
                </div>
                <div className='row border-1 formgroup-container'>

                    <div className='col-lg-6 col-md-6 px-2'>
                        <label className='add-package-lbl'>Programme Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="programmeName"
                            value={programmeName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='col-lg-6 col-md-6 px-2'>
                        <label className='add-package-lbl'>Specialization</label>
                        <Select
                            className="multi-select-dropdown"
                            name="specialization"
                            options={specialitiesList}
                            isMulti
                            value={selectedSpecialities}
                            onChange={handleSelectChange}
                        />
                    </div>
                    <div className='col-12 my-3 px-2'>
                        <label className='add-package-lbl'>Eligibility Criteria for Doctors</label>
                        <div style={{ justifyContent: "center" }}>
                            <ReactQuill
                                theme="snow"
                                modules={modules}
                                formats={formats}
                                placeholder="write your content ...."
                                onChange={handleProcedureContentChange}
                                style={{ height: "170px" }}
                            >
                            </ReactQuill>
                        </div>
                    </div>
                </div>
                <div id="9834" className="flex-container d-flex justify-content-end py-2 mt-4">
                    <button id="9835" className="save-btn-sdnd provider-submit-btn"
                        onClick={addNewProgramme}>Submit</button>
                    <button className="cancelbtn mx-2" id="24" onClick={closeDialog}>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}

export default CreateWellnessProgramme;