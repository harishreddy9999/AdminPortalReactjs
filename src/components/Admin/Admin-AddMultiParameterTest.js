import React, { useEffect, useState, useRef } from 'react';
import '../../App.css';
import '../../Styles/test.css';
import { getDefaultSamplesAPI, getunitsArrayAPI, savepaneltestAPI } from '../../services/adminPortalPanelsService';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


const AddMultiParameterTest = ({ handleComponentSelect }) => {
    const [sampletypes, setsampletypes] = useState([]);
    const [unitsArray, setunitsArray] = useState([]);
    const [paneltestForm, setPanelTestFormData] = useState({

        testName: '',
        department: "CLINICAL PATHOLOGY",
        price: 0,
        discountpercantage: '',
        testShortCode: '',
        sampleType: '',
        catagory: '',
        finalprice: '',
        analysisTime: '',
        notes: '',
        comments: '',
    });
    // const [biologicalReferenceForm, setbiologicalReferenceForm] = useState([{
    //     gender: '', age: '',
    //     rangeType: '', referenceMinValue: '', referenceMaxValue: '', referenceValue: '',
    //     referenceValueSymbol: '', rangeValueText: '', toggle: true, comments:[{value: "yu", text: "jyhg"}]
    // }]);
    const [biologicalReferenceForm, setbiologicalReferenceForm] = useState([{
        parameterName: '', parameterUnits: '',
        parameterGroup: '', testMethod: '', resultType: 'Number', parametervalues: [{
            gender: '', age: '', rangeType: '', referenceMinValue: '', referenceMaxValue: '', referenceValue: '',
            referenceValueSymbol: '', rangeValueText: '', toggle: true, comments: [{ value: "yu", text: "jyhg" }]
        }]
    }]
    );
    const { handleSubmit } = useForm();
    const [isbiologicalreferenceValueSymbol, setisbiologicalreferenceValueSymbol] = useState([[]])
    const [isbiologicalreferenceValue, setisbiologicalreferenceValue] = useState([[]])
    const [isbiologicalrangeValueText, setisbiologicalrangeValueText] = useState([[]])
    const [isbiologicalreferenceMaxValue, setisbiologicalreferenceMaxValue] = useState([[]])
    const [isbiologicalreferenceMinValue, setisbiologicalreferenceMinValue] = useState([[]])

    const navigate = useNavigate();

    useEffect(() => {
        // debugger;
        getDefaultSamples();
        getunitsArray();

        // addbiologicalReferenceForm();
    }, []);

    const handleChange = (e) => {
        debugger
        const { name, value, type, checked } = e.target;
        // debugger;
        setPanelTestFormData({ ...paneltestForm, [name]: value });


    }
    const getDefaultSamples = async () => {
        const getDefaultSamplesRes = await getDefaultSamplesAPI();
        console.log(getDefaultSamplesRes, "getDefaultSamples")
        setsampletypes(getDefaultSamplesRes.samples);
    }
    const getunitsArray = async () => {
        const getunitsArrayRes = await getunitsArrayAPI();
        console.log(getunitsArrayRes, "getunitsArrayRes")
        setunitsArray(getunitsArrayRes.defaultUnitsData);
    }

    const addbiologicalReferenceForm = () => {
        debugger;

        setbiologicalReferenceForm([...biologicalReferenceForm, {
            parameterName: '', parameterUnits: '',
            parameterGroup: '', testMethod: '', resultType: 'Number', parametervalues: [{
                gender: '', age: '', rangeType: '', referenceMinValue: '', referenceMaxValue: '', referenceValue: '',
                referenceValueSymbol: '', rangeValueText: '', toggle: true, comments: [{ value: "yu", text: "jyhg" }]
            }]
        }]
        );
    };

    const addbiologicalparametervalues = (index) => {
        debugger
        const newbiologicalReferenceForm = [...biologicalReferenceForm];
        const lastItem = newbiologicalReferenceForm[index];

        // Add a new item to the parametervalues array of the last item
        newbiologicalReferenceForm[index].parametervalues = [...lastItem.parametervalues, {
            gender: '',
            age: '',
            rangeType: '',
            referenceMinValue: '',
            referenceMaxValue: '',
            referenceValue: '',
            referenceValueSymbol: '',
            rangeValueText: '',
            toggle: true,
            comments: [{ value: "yu", text: "jyhg" }]
        }];
        console.log(newbiologicalReferenceForm, 'newbiologicalReferenceForm');
        setbiologicalReferenceForm([...newbiologicalReferenceForm]);

    };


    const handlebiologicalreferenceValueSymbolChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], referenceValueSymbol: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };

    const handlebiologicalreferenceValueChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], referenceValue: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };

    const handlebiologicalrangeValueTextChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], rangeValueText: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalreferenceMaxValueChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], referenceMaxValue: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalreferenceMinValueChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], referenceMinValue: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalrangeTypeChange = (value, index, j) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index].parametervalues[j] = { ...newbiologicalReferenceForm[index].parametervalues[j], rangeType: value }; // Update the specific testShortCode at the given index
        // Update the state with the new array
        if (value == 'Number') {
            debugger

            newbiologicalReferenceForm[index].parametervalues[j] = { ...newbiologicalReferenceForm[index].parametervalues[j], referenceValueSymbolField: true, referenceValueField: true, rangeValueTextField: false, referenceMaxValueField: false, referenceMinValueField: false };

            // const updatedisbiologicalreferenceValueSymbol = [...isbiologicalreferenceValueSymbol];
            // updatedisbiologicalreferenceValueSymbol[index][j] = true;
            // setisbiologicalreferenceValueSymbol(updatedisbiologicalreferenceValueSymbol);
            // const updatedisbiologicalreferenceValue = [...isbiologicalreferenceValue];
            // updatedisbiologicalreferenceValue[index][j] = true;
            // setisbiologicalreferenceValue(updatedisbiologicalreferenceValue);
            // const updatedisbiologicalrangeValueText = [...isbiologicalrangeValueText];
            // updatedisbiologicalrangeValueText[index][j] = false;
            // setisbiologicalrangeValueText(updatedisbiologicalrangeValueText);
            // const updatedisbiologicalreferenceMaxValue = [...isbiologicalreferenceMaxValue];
            // updatedisbiologicalreferenceMaxValue[index][j] = false;
            // setisbiologicalreferenceMaxValue(updatedisbiologicalreferenceMaxValue);
            // const updatedisbiologicalreferenceMinValue = [...isbiologicalreferenceMinValue];
            // updatedisbiologicalreferenceMinValue[index][j] = false;
            // setisbiologicalreferenceMinValue(updatedisbiologicalreferenceMinValue);
        }
        else if (value == 'Text') {

            newbiologicalReferenceForm[index].parametervalues[j] = { ...newbiologicalReferenceForm[index].parametervalues[j], referenceValueSymbolField: false, referenceValueField: false, rangeValueTextField: true, referenceMaxValueField: false, referenceMinValueField: false };
            // const updatedisbiologicalreferenceValueSymbol = [...isbiologicalreferenceValueSymbol];
            // updatedisbiologicalreferenceValueSymbol[index][j] = false;
            // setisbiologicalreferenceValueSymbol(updatedisbiologicalreferenceValueSymbol);
            // const updatedisbiologicalreferenceValue = [...isbiologicalreferenceValue];
            // updatedisbiologicalreferenceValue[index][j] = false;
            // setisbiologicalreferenceValue(updatedisbiologicalreferenceValue);
            // const updatedisbiologicalrangeValueText = [...isbiologicalrangeValueText];
            // updatedisbiologicalrangeValueText[index][j] = true;
            // setisbiologicalrangeValueText(updatedisbiologicalrangeValueText);
            // const updatedisbiologicalreferenceMaxValue = [...isbiologicalreferenceMaxValue];
            // updatedisbiologicalreferenceMaxValue[index][j] = false;
            // setisbiologicalreferenceMaxValue(updatedisbiologicalreferenceMaxValue);
            // const updatedisbiologicalreferenceMinValue = [...isbiologicalreferenceMinValue];
            // updatedisbiologicalreferenceMinValue[index][j] = false;
            // setisbiologicalreferenceMinValue(updatedisbiologicalreferenceMinValue);
        }
        else if (value == 'Range') {

            newbiologicalReferenceForm[index].parametervalues[j] = { ...newbiologicalReferenceForm[index].parametervalues[j], referenceValueSymbolField: false, referenceValueField: false, rangeValueTextField: false, referenceMaxValueField: true, referenceMinValueField: true };
            // const updatedisbiologicalreferenceValueSymbol = [...isbiologicalreferenceValueSymbol];
            // updatedisbiologicalreferenceValueSymbol[index][j] = false;
            // setisbiologicalreferenceValueSymbol(updatedisbiologicalreferenceValueSymbol);
            // const updatedisbiologicalreferenceValue = [...isbiologicalreferenceValue];
            // updatedisbiologicalreferenceValue[index][j] = false;
            // setisbiologicalreferenceValue(updatedisbiologicalreferenceValue);
            // const updatedisbiologicalrangeValueText = [...isbiologicalrangeValueText];
            // updatedisbiologicalrangeValueText[index][j] = false;
            // setisbiologicalrangeValueText(updatedisbiologicalrangeValueText);
            // const updatedisbiologicalreferenceMaxValue = [...isbiologicalreferenceMaxValue];
            // updatedisbiologicalreferenceMaxValue[index][j] = true;
            // setisbiologicalreferenceMaxValue(updatedisbiologicalreferenceMaxValue);
            // const updatedisbiologicalreferenceMinValue = [...isbiologicalreferenceMinValue];
            // updatedisbiologicalreferenceMinValue[index][j] = true;
            // setisbiologicalreferenceMinValue(updatedisbiologicalreferenceMinValue);
        }

        setbiologicalReferenceForm(newbiologicalReferenceForm);

    };
    const handlebiologicalageChange = (value, index, j) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index].parametervalues[j] = { ...newbiologicalReferenceForm[index].parametervalues[j], age: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalgenderChange = (value, index, j) => {
        debugger
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index].parametervalues[j] = { ...newbiologicalReferenceForm[index].parametervalues[j], gender: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalresultTypeChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], resultType: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicaltestMethodChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], testMethod: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalparameterGroupChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], parameterGroup: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalparameterUnitsChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], parameterUnits: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalparameterNameChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], parameterName: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };

    const removebiologicalReferenceForm = (index) => {
        setbiologicalReferenceForm((prevForms) => prevForms.filter((_, i) => i !== index));
    };
    const removesubbiologicalReferenceForm= (index,j) => {
        debugger
        // setbiologicalReferenceForm((prevForms) => prevForms[index].parametervalues.filter((_, i) => i !== j));
    };
    const onSubmit = async () => {
        debugger
        console.log(paneltestForm)
        const submitData = biologicalReferenceForm.map((items) => {
           
            items.parametervalues = items.parametervalues.map((data) => {
                const {referenceMaxValueField, referenceMinValueField, referenceValueField, referenceValueSymbolField, rangeValueTextField, ...rest} = data;
                return rest;
            });
             return items;
        })
        console.log(submitData);
        
        let reqObj = {
            testName: paneltestForm.testName,
            testShortCode: paneltestForm.testShortCode,
            analysisTime: "56D",
            category: paneltestForm.category,
            price: paneltestForm.price,
            finalPrice: paneltestForm.finalprice,
            discountPercentage: paneltestForm.discountpercantage,
            sampleType: paneltestForm.sampleType,
            department: paneltestForm.department,
            sequence: 1,
            notes: paneltestForm.notes,
            comments: paneltestForm.comments,
            biologicalIntervals: biologicalReferenceForm
        }
        const savepaneltestRes = await savepaneltestAPI(reqObj);
        console.log(savepaneltestRes);
        if (savepaneltestRes.message.includes('Succes')) {
            setPanelTestFormData({
                testName: '',
                department: "CLINICAL PATHOLOGY",
                price: 0,
                discountpercantage: '',
                testShortCode: '',
                sampleType: '',
                resultType: 'Number',
                units: '',
                catagory: '',
                analysisTime: '',
                notes: '',
                comments: '',
            });
            setbiologicalReferenceForm([...biologicalReferenceForm, {
                parameterName: '', parameterUnits: '',
                parameterGroup: '', testMethod: '', resultType: 'Number', parametervalues: [{
                    gender: '', age: '', rangeType: '', referenceMinValue: '', referenceMaxValue: '', referenceValue: '',
                    referenceValueSymbol: '', rangeValueText: '', toggle: true, comments: [{ value: "yu", text: "jyhg" }]
                }]
            }]
            );
            navigate('/admin-dashboard/Tests');

            handleComponentSelect('Tests');

        }
    }

    return (
        <div className='row'>
            <h5 className='profilepage-header'>Create Profile</h5>
            <div className='add-panel-form-container'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row border-1 formgroup-container'>


                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Test Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="testName"
                                value={paneltestForm.testName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Department</label>
                            <select
                                type="text"
                                className="form-control"
                                name="department"
                                value={paneltestForm.department}
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
                                name="testShortCode"
                                value={paneltestForm.testShortCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Sample Type</label>
                            <select
                                type="text"
                                className="form-control"
                                name="sampleType"
                                value={paneltestForm.sampleType}
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
                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Analysis Time</label>
                            <input
                                type="text"
                                className="form-control"
                                name="analysisTime"
                                value={paneltestForm.analysisTime}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Catagory</label>
                            <input
                                type="text"
                                className="form-control"
                                name="catagory"
                                value={paneltestForm.catagory}
                                onChange={handleChange}
                                required
                            />
                        </div>



                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Price</label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                value={paneltestForm.price}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Max Discount Allowed(%)</label>
                            <input
                                type="text"
                                className="form-control"
                                name="discountpercantage"
                                value={paneltestForm.discountpercantage}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Max Price</label>
                            <input
                                type="text"
                                className="form-control"
                                name="finalprice"
                                value={paneltestForm.finalprice}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className='col-12 mt-4'>
                            <h5 className='page-subheading'>Bio Logical Reference</h5>
                        </div>
                        <div className='col-12 mt-2'>


                            {biologicalReferenceForm.map((biological, index) => (
                                <div key={index} className='row bioCompleteArray'>
                                    <div className='col-12  d-flex justify-content-end'>
                                        {
                                            index > 0 ? (
                                                <img className='remove-test-btn' src='../images/delete.png' alt='delete-test' onClick={() => removebiologicalReferenceForm(index)} />
                                            ) : ('')
                                        }

                                    </div>
                                    <div className='col-3 mt-2 test-name-row'>
                                        <input placeholder='Parameter Name' className='form-control' type="text" name={biological.parameterName}
                                            value={biological.parameterName} onChange={(e) => handlebiologicalparameterNameChange(e.target.value, index)} />


                                    </div>
                                    <div className='col-2 mt-2 test-name-row'>
                                        <input placeholder='Parameter Units' className='form-control' type="text" name={biological.parameterUnits}
                                            value={biological.parameterUnits} onChange={(e) => handlebiologicalparameterUnitsChange(e.target.value, index)} />


                                    </div>
                                    <div className='col-2 mt-2 test-name-row'>
                                        <input placeholder='Parameter Group' className='form-control' type="text" name={biological.parameterGroup}
                                            value={biological.parameterGroup} onChange={(e) => handlebiologicalparameterGroupChange(e.target.value, index)} />


                                    </div>
                                    <div className='col-2 mt-2 test-name-row'>
                                        <input placeholder='Test Method' className='form-control' type="text" name={biological.testMethod}
                                            value={biological.testMethod} onChange={(e) => handlebiologicaltestMethodChange(e.target.value, index)} />


                                    </div>
                                    <div className='col-2 mt-2 test-name-row'>
                                        <select
                                            type="text"
                                            className="form-control"
                                            name="resultType"
                                            value={biological.resultType}
                                            onChange={(e) => handlebiologicalresultTypeChange(e.target.value, index)}
                                            required
                                        >
                                            <option value="" selected disabled>
                                                Result
                                                type
                                            </option>
                                            <option value="Number">Number </option>
                                            <option value="Text">Text </option>
                                        </select>
                                    </div>
                                    {biological.parametervalues.map((bioparameter, j) => (
                                        <div key={j} className='row multibioCompleteArray'>
                                            <div className='col-2  test-name-row'>
                                                <select
                                                    type="text"
                                                    className="form-control"
                                                    name="gender"
                                                    value={bioparameter.gender}
                                                    onChange={(e) => handlebiologicalgenderChange(e.target.value, index, j)}

                                                    required
                                                >
                                                    <option value="" disabled>Select Gender
                                                    </option>
                                                    <option value="A">Any</option>
                                                    <option value="F">Female</option>
                                                    <option value="M">Male</option>
                                                </select>


                                            </div>
                                            <div className='col-2  test-name-row'>
                                                <select
                                                    type="text"
                                                    className="form-control"
                                                    name="age"
                                                    value={bioparameter.age}
                                                    onChange={(e) => handlebiologicalageChange(e.target.value, index, j)}
                                                    required
                                                >
                                                    <option value="" disabled>Age
                                                    </option>
                                                    <option value="Any">Any(0-120 yrs)</option>
                                                    <option value="Infant">Infant(0-1 yrs)
                                                    </option>
                                                    <option value="Child">Child(2-12 yrs)
                                                    </option>
                                                    <option value="Teen">Teen(13-21 yrs)
                                                    </option>
                                                    <option value="Adult">Adult(22-60 yrs)
                                                    </option>
                                                    <option value="Senior Citizen">Senior
                                                        Citizen(60+
                                                        yrs)</option>
                                                </select>


                                            </div>

                                            <div className='col-2  test-name-row'>
                                                <select
                                                    type="text"
                                                    className="form-control"
                                                    name="rangeType"
                                                    value={bioparameter.rangeType}
                                                    onChange={(e) => handlebiologicalrangeTypeChange(e.target.value, index, j)}
                                                    required
                                                >
                                                    <option value="" selected disabled>
                                                        Reference Value
                                                    </option>
                                                    {/* <option value="Number"  disabled="paneltestForm.resultType=='Text'">Number </option>
                                            <option value="Text" disabled="paneltestForm.resultType=='Number'">Text </option>
                                            <option value="Range" disabled="paneltestForm.resultType=='Text'">Range</option> */}
                                                    <option value="Number" >Number </option>
                                                    <option value="Text">Text </option>
                                                    <option value="Range" >Range</option>
                                                </select>


                                            </div>
                                            {console.log(isbiologicalreferenceValue, index, "isbiologicalreferenceValue")}

                                            {
                                               bioparameter?.referenceValueSymbolField && (
                                                    <div className='col-2  test-name-row'>
                                                        <select
                                                            type="text"
                                                            className="form-control"
                                                            name="referenceValueSymbol"
                                                            onChange={(e) => handlebiologicalreferenceValueSymbolChange(e.target.value, index)}
                                                            // onChange={handleChange}
                                                            required
                                                        >
                                                            <option value="" disabled selected>Select an operator</option>
                                                            <option value="G">{'>'}</option>
                                                            <option value="GE">{'>='}</option>
                                                            <option value="L">{'<'}</option>
                                                            <option value="LE">{'<='}</option>
                                                        </select>


                                                    </div>


                                                ) 
                                            }

                                            {
                                                bioparameter?.referenceValueField && (
                                                    <div className='col-2  test-name-row'>
                                                        <input placeholder='Reference Value' className='form-control' type="text" name={bioparameter.referenceValue}
                                                            value={bioparameter.referenceValue} onChange={(e) => handlebiologicalreferenceValueChange(e.target.value, index)} />


                                                    </div>


                                                )
                                            }
                                            {
                                                bioparameter?.rangeValueTextField &&  (
                                                    <div className='col-2 test-name-row'>
                                                        <input placeholder='Range Value Text' className='form-control' type="text" name={bioparameter.rangeValueText}
                                                            value={bioparameter.rangeValueText} onChange={(e) => handlebiologicalrangeValueTextChange(e.target.value, index)} />


                                                    </div>


                                                )
                                            }
                                            {
                                                bioparameter?.referenceMaxValueField && (
                                                    <div className='col-2  test-name-row'>
                                                        <input placeholder='Reference Max Value' className='form-control' type="text" name={bioparameter.referenceMaxValue}
                                                            value={bioparameter.referenceMaxValue} onChange={(e) => handlebiologicalreferenceMaxValueChange(e.target.value, index)} />


                                                    </div>


                                                )
                                            }
                                            {
                                                bioparameter?.referenceMinValueField && (
                                                    <div className='col-2  test-name-row'>
                                                        <input placeholder='Reference Min Value' className='form-control' type="text" name={bioparameter.referenceMinValue}
                                                            value={bioparameter.referenceMinValue} onChange={(e) => handlebiologicalreferenceMinValueChange(e.target.value, index)} />


                                                    </div>


                                                )
                                            }
                                                <div className='col-1 mt-3'>
                                        {
                                            j > 0 ? (
                                                <img className='remove-test-btn' src='../images/delete.png' alt='delete-test' onClick={() => removesubbiologicalReferenceForm(index,j)} />
                                            ) : ('')
                                        }

                                    </div>
                               

                                       
                                        </div>))}
                                  
                                        <div className='d-flex justify-content-end mb-2'>
                                        <img className='add-test-btn' onClick={() => addbiologicalparametervalues(index)} src='../images/add_schedule.png' />
                                    </div>

                                </div>

                            ))}
                            <div className='d-flex justify-content-end mt-2'>
                                <img className='add-test-btn' onClick={addbiologicalReferenceForm} src='../images/add_schedule.png' />
                            </div>


                        </div>


                        <div className='col-12 row'>
                            <div className='col-12 mt-4 px-2'>
                                <label className='add-panel-lbl'>Notes</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="notes"
                                    value={paneltestForm.notes}
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


export default AddMultiParameterTest;