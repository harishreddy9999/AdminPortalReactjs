import React, { useEffect, useState, useRef } from 'react';
import '../../App.css';
import '../../Styles/test.css';
import { getDefaultSamplesAPI, getunitsArrayAPI, savepaneltestAPI } from '../../services/adminPortalPanelsService';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';


const AddSingleParameterTest = ({ handleComponentSelect }) => {
    const [sampletypes, setsampletypes] = useState([]);
    const [unitsArray, setunitsArray] = useState([]);
    const [paneltestForm, setPanelTestFormData] = useState({

        testName: '',
        department: "CLINICAL PATHOLOGY",
        price: 0,
        discountpercantage: '',
        testShortCode: '',
        testMethod: '',
        sampleType: '',
        resultType: 'Number',
        units: '',
        catagory: '',
        finalprice: '',
        analysisTime: '',
        notes: '',
        comments: '',
    });
    const [biologicalReferenceForm, setbiologicalReferenceForm] = useState([{
        gender: '', age: '',
        rangeType: '', referenceMinValue: '', referenceMaxValue: '', referenceValue: '',
        referenceValueSymbol: '', rangeValueText: '', toggle: false, comments: []
    }]);
    const { handleSubmit } = useForm();
    const [isbiologicalreferenceValueSymbol, setisbiologicalreferenceValueSymbol] = useState([])
    const [isbiologicalreferenceValue, setisbiologicalreferenceValue] = useState([])
    const [isbiologicalrangeValueText, setisbiologicalrangeValueText] = useState([])
    const [isbiologicalreferenceMaxValue, setisbiologicalreferenceMaxValue] = useState([])
    const [isbiologicalreferenceMinValue, setisbiologicalreferenceMinValue] = useState([])
    const [enableDurationDisplay, setEnableDurationDisplay] = useState(false);
    const [showMinutes, setShowMinutes] = useState(true);
    const [showHours, setShowHours] = useState(true);
    const [showDays, setShowDays] = useState(true);
    const [comment, setcomments] = useState([]);
    const [commentsModel, setcommentsModel] = useState(false);
    const [commentsindex, setcommentsindex] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        // debugger;
        getDefaultSamples();
        getunitsArray();
        setcomments(comment)
        // addbiologicalReferenceForm();
    }, [comment]);

    const handleChange = (e) => {
        // debugger
        const { name, value, type, checked } = e.target;
        // debugger;
        setPanelTestFormData({ ...paneltestForm, [name]: value });
        if (name === "analysisTime") {
            // debugger
            analysisTime(value);
        }


    }
    const analysisTime = async (value) => {
        if (value.includes("H") || value.includes("M") || value.includes("D")) {
            setEnableDurationDisplay(false);
            return;
        }
        if (value !== "" && value !== undefined) {
            setEnableDurationDisplay(true);
            if (paneltestForm.analysisTime > 23 && paneltestForm.analysisTime < 60) {
                setShowMinutes(true);
                setShowDays(true);
                setShowHours(false);
            } else if (paneltestForm.analysisTime > 59) {
                setShowMinutes(false);
                setShowDays(true);
                setShowHours(false);
            } else {
                setShowMinutes(true);
                setShowDays(true);
                setShowHours(true);
            }
        } else {
            setEnableDurationDisplay(false);
        }
    }
    const durationselect = async (duration) => {
        const newAnalysisTime = paneltestForm.analysisTime + duration;
        paneltestForm.analysisTime = newAnalysisTime;
        setEnableDurationDisplay(false);
    };
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
        // debugger;
        setbiologicalReferenceForm([...biologicalReferenceForm, {
            gender: '', age: '',
            rangeType: '', referenceMinValue: '', referenceMaxValue: '', referenceValue: '',
            referenceValueSymbol: '', rangeValueText: '', toggle: false, comments: ''
        }]);
        // testRef.current.push(React.createRef());
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
    const handlebiologicalrangeTypeChange = (value, index) => {
        // debugger;
        console.log("handlebiologicalrangeTypeChange", value, index)
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], rangeType: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array
        if (value == 'Number') {
            const updatedisbiologicalreferenceValueSymbol = [...isbiologicalreferenceValueSymbol];
            updatedisbiologicalreferenceValueSymbol[index] = true;
            setisbiologicalreferenceValueSymbol(updatedisbiologicalreferenceValueSymbol);
            const updatedisbiologicalreferenceValue = [...isbiologicalreferenceValue];
            updatedisbiologicalreferenceValue[index] = true;
            setisbiologicalreferenceValue(updatedisbiologicalreferenceValue);
            const updatedisbiologicalrangeValueText = [...isbiologicalrangeValueText];
            updatedisbiologicalrangeValueText[index] = false;
            setisbiologicalrangeValueText(updatedisbiologicalrangeValueText);
            const updatedisbiologicalreferenceMaxValue = [...isbiologicalreferenceMaxValue];
            updatedisbiologicalreferenceMaxValue[index] = false;
            setisbiologicalreferenceMaxValue(updatedisbiologicalreferenceMaxValue);
            const updatedisbiologicalreferenceMinValue = [...isbiologicalreferenceMinValue];
            updatedisbiologicalreferenceMinValue[index] = false;
            setisbiologicalreferenceMinValue(updatedisbiologicalreferenceMinValue);
        }
        else if (value == 'Text') {
            const updatedisbiologicalreferenceValueSymbol = [...isbiologicalreferenceValueSymbol];
            updatedisbiologicalreferenceValueSymbol[index] = false;
            setisbiologicalreferenceValueSymbol(updatedisbiologicalreferenceValueSymbol);
            const updatedisbiologicalreferenceValue = [...isbiologicalreferenceValue];
            updatedisbiologicalreferenceValue[index] = false;
            setisbiologicalreferenceValue(updatedisbiologicalreferenceValue);
            const updatedisbiologicalrangeValueText = [...isbiologicalrangeValueText];
            updatedisbiologicalrangeValueText[index] = true;
            setisbiologicalrangeValueText(updatedisbiologicalrangeValueText);
            const updatedisbiologicalreferenceMaxValue = [...isbiologicalreferenceMaxValue];
            updatedisbiologicalreferenceMaxValue[index] = false;
            setisbiologicalreferenceMaxValue(updatedisbiologicalreferenceMaxValue);
            const updatedisbiologicalreferenceMinValue = [...isbiologicalreferenceMinValue];
            updatedisbiologicalreferenceMinValue[index] = false;
            setisbiologicalreferenceMinValue(updatedisbiologicalreferenceMinValue);
        }
        else if (value == 'Range') {
            const updatedisbiologicalreferenceValueSymbol = [...isbiologicalreferenceValueSymbol];
            updatedisbiologicalreferenceValueSymbol[index] = false;
            setisbiologicalreferenceValueSymbol(updatedisbiologicalreferenceValueSymbol);
            const updatedisbiologicalreferenceValue = [...isbiologicalreferenceValue];
            updatedisbiologicalreferenceValue[index] = false;
            setisbiologicalreferenceValue(updatedisbiologicalreferenceValue);
            const updatedisbiologicalrangeValueText = [...isbiologicalrangeValueText];
            updatedisbiologicalrangeValueText[index] = false;
            setisbiologicalrangeValueText(updatedisbiologicalrangeValueText);
            const updatedisbiologicalreferenceMaxValue = [...isbiologicalreferenceMaxValue];
            updatedisbiologicalreferenceMaxValue[index] = true;
            setisbiologicalreferenceMaxValue(updatedisbiologicalreferenceMaxValue);
            const updatedisbiologicalreferenceMinValue = [...isbiologicalreferenceMinValue];
            updatedisbiologicalreferenceMinValue[index] = true;
            setisbiologicalreferenceMinValue(updatedisbiologicalreferenceMinValue);
        }

    };
    const handlebiologicalageChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], age: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const handlebiologicalgenderChange = (value, index) => {
        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], gender: value }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm); // Update the state with the new array

    };
    const removebiologicalReferenceForm = (index) => {
        setbiologicalReferenceForm((prevForms) => prevForms.filter((_, i) => i !== index));
    };
    const commentToggle = (index, event, biological) => {

        const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
        newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], toggle: event.target.checked }; // Update the specific testShortCode at the given index
        setbiologicalReferenceForm(newbiologicalReferenceForm);
        // debugger;
        if (event.target.checked == true) {
            let obj1, obj2, obj3;

            if (biologicalReferenceForm[index].rangeType == 'Range') {
                obj1 = {
                    value: biologicalReferenceForm[index].referenceMinValue + '-' + biologicalReferenceForm[index].referenceMaxValue,
                    text: '',
                };
                obj2 = {
                    value: '<' + biologicalReferenceForm[index].referenceMinValue,
                    text: '',
                };
                obj3 = {
                    value: '>' + biologicalReferenceForm[index].referenceMaxValue,
                    text: '',
                };
                comment[index] = [obj1, obj2, obj3];
                // setcomments[index] = [obj1, obj2, obj3];
            }
            else if (biologicalReferenceForm[index].rangeType == 'Number') {
                // biologicalReferenceForm[index].referenceValueSymbol == 'GE' ? '>=' : (biologicalReferenceForm[index].referenceValueSymbol == 'LE') ? '<=' : (biologicalReferenceForm[index].referenceValueSymbol == 'G') ? '>' : (biologicalReferenceForm[index].referenceValueSymbol == 'L') ? '<' : ''
                obj1 = {
                    value: (biologicalReferenceForm[index].referenceValueSymbol == 'GE' ? '>=' : (biologicalReferenceForm[index].referenceValueSymbol == 'LE') ? '<=' : (biologicalReferenceForm[index].referenceValueSymbol == 'G') ? '>' : (biologicalReferenceForm[index].referenceValueSymbol == 'L') ? '<' : '') + biologicalReferenceForm[index].referenceValue,
                    text: ''
                }

                obj2 = {
                    value: (biologicalReferenceForm[index].referenceValueSymbol == 'GE' ? '<' : (biologicalReferenceForm[index].referenceValueSymbol == 'LE') ? '>' : (biologicalReferenceForm[index].referenceValueSymbol == 'G') ? '<=' : (biologicalReferenceForm[index].referenceValueSymbol == 'L') ? '>=' : '') + biologicalReferenceForm[index].referenceValue,
                    text: ''
                }
                comment[index] = [obj1, obj2];
                // setcomments[index] = [obj1, obj2];
            }
            else if (biologicalReferenceForm[index].rangeType == 'Text') {
                obj1 = { value: biologicalReferenceForm[index].rangeValueText, text: '' };
                comment[index] = [obj1];
                // setcomments
            }
            console.log(comment)
            // const newbiologicalReferenceForm = [...biologicalReferenceForm]; // Create a copy of the testForms array
            // newbiologicalReferenceForm[index] = { ...newbiologicalReferenceForm[index], comments: comment }; // Update the specific testShortCode at the given index
            // setbiologicalReferenceForm(newbiologicalReferenceForm); 
        }
        else {
            setcomments[index] = [{ value: '', text: '' }]
        }

    }
    const onSubmit = async () => {
        debugger
        console.log(paneltestForm)
        let reqObj = {
            testName: paneltestForm.testName,
            testShortCode: paneltestForm.testShortCode,
            testMethod: paneltestForm.testMethod,
            analysisTime: paneltestForm.analysisTime,
            category: paneltestForm.category,
            price: paneltestForm.price,
            finalPrice: paneltestForm.finalprice,
            discountPercentage: paneltestForm.discountpercantage,
            sampleType: paneltestForm.sampleType,
            department: paneltestForm.department,
            sequence: 1,
            resultType: paneltestForm.resultType,
            units: paneltestForm.units,
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
                testMethod: '',
                sampleType: '',
                resultType: 'Number',
                units: '',
                catagory: '',
                analysisTime: '',
                notes: '',
                comments: '',
            });
            setbiologicalReferenceForm([...biologicalReferenceForm, {
                gender: '', age: '',
                rangeType: '', referenceMinValue: '', referenceMaxValue: '', referenceValue: '',
                referenceValueSymbol: '', rangeValueText: ''
            }]);
            navigate('/admin-dashboard/Tests');

            handleComponentSelect('Tests');

        }
    }
    const comments = (index) => {
        console.log(comment, index);
        // debugger;
        // return;
        setcommentsModel(true);
        setcommentsindex(index)
    }
    const closecommentsModel = () => {
        setcommentsModel(false);
    }
    const submitComments = () => {
        setcommentsModel(false);
    }

    const handlecommentChange = (value, index) => {
        // debugger
        comment[index].value = value;
        // console.log(doctorConsultationForm);
    }
    const onCommentChange = (value, index) => {
        // debugger
        // comment[index].text= value;
        this.comment[commentsindex][index].text = value
    }
    const addComment = () => {
        debugger
        comment[commentsindex].push({ value: '', text: '' })

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
                            <label className='add-panel-lbl'>Test Method</label>
                            <input
                                type="text"
                                className="form-control"
                                name="testMethod"
                                value={paneltestForm.testMethod}
                                onChange={handleChange}
                                required
                            />
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
                            {
                                enableDurationDisplay ? (
                                    <div className="list d-flex  flex-column">
                                        {
                                            showMinutes &&
                                            <div onClick={() => durationselect('M')} className="durationcolumn" >
                                                {paneltestForm.analysisTime} Minutes</div>
                                        }{
                                            showHours &&

                                            <div onClick={() => durationselect('H')} className="durationcolumn" >
                                                {paneltestForm.analysisTime} Hours</div>
                                        }
                                        {
                                            showDays &&
                                            <div onClick={() => durationselect('D')} className="durationcolumn" >
                                                {paneltestForm.analysisTime} Days</div>
                                        }

                                    </div>
                                ) : ('')
                            }

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
                            <label className='add-panel-lbl'>Result Type</label>
                            <select
                                type="text"
                                className="form-control"
                                name="resultType"
                                value={paneltestForm.resultType}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>
                                    Result
                                    type
                                </option>
                                <option value="Number">Number </option>
                                <option value="Text">Text </option>
                            </select>
                        </div>
                        <div className='col-lg-2 col-md-2 px-2'>
                            <label className='add-panel-lbl'>Units</label>
                            <select
                                type="text"
                                className="form-control"
                                name="units"
                                value={paneltestForm.units}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select</option>
                                {
                                    unitsArray && unitsArray.map((unit, index) => (
                                        <option key={index} value={unit}>{unit}</option>
                                    ))
                                }
                            </select>
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

                        <div className='col-12'>
                            <h5 className='page-subheading'>Bio Logical Reference</h5>
                        </div>
                        <div className='col-12'>

                            {biologicalReferenceForm.map((biological, index) => (
                                <div key={index} className='row singlebioCompleteArray'>
                                    <div className='col-2 mt-2 test-name-row'>
                                        <select
                                            type="text"
                                            className="form-control"
                                            name="gender"
                                            value={biological.gender}
                                            onChange={(e) => handlebiologicalgenderChange(e.target.value, index)}

                                            required
                                        >
                                            <option value="" disabled>Select Gender
                                            </option>
                                            <option value="A">Any</option>
                                            <option value="F">Female</option>
                                            <option value="M">Male</option>
                                        </select>


                                    </div>
                                    <div className='col-2 mt-2 test-name-row'>
                                        <select
                                            type="text"
                                            className="form-control"
                                            name="age"
                                            value={biological.age}
                                            onChange={(e) => handlebiologicalageChange(e.target.value, index)}
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

                                    <div className='col-2 mt-2 test-name-row'>
                                        <select
                                            type="text"
                                            className="form-control"
                                            name="rangeType"
                                            value={biological.rangeType}
                                            onChange={(e) => handlebiologicalrangeTypeChange(e.target.value, index)}
                                            required
                                        >
                                            <option value="" disabled>
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

                                    {
                                        isbiologicalreferenceValueSymbol[index] ? (
                                            <div className='col-2 mt-2 test-name-row'>
                                                <select
                                                    type="text"
                                                    className="form-control"
                                                    name="referenceValueSymbol"
                                                    onChange={(e) => handlebiologicalreferenceValueSymbolChange(e.target.value, index)}
                                                    // onChange={handleChange}
                                                    required
                                                >
                                                    <option value="" disabled>Select an operator</option>
                                                    <option value="G">{'>'}</option>
                                                    <option value="GE">{'>='}</option>
                                                    <option value="L">{'<'}</option>
                                                    <option value="LE">{'<='}</option>
                                                </select>


                                            </div>


                                        ) : ('')
                                    }

                                    {
                                        isbiologicalreferenceValue[index] ? (
                                            <div className='col-2 mt-2 test-name-row'>
                                                <input placeholder='Reference Value' className='form-control' type="text" name={biological.referenceValue}
                                                    value={biological.referenceValue} onChange={(e) => handlebiologicalreferenceValueChange(e.target.value, index)} />


                                            </div>


                                        ) : ('')
                                    }
                                    {
                                        isbiologicalrangeValueText[index] ? (
                                            <div className='col-2 mt-2 test-name-row'>
                                                <input placeholder='Reference Value Text' className='form-control' type="text" name={biological.rangeValueText}
                                                    value={biological.rangeValueText} onChange={(e) => handlebiologicalrangeValueTextChange(e.target.value, index)} />


                                            </div>


                                        ) : ('')
                                    }
                                    {
                                        isbiologicalreferenceMaxValue[index] ? (
                                            <div className='col-2 mt-2 test-name-row'>
                                                <input placeholder='Reference Max Value' className='form-control' type="text" name={biological.referenceMaxValue}
                                                    value={biological.referenceMaxValue} onChange={(e) => handlebiologicalreferenceMaxValueChange(e.target.value, index)} />


                                            </div>


                                        ) : ('')
                                    }
                                    {
                                        isbiologicalreferenceMinValue[index] ? (
                                            <div className='col-2 mt-2 test-name-row'>
                                                <input placeholder='Reference Min Value' className='form-control' type="text" name={biological.referenceMinValue}
                                                    value={biological.referenceMinValue} onChange={(e) => handlebiologicalreferenceMinValueChange(e.target.value, index)} />


                                            </div>


                                        ) : ('')
                                    }
                                    <div className='col-2 mt-3'>

                                        {
                                            biological.toggle == true ? (
                                                <a className="m-0 comments" onClick={() => comments(index)}
                                                    disabled={biological.gender == '' || biological.age == '' || (isbiologicalreferenceValueSymbol[index] && isbiologicalreferenceValue) ? (biological.referenceValueSymbol == '' || biological.referenceValue == '') :
                                                        (isbiologicalreferenceMaxValue[index] && isbiologicalreferenceMinValue[index]) ? (biological.referenceMinValue == '' || biological.referenceMaxValue == '') :
                                                            isbiologicalrangeValueText[index] ? (biological.rangeValueText == '') : false}
                                                >Comments</a>
                                            ) : (<label className="m-0 tabelValue" >Comments</label>)
                                        }


                                        <Switch
                                            checked={biological.toggle}
                                            onChange={(event) => commentToggle(index, event, biological)}
                                            name={`toggle-${index}`}
                                            disabled={biological.gender == '' || biological.age == '' || (isbiologicalreferenceValueSymbol[index] && isbiologicalreferenceValue) ? (biological.referenceValueSymbol == '' || biological.referenceValue == '') :
                                                (isbiologicalreferenceMaxValue[index] && isbiologicalreferenceMinValue[index]) ? (biological.referenceMinValue == '' || biological.referenceMaxValue == '') :
                                                    isbiologicalrangeValueText[index] ? (biological.rangeValueText == '') : false}
                                            color="primary"
                                        />
                                    </div>

                                    <div className='col-1 mt-3'>
                                        {
                                            index > 0 ? (
                                                <img className='remove-test-btn' src='../images/delete.png' alt='delete-test' onClick={() => removebiologicalReferenceForm(index)} />
                                            ) : ('')
                                        }

                                    </div>
                                </div>
                            ))}
                            <div className='d-flex justify-content-end'>
                                <img className='add-test-btn' onClick={addbiologicalReferenceForm} src='../images/add_schedule.png' />
                            </div>


                        </div>


                        <div className='col-12 row'>
                            <div className='col-12 px-2'>
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
            {
                commentsModel ? (
                    <div className='initiateComp-popup'>
                        <div className='overlay'>
                            <div className='row popup-content'>

                                <div className='row'>
                                    <div className="h-100 d-flex flex-column">
                                        <div className="p-2 hc-header d-flex justify-content-between align-items-center">
                                            {/* <label htmlFor="" className="heading">Comments set for observations</label> */}
                                            {/* <img src="./assets/images/crossmark.png" alt="" onClick={() => cancelComments(i)} /> */}
                                        </div>
                                        <div className=" d-flex flex-column border h-100">
                                            <div className="d-flex table-header p-2">
                                                <div className="col-2 table-header-text px-2">S.No</div>
                                                <div className="col-4 table-header-text px-2">Value</div>
                                                <div className="col-6 table-header-text px-2">Comments</div>
                                            </div>
                                            <div>
                                                {console.log(comment, commentsindex)}
                                                {comment[commentsindex] && comment[commentsindex].map((c, cindex) => (
                                                    <div key={cindex} className="d-flex p-2 align-items-center">
                                                        <div className="col-2 px-2">{cindex + 1}</div>
                                                        {((biologicalReferenceForm[commentsindex].rangeType === 'Number' && cindex > 1) ||
                                                            (biologicalReferenceForm[commentsindex].rangeType === 'Range' && cindex > 2) ||
                                                            (biologicalReferenceForm[commentsindex].rangeType === 'Text' && cindex > 0)) && (
                                                                <div className="col-2 px-2">
                                                                    <input type="text" className="form-control" value={c.value} onChange={(e) => handlecommentChange(e.target.value, cindex)} />
                                                                </div>
                                                            )}
                                                        {((biologicalReferenceForm[commentsindex].rangeType === 'Number' && cindex <= 1) ||
                                                            (biologicalReferenceForm[commentsindex].rangeType === 'Range' && cindex <= 2) ||
                                                            (biologicalReferenceForm[commentsindex].rangeType === 'Text' && cindex === 0)) && (
                                                                <div className="col-2 px-2">{c.value}</div>
                                                            )}
                                                        <div className="col-6">
                                                            <input type="text" className="form-control" value={c.text} onChange={(event) => onCommentChange(event.target.value, cindex)} />
                                                        </div>
                                                        <div className="col-2 d-flex align-items-center">
                                                            {cindex == comment.length &&
                                                                <button className="add-btn ms-2" onClick={addComment}>+</button>}
                                                            {((biologicalReferenceForm[commentsindex].rangeType === 'Number' && cindex > 1) ||
                                                                (biologicalReferenceForm[commentsindex].rangeType === 'Range' && cindex > 2) ||
                                                                (biologicalReferenceForm[commentsindex].rangeType === 'Text' && cindex > 0)) && (
                                                                    // <img src="./assets/images/delete.png" className="remove-img ms-2" onClick={() => removeComment(cindex)} />
                                                                    <img src="../images/delete.png" className="remove-img ms-2" />
                                                                )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end mt-4'>
                                    <button className='submit-btn' onClick={() => submitComments}>Submit</button>
                                    <button className='cancel-btn' onClick={closecommentsModel}>Cancel</button>
                                </div>
                            </div>
                        </div>

                    </div>
                ) : ('')
            }
        </div>

    )
}




export default AddSingleParameterTest;