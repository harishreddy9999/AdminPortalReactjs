import React, { useEffect, useState, useRef } from 'react';
import '../../App.css';
import '../../Styles/Admin-wellness.css';
import Modal from 'react-modal';
import { getWellnessProgramsAPI, getspecalityAPI, savePackageAPI } from '../../services/adminPortalPanelsService';
import { GET_DIABETIC_TIMELINE } from '../../services/GraphqlService';
import { useForm } from 'react-hook-form';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';



const CreateWellnessPackage = ({ isOpen, onClose }) => {
    const [slug, setslugKey] = useState('');
    const programs = useQuery(GET_DIABETIC_TIMELINE, {
        variables: { slug: slug },
    });

    console.log('programs', programs)
    useEffect(() => {
        if (programs.data && !programs.loading) {
            console.log(programs.data, "slugdata");
            settestnameList(programs?.data?.diabeticTimeLineTrackers?.data[0]?.attributes?.timeLineTracker);
            console.log(testnameList, "testnameList")
        }
    }, [programs.loading, programs.data])
    const [programmeList, setprogrammeList] = useState([]);
    const {handleSubmit } = useForm();
    const [packageForm, setPackageFormData] = useState({
        packagename: '',
        programmename: "",
        duration: 12,
        actualprice: '',
        finalprice: '',
        id: ''
    });
    const [doctorConsultationForm, setdoctorConsultationForm] = useState([{ speciality: '', noofconsults: '', frequency: '' }]);
    const [specialityList, setspecialityList] = useState([]);
    const [labConsultationForm, setlabConsultationForm] = useState([{ testname: '', repeatcount: '' }]);
    const [testnameList, settestnameList] = useState([]);
    useEffect(() => {
        // debugger;
        getWellnessProgrammes();
        getspecality();
    }, []);

    const getWellnessProgrammes = async () => {
        const getWellnessProgramsRes = await getWellnessProgramsAPI();
        // console.log(getWellnessProgramsRes, "getWellnessPrograms")
        setprogrammeList(getWellnessProgramsRes);
    }
    const getspecality = async () => {
        const getspecalityRes = await getspecalityAPI();
        // console.log(getspecalityRes, "getspecalityRes")
        setspecialityList(getspecalityRes);
    }
    const getTestList = async (value) => {
        // console.log("value", value)
        setslugKey(value);
        // console.log(programs, "programs")

    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // // debugger;
        setPackageFormData({
            ...packageForm,
            [name]: value
        });
        if (name === "programmename") {
            // debugger
            getTestList(value);
        }
    }
    const handledoctorspecialityChange = (value, index) => {
        // debugger;
        // console.log("doctorConsultationForm", doctorConsultationForm, value, index);
        const newdoctorConsultationForm = [...doctorConsultationForm]; // Create a copy of the testForms array
        newdoctorConsultationForm[index] = { ...newdoctorConsultationForm[index], speciality: value }; // Update the specific testShortCode at the given index
        setdoctorConsultationForm(newdoctorConsultationForm); // Update the state with the new array
        // console.log(doctorConsultationForm);
    }
    const handlenoofconsultsChange = (value, index) => {
        // console.log("doctorConsultationForm", doctorConsultationForm, value, index);
        const newdoctorConsultationForm = [...doctorConsultationForm]; // Create a copy of the testForms array
        // console.log(newdoctorConsultationForm);
        if (value > 0) {
            newdoctorConsultationForm[index] = { ...newdoctorConsultationForm[index], noofconsults: value, frequency: Math.round(packageForm.duration / value) };
            setdoctorConsultationForm(newdoctorConsultationForm);
        }
    };
    const handlefrequencyChange = (value, index) => {
        // console.log("doctorConsultationForm", doctorConsultationForm, value, index);
        const newdoctorConsultationForm = [...doctorConsultationForm]; // Create a copy of the testForms array
        newdoctorConsultationForm[index] = { ...newdoctorConsultationForm[index], frequency: value }; // Update the specific testShortCode at the given index
        setdoctorConsultationForm(newdoctorConsultationForm); // Update the state with the new array
        // console.log(newdoctorConsultationForm);
    };
    const addDoctorConsultationForm = () => {
        // debugger;
        setdoctorConsultationForm([...doctorConsultationForm, { speciality: '', noofconsults: '', frequency: '' }]);

    };
    const addLabConsultationForm = () => {
        // debugger;
        setlabConsultationForm([...labConsultationForm, { testname: '', repeatcount: '' }]);

    };

    const handlelabtestnameChange = (value, index) => {

        // console.log("labConsultationForm", labConsultationForm, value, index);
        const newlabConsultationForm = [...labConsultationForm]; // Create a copy of the testForms array
        newlabConsultationForm[index] = { ...newlabConsultationForm[index], testname: value }; // Update the specific testShortCode at the given index
        setlabConsultationForm(newlabConsultationForm); // Update the state with the new array
        // console.log(newlabConsultationForm);
    };
    const handlelabrepeatcountChange = (value, index) => {

        // console.log("labConsultationForm", labConsultationForm, value, index);
        const newlabConsultationForm = [...labConsultationForm]; // Create a copy of the testForms array
        newlabConsultationForm[index] = { ...newlabConsultationForm[index], repeatcount: value }; // Update the specific testShortCode at the given index
        setlabConsultationForm(newlabConsultationForm); // Update the state with the new array
        // console.log(newlabConsultationForm);
    };
    const onSubmit = async () => {
        // console.log("packageForm", packageForm);
        let reqObj = {
            id: packageForm.id,
            programID: packageForm.programmename,
            packageName: packageForm.packagename,
            duration: packageForm.duration,
            actualPrice: packageForm.actualprice,
            finalPrice: packageForm.finalprice,
            doctorConsultation: doctorConsultationForm,
            labConsultations: labConsultationForm
        }


        const savePackageRes = await savePackageAPI(reqObj);
        console.log(savePackageRes);
        if (savePackageRes.message.includes('Succes')) {
            setPackageFormData({
                packagename: '',
                programmename: "",
                duration: 12,
                actualprice: '',
                finalprice: '',
                id: ''
            });
            setdoctorConsultationForm([...doctorConsultationForm, { speciality: '', noofconsults: '', frequency: '' }]);
            setlabConsultationForm([...labConsultationForm, { testname: '', repeatcount: '' }]);
            if (savePackageRes) {
                onClose();
            }
        }
    }
    const handlecancel = () => {
        onClose();
    }
    const removelabForm = (index) => {
        setlabConsultationForm((prevForms) => prevForms.filter((_, i) => i !== index));
    };
    const removedoctorForm = (index) => {
        setdoctorConsultationForm((prevForms) => prevForms.filter((_, i) => i !== index));
    };


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
                        minHeight: '400px', // Height of the modal content
                        maxHeight: '600px',
                        margin: '25px auto', // Center the modal
                        overflow: 'hidden',
                        padding: '0',
                        overflowY: 'scroll'
                    },
                }}
            >
                <div className="packageformdiv p-2">
                    <div id="pt-Coupons" className="addpackage">Add Package</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='row border-1 formgroup-container'>

                            <div className='col-lg-6 col-md-6 px-2'>
                                <label className='add-package-lbl'>Package Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="packagename"
                                    value={packageForm.packagename}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='col-lg-6 col-md-6 px-2'>
                                <label className='add-package-lbl'>Programme Name</label>
                                <select
                                    type="text"
                                    className="form-control"
                                    name="programmename"
                                    value={packageForm.programmename}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select</option>
                                    {
                                        programmeList && programmeList.map((programme, index) => (
                                            <option key={index} value={programme._id}>{programme.programName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className='col-lg-4 col-md-4 px-2'>
                                <label className='add-package-lbl'>Duration(Months)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="duration"
                                    value={packageForm.duration}
                                    onChange={handleChange}
                                    disabled
                                    required
                                />
                            </div>
                            <div className='col-lg-4 col-md-4 px-2'>
                                <label className='add-package-lbl'>Actual Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="actualprice"
                                    value={packageForm.actualprice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='col-lg-4 col-md-4 px-2'>
                                <label className='add-package-lbl'>final Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="finalprice"
                                    value={packageForm.finalprice}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='col-12'>
                                <h5 className='doctor-subheading'>Doctor consultations</h5>
                            </div>
                            <div className='col-12 row'>
                                <div className='col-4  test-name-row'>
                                    <label className='add-package-lbl'>Speciality</label>
                                </div>
                                <div className='col-3'>
                                    <label className='add-package-lbl'>No Of Consults</label>
                                </div>
                                <div className='col-3'>
                                    <label className='add-package-lbl'>Frequency(months)</label>
                                </div>
                            </div>
                            <div className='col-12 '>

                                {doctorConsultationForm.map((doctor, index) => (
                                    <div key={index} className='row'>

                                        <div className='col-4  test-name-row'>
                                            <select
                                                type="text"
                                                className="form-control"
                                                name={doctor.speciality}
                                                value={doctor.speciality}
                                                onChange={(e) => handledoctorspecialityChange(e.target.value, index)}
                                                required
                                            >
                                                <option value="">Select</option>
                                                {
                                                    specialityList && specialityList.map((speciality, index) => (
                                                        <option key={index} value={speciality.imageName}>{speciality.imageName}</option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className='col-3 mx-4'>
                                            <input placeholder='No of Consults' className='form-control' type="text" name={doctor.noofconsults}
                                                value={doctor.noofconsults} onChange={(e) => handlenoofconsultsChange(e.target.value, index)} />
                                        </div>
                                        <div className='col-3'>
                                            <input placeholder='Frequency' className='form-control' disabled type="text" name={doctor.frequency}
                                                value={doctor.frequency} onChange={(e) => handlefrequencyChange(e.target.value, index)} />
                                        </div>
                                        <div className='col-1 mt-3'>
                                        {
                                            index > 0 ? (
                                                <img className='remove-test-btn' src='../images/delete.png' alt='delete-test' onClick={() => removedoctorForm(index)} />
                                            ) : ('')
                                        }

                                    </div>
                                    </div>
                                ))}
                                <div className='d-flex justify-content-end'>
                                    <img className='add-test-btn' onClick={addDoctorConsultationForm} src='../images/add_schedule.png' />
                                </div>


                            </div>
                            <div className='col-12'>
                                <h5 className='doctor-subheading'>Lab consultations</h5>
                            </div>
                            <div className='col-12 row'>
                                <div className='col-4  test-name-row'>
                                    <label className='add-package-lbl'>Test Name</label>
                                </div>
                                <div className='col-3'>
                                    <label className='add-package-lbl'>Repeat Count</label>
                                </div>
                            </div>
                            <div className='col-12 '>
                                {labConsultationForm.map((lab, index) => (
                                    <div key={index} className='row'>

                                        <div className='col-4  test-name-row'>
                                            <select
                                                type="text"
                                                className="form-control"
                                                name={lab.testname}
                                                value={lab.testname}
                                                onChange={(e) => handlelabtestnameChange(e.target.value, index)}

                                            >
                                                <option value="">Select</option>
                                                {

                                                    testnameList && testnameList.map((test, index) => (
                                                        <option key={index} value={test.title}>{test.title}</option>
                                                    ))}
                                            </select>
                                        </div>
                                        <div className='col-3'>
                                            <input placeholder='Repeat Count' className='form-control' type="text" name={lab.repeatcount}
                                                value={lab.repeatcount} onChange={(e) => handlelabrepeatcountChange(e.target.value, index)} />
                                        </div>
                                        <div className='col-1 mt-3'>
                                        {
                                            index > 0 ? (
                                                <img className='remove-test-btn' src='../images/delete.png' alt='delete-test' onClick={() => removelabForm(index)} />
                                            ) : ('')
                                        }

                                    </div>

                                    </div>
                                ))}
                                <div className='d-flex justify-content-end'>
                                    <img className='add-test-btn' onClick={addLabConsultationForm} src='../images/add_schedule.png' />
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button type='submit' className="packageadd-panel-btn">Submit</button>
                                <button className='packagecancel-btn' onClick={handlecancel}>Cancel</button>
                            </div>


                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default CreateWellnessPackage;
