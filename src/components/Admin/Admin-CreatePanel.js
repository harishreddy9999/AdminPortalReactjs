import React, { useEffect, useState, useRef } from 'react';
import '../../App.css';
import '../../Styles/Admin-AddPanels.css';
import { getDefaultSamplesAPI, addDefaultPanelsAPI, getAdmintestsAPI } from '../../services/adminPortalPanelsService';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const CreatePanel = ({ handleComponentSelect }) => {

    const [sampletypes, setsampletypes] = useState([]);
    const [panelForm, setPanelFormData] = useState({
        profileName: '',
        department: "CLINICAL PATHOLOGY",
        price: 0,
        sampleType: '',
        profileCode: '',
        notes: '',
        comments: '',
    });
    const [panelID, setpanelID] = useState('');
    // const [editPanelDetails, setEditPanelDetails] = useState(null);

    const { register, handleSubmit } = useForm();
    const [testForms, setTestForms] = useState([{ testName: '', testShortCode: '', testID: '' }]);
    // const testRef = useRef([]);
    const [editPanelID, setEditPanelID] = useState('');
    const [testslist, setTestslist] = useState([]);
    const [testNameChangeIndex, settestNameChangeIndex] = useState(-1);
    const navigate = useNavigate();

    useEffect(() => {
        // debugger;
        getDefaultSamples();
        addTestForm();
        // debugger;
        if (sessionStorage.getItem("editPanelDetails")) {
            const editPanelDetails = JSON.parse(sessionStorage.getItem("editPanelDetails"));
            // setEditPanelDetails(editPanelDetails);
            setEditPanelID(editPanelDetails.panelID)
            bindPanelData(editPanelDetails)
        }
    }, [editPanelID]);
    // const [panelID, setPanelID] = useState('')


    const addTestForm = () => {
        // debugger;
        setTestForms([...testForms, { testName: '', testShortCode: '', testID: '' }]);
        // testRef.current.push(React.createRef());
    };



    const removeTestForm = (index) => {
        setTestForms((prevForms) => prevForms.filter((_, i) => i !== index));
        // testRef.current.splice(index, 1);
    };
    const getDefaultSamples = async () => {
        const getDefaultSamplesRes = await getDefaultSamplesAPI();
        console.log(getDefaultSamplesRes, "getDefaultSamples")
        setsampletypes(getDefaultSamplesRes.samples);
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // debugger;
        setPanelFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    }
    const handleTestFormChange = async (value, index) => {
        console.log("testForms", testForms, value, index);
        const newTestForms = [...testForms]; // Create a copy of the testForms array
        newTestForms[index] = { ...newTestForms[index], testName: value }; // Update the specific testName at the given index
        setTestForms(newTestForms); // Update the state with the new array
        console.log(testForms);
        if (value.length > 2) {
            const apiRes = await getAdmintestsAPI(value, 0, 100);
            console.log("apiRes", apiRes);
            setTestslist(apiRes.independentTests);
            settestNameChangeIndex(index)
        } else {
            setTestslist([]);
            settestNameChangeIndex(-1)
        }
    };

    const handleTestShortCodeChange = (value, index) => {
        console.log("testForms", testForms, value, index);
        const newTestForms = [...testForms]; // Create a copy of the testForms array
        newTestForms[index] = { ...newTestForms[index], testShortCode: value }; // Update the specific testShortCode at the given index
        setTestForms(newTestForms); // Update the state with the new array
        console.log(testForms);
    };

    const onSubmit = async () => {
        console.log(testForms, panelForm);
        let reqObj = {
            panelID: panelID,
            panelName: panelForm.profileName,
            panelShortCode: panelForm.profileCode,
            department: panelForm.department,
            sampleType: panelForm.sampleType,
            price: panelForm.price,
            notes: panelForm.notes,
            comments: panelForm.comments,
            tests: testForms

        }
        console.log("reqObj", reqObj);
        // return;
        const addDefaultPanelsRes = await addDefaultPanelsAPI(reqObj);
        console.log(addDefaultPanelsRes);
        if (addDefaultPanelsRes.message.includes('Succes')) {
            setPanelFormData({
                profileName: '',
                department: "CLINICAL PATHOLOGY",
                price: 0,
                sampleType: '',
                profileCode: '',
                notes: '',
                comments: '',
            });
            setTestForms([{ testName: '', testShortCode: '', testID: '' }]);
            navigate('/admin-dashboard/Panels');
            // debugger;

            handleComponentSelect('Panels');
        }
        // Add your form submission logic here
    };

    const bindPanelData = (panelDetails) => {
        if (panelDetails) {
            console.log("panelDetails", panelDetails);
            setpanelID(panelDetails.panelID);
            const mappedTests = panelDetails.tests.map(test => {
                return { testName: test.testName, testShortCode: test.testShortCode, testID: test.testID };
            });
            setPanelFormData({
                ...panelForm,
                profileName: panelDetails.panelName,
                department: panelDetails.department,
                price: panelDetails.price,
                sampleType: panelDetails.sampleType,
                profileCode: panelDetails.panelShortCode,
                notes: panelDetails.notes,
                comments: panelDetails.comments,
            });
            console.log("mappedTests", mappedTests)
            setTestForms(mappedTests);
        }
        // debugger;
    }

    const selectTestName = (test, index) => {
        console.log(test, index)
        const updatedTestForms = [...testForms]; // Create a copy of the testForms array
        updatedTestForms[index] = { ...updatedTestForms[index], testName: test.testName, testShortCode: test.testShortCode, testID: test.testID }; // Update the testName at the specified index
        setTestForms(updatedTestForms);
        setTestslist([]);
        settestNameChangeIndex(-1)
    }

    return (
        <div className='row'>
            <h5 className='profilepage-header'>Create Profile</h5>
            <div className='add-panel-form-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row border-1 formgroup-container'>

                        <div className='col-lg-3 col-md-3 px-2'>
                            <label className='add-panel-lbl'>Profile Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="profileName"
                                value={panelForm.profileName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-lg-3 col-md-3 px-2'>
                            <label className='add-panel-lbl'>Department</label>
                            <select
                                type="text"
                                className="form-control"
                                name="department"
                                value={panelForm.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="HAEMATOLOGY">HAEMATOLOGY</option>
                                <option value="BIOCHEMISTRY">BIOCHEMISTRY</option>
                                <option value="SEROLOGY AND IMMUNOLOGY">SEROLOGY & IMMUNOLOGY</option>
                                <option value="CLINICAL PATHOLOGY">CLINICAL PATHOLOGY</option>
                                <option value="CYTOLOGY">CYTOLOGY</option>
                                <option value="MICROBIOLOGY">MICROBIOLOGY</option>
                                <option value="ENDOCRINOLOGY">ENDOCRINOLOGY</option>
                                <option value="HISTOPATHOLOGY">HISTOPATHOLOGY</option>
                                <option value="MISCELLANEOUS">MISCELLANEOUS</option>
                            </select>
                        </div>
                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Short Code</label>
                            <input
                                type="text"
                                className="form-control"
                                name="profileCode"
                                value={panelForm.profileCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-lg-3 col-md-3 px-2'>
                            <label className='add-panel-lbl'>Sample Type</label>
                            <select
                                type="text"
                                className="form-control"
                                name="sampleType"
                                value={panelForm.sampleType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                {
                                    sampletypes && sampletypes.map((test, index) => (
                                        <option key={index} value={test}>{test}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='col-lg-1 col-md-1 px-2'>
                            <label className='add-panel-lbl'>Price</label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                value={panelForm.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-12 mt-4'>
                            <h5 className='page-subheading'>Test Details</h5>
                        </div>
                        <div className='col-12 mt-2'>

                            {testForms.map((test, index) => (
                                <div key={index} className='row'>
                                    <div className='col-4 mt-3 test-name-row'>
                                        <input placeholder='Search Test Name' className='form-control' type="text" name={test.testName}
                                            value={test.testName} onChange={(e) => handleTestFormChange(e.target.value, index)} />
                                        {
                                            testNameChangeIndex === index && testslist.length > 0 ? (
                                                <div className='test-list-container'>
                                                    {testslist.map((test, testIndex) => (
                                                        <div key={testIndex} className='test-list'>
                                                            <div className='test-name' onClick={() => selectTestName(test, index)}>{test.testName}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : null
                                        }


                                    </div>
                                    <div className='col-4 mt-3'>
                                        <input placeholder='Test Short Code' className='form-control' type="text" name={test.testShortCode}
                                            value={test.testShortCode} onChange={(e) => handleTestShortCodeChange(e.target.value, index)} />
                                    </div>
                                    <div className='col-1 mt-3'>
                                        {
                                            index > 0 ? (
                                                <img className='remove-test-btn' src='../images/delete.png' alt='delete-test' onClick={() => removeTestForm(index)} />
                                            ) : ('')
                                        }

                                    </div>
                                </div>
                            ))}
                            <div className='d-flex justify-content-end'>
                                <img className='add-test-btn' onClick={addTestForm} src='../images/add_schedule.png' />
                            </div>


                        </div>
                        <div className='col-12 row'>
                            <div className='col-6 mt-4 px-2'>
                                <label className='add-panel-lbl'>Notes</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="notes"
                                    value={panelForm.notes}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className='col-6 mt-4 px-2'>
                                <label className='add-panel-lbl'>Comments</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="comments"
                                    value={panelForm.comments}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className="add-panel-btn my-4">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    )
}


export default CreatePanel;