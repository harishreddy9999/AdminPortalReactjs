import React, { useEffect, useState } from "react";
import { getVitalDetailsAPI, updateVitalAPI } from '../../services/patientScreeningSrv';
import '../../App.css';
import '../../Styles/screening-vitals.css';

const ScreeningVitals = () => {

    const [aptID, setAPTID] = useState('');
    const [weight_model, setweight_model] = useState('');
    const [height_model, setheight_model] = useState('');
    const [temparature_model, settemparature_model] = useState('');
    const [heartrate_model, setheartrate_model] = useState('');
    const [diastolicpressure_model, setdiastolicpressure_model] = useState('');
    const [spo2_model, setspo2_model] = useState('');
    const [systolicpressure_model, setsystolicpressure_model] = useState('');
    const [BMI, setBMI] = useState('');
    const [patientVitalsForm, setPatientVitalsForm] = useState({
        temparature_model: '',
        heartrate_model: '',
        systolicpressure_model: '',
        diastolicpressure_model: '',
        height_model: '',
        weight_model: '',
        spo2_model: '',

    });

    useEffect(() => {
        setAPTID(sessionStorage.getItem("AppointmentID"))
        getVitalDetails();
    }, [aptID])

    const getVitalDetails = async () => {
        if (aptID) {
            const vitalDetailsRes = await getVitalDetailsAPI(aptID);
            console.log("vitalDetailsRes", vitalDetailsRes);
            const vitaldetails = vitalDetailsRes.vitals;
            console.log("vitaldetails", vitaldetails);
            vitaldetails.forEach((element) => {
                switch (element.vitalName) {
                    case 'Weight':
                        setweight_model(Math.round(element.vitalValue));
                        break;
                    case 'Height':
                        setheight_model(Math.round(element.vitalValue));
                        break;
                    case 'Temperature':
                        settemparature_model(Math.round(element.vitalValue));
                        break;
                    case 'Heart Rate':
                        setheartrate_model(Math.round(element.vitalValue));
                        break;
                    case 'BP Diastolic':
                        setdiastolicpressure_model(Math.round(element.vitalValue));
                        break;
                    case 'SPO2':
                        console.log(Math.round(element.vitalValue));
                        // debugger;
                        setspo2_model(Math.round(element.vitalValue));
                        break;
                    case 'BP Systolic':
                        setsystolicpressure_model(Math.round(element.vitalValue));
                        break;
                    default:
                        // setspo2_model(Math.round(element.vitalValue));
                        break;
                }
            });
            //   console.log("heightArray", this.heightArray, this.weightArray)
            // setBMI(Math.round((weight_model / (height_model * height_model)) * 10000));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }
    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        // debugger;
        // setPatientVitalsForm(prevState => ({
        //     ...prevState,
        //     [name]: type === 'checkbox' ? checked : value
        // }));
        if (name === "systolicpressure") {
            setsystolicpressure_model(value);
        } else if (name === "weight") {
            setweight_model(value);
        } else if (name === "height") {
            setheight_model(value);
        } else if (name === "diastolicpressure") {
            setdiastolicpressure_model(value);
        } else if (name === "temparature") {
            settemparature_model(value);
        } else if (name === "spo2") {
            setspo2_model(value);
        } else if (name === "heartrate") {
            setheartrate_model(value);
        }
    }
    const submitVitals = async () => {
        if ((diastolicpressure_model === "" || diastolicpressure_model === null || diastolicpressure_model === undefined) && (systolicpressure_model === "" || systolicpressure_model === null || systolicpressure_model === undefined)) {
        }
        else if ((systolicpressure_model !== "" && diastolicpressure_model !== null || diastolicpressure_model !== undefined) && (diastolicpressure_model !== "" && systolicpressure_model !== null || systolicpressure_model !== undefined)) {
        }
        else {
            //   this.erroroccured = true
            //   this.errormessege = 'kindly provide Systolic/Diastolic pressure detail';
            return;
        }

        if (!systolicpressure_model) {
            // Systolic pressure is missing
            // this.erroroccured = true;
            // this.errormessege = 'Kindly provide Systolic pressure detail';
            return;
        }

        if (!diastolicpressure_model) {
            // Diastolic pressure is missing
            // this.erroroccured = true;
            // this.errormessege = 'Kindly provide Diastolic pressure detail';
            return;
        }
        let reqobj = {
            appointmentId: sessionStorage.getItem("AppointmentID"),
            vitals: [
                {
                    vitalName: "Weight",
                    vitalValue: weight_model,
                    vitalUnits: "Kgs",
                    source: "PROVIDER"
                },
                {
                    vitalName: "Height",
                    vitalValue: height_model,
                    vitalUnits: "Cms",
                    source: "PROVIDER"
                },
                {
                    vitalName: "Temperature",
                    vitalValue: temparature_model,
                    vitalUnits: "F",
                    source: "PROVIDER"
                },
                {
                    vitalName: "Heart Rate",
                    vitalValue: heartrate_model,
                    vitalUnits: "BPM",
                    source: "PROVIDER"
                },
                {
                    vitalName: "BP Systolic",
                    vitalValue: systolicpressure_model,
                    vitalUnits: "mmhg",
                    source: "PROVIDER"
                },
                {
                    vitalName: "BP Diastolic",
                    vitalUnits: "mmhg",
                    vitalValue: diastolicpressure_model,
                    source: "PROVIDER",
                },
                {
                    vitalName: "SPO2",
                    vitalValue: spo2_model,
                    vitalUnits: "%",
                    source: "PROVIDER"
                },

            ]
        };
        console.log("reqobj", reqobj)

        const updateVitalsRes = await updateVitalAPI(reqobj);
        console.log("updateVitalsRes", updateVitalsRes);
        if (updateVitalsRes) {
            getVitalDetails();
        }
    }
    return (
        <div className="vitals_div m-3 p-4">
            <div className="vitals_heading row">
                <div className="col-2 col-lg-2 col-md-3 col-3 screen-heading d-flex align-items-center">
                    <div className="imagediv d-flex justify-content-center align-items-center me-2">
                        <img src="../images/screening-images/vitals-images/vitalsNewSmallHeader.svg" className="vital_image" alt="vital-row" />
                    </div>
                    Vitals
                </div>
                <div className="col-lg-8 col-7"></div>
                {
                    BMI ? (
                        <div className="col-lg-2 col-md-2 col-sm-2 col-2 d-flex justify-content-end align-items-center"
                        >
                            <div className="bmi" id="bmi-value">BMI - {BMI}</div>
                        </div>
                    ) : (
                        <div id="13395" className="col-lg-2 col-md-2 col-sm-2  d-flex justify-content-end align-items-center"
                        >
                            <div id="13396" className="bmi">BMI - N/A</div>
                        </div>
                    )
                }
            </div>
            <div className="vitals_content_div mt-2">
                <form onSubmit={handleSubmit}>
                    <div className="row cards_container">
                        <div className="col-lg-4 col-md-6 col-12 mb-2">
                            <div className="row align-items-center">
                                <div className="col-5 image_div d-flex align-items-center">
                                    <img src="../images/screening-images/vitals-images/bpNewSmallActive.svg"
                                        className="vital_image" alt="sys_bp" />
                                    <div className="vital_name pat-details-side-heading">Systolic BP
                                    </div>
                                </div>

                                <div className="col-7 row align-items-center">
                                    <input type="number" className="input col-4"
                                        min="40" max="300"
                                        name="systolicpressure"
                                        value={systolicpressure_model}
                                        onChange={handleChange}
                                        placeholder="N/A" />
                                    <span className="vital_measurement col-3">mmhg</span>

                                </div>

                            </div>

                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mb-2">
                            <div className="row align-items-center">
                                <div className="col-5 image_div d-flex align-items-center">
                                    <img src="../images/screening-images/vitals-images/bpNewSmallActive.svg"
                                        className="vital_image" alt="dia_bp" />
                                    <div className="vital_name pat-details-side-heading">Diastolic BP
                                    </div>
                                </div>

                                <div className="col-7 row align-items-center">
                                    <input type="number" className="input col-4"
                                        min="40" max="300"
                                        name="diastolicpressure"
                                        value={diastolicpressure_model}
                                        onChange={handleChange}
                                        placeholder="N/A" />
                                    <span className="vital_measurement col-3">mmhg</span>

                                </div>

                            </div>

                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mb-2">
                            <div className="row align-items-center">
                                <div className="col-5 image_div d-flex align-items-center">
                                    <img src="../images/screening-images/vitals-images/pulseNewSmallActive.svg"
                                        className="vital_image" alt="heart_rate" />
                                    <div className="vital_name pat-details-side-heading">Heart Rate
                                    </div>
                                </div>

                                <div className="col-7 row align-items-center">
                                    <input type="number" className="input col-4"
                                        min="40" max="200"
                                        name="heartrate"
                                        value={heartrate_model}
                                        onChange={handleChange}
                                        placeholder="N/A" />
                                    <span className="vital_measurement col-3">bpm</span>

                                </div>

                            </div>

                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mb-2">
                            <div className="row align-items-center">
                                <div className="col-5 image_div d-flex align-items-center">
                                    <img src="../images/screening-images/vitals-images/temperatureNewSmallActive.svg"
                                        className="vital_image" alt="temp_bp" />
                                    <div className="vital_name pat-details-side-heading">Temparature
                                    </div>
                                </div>

                                <div className="col-7 row align-items-center">
                                    <input type="number" className="input col-4"
                                        min="30" max="120"
                                        name="temparature"
                                        value={temparature_model}
                                        onChange={handleChange}
                                        placeholder="N/A" />
                                    <span className="vital_measurement col-3">f</span>

                                </div>

                            </div>

                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mb-2">
                            <div className="row align-items-center">
                                <div className="col-5 image_div d-flex align-items-center">
                                    <img src="../images/screening-images/vitals-images/spo2NewSmallActive.svg"
                                        className="vital_image" alt="spo2" />
                                    <div className="vital_name pat-details-side-heading">SPO2
                                    </div>
                                </div>

                                <div className="col-7 row align-items-center">
                                    <input type="number" className="input col-4"
                                        min="0" max="150"
                                        name="spo2"
                                        value={spo2_model}
                                        onChange={handleChange}
                                        placeholder="N/A" />
                                    <span className="vital_measurement col-3">%</span>

                                </div>

                            </div>

                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mb-2">
                            <div className="row align-items-center">
                                <div className="col-5 image_div d-flex align-items-center">
                                    <img src="../images/screening-images/vitals-images/weightNewSmallActive.svg"
                                        className="vital_image" alt="weight" />
                                    <div className="vital_name pat-details-side-heading">Weight
                                    </div>
                                </div>

                                <div className="col-7 row align-items-center">
                                    <input type="number" className="input col-4"
                                        min="1" max="200"
                                        name="weight"
                                        value={weight_model}
                                        onChange={handleChange}
                                        placeholder="N/A" />
                                    <span className="vital_measurement col-3">Kgs</span>

                                </div>

                            </div>

                        </div>
                        <div className="col-lg-4 col-md-6 col-12 mb-2">
                            <div className="row align-items-center">
                                <div className="col-5 image_div d-flex align-items-center">
                                    <img src="../images/screening-images/vitals-images/heightNewSmallActive.svg"
                                        className="vital_image" alt="height" />
                                    <div className="vital_name pat-details-side-heading">Height
                                    </div>
                                </div>

                                <div className="col-7 row align-items-center">
                                    <input type="number" className="input col-4"
                                        min="1" max="999"
                                        name="height"
                                        value={height_model}
                                        onChange={handleChange}
                                        placeholder="N/A" />
                                    <span className="vital_measurement col-3">cms</span>

                                </div>

                            </div>

                        </div>
                        <div className="row d-flex justify-content-end">
                            <button className="vital-submit-btn" onClick={submitVitals}>Save</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>



    )
}

export default ScreeningVitals;