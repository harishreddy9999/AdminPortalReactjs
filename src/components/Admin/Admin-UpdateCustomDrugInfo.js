import React, { useEffect, useState } from "react";
import '../../App.css';
import '../../Styles/Admin-wellness-goals.css';
import Modal from 'react-modal';
import { updateDrugDetailsAPI } from '../../services/adminportalService';

const UpdateCustomDrugInfo = ({ isOpen, onClose, drugInfo }) => {

    const [drugInfoDetails, setdrugInfoDetails] = useState(null);
    const [manufacturer, setmanufacturer] = useState('');
    const [drugname, setdrugname] = useState('');
    const [MRP, setMRP] = useState(0);
    const [compositions, setcompositions] = useState([]);
    const [userSelects, setuserSelects] = useState([]);
    const [UpdateDrugsForm, setUpdateDrugsForm] = useState({
        drugname: '',
        drugType: '',
        composition: '',
        manufacturer: '',
        MRP: '',
    });

    useEffect(() => {
        if (drugInfo) {
            // debugger;
            console.log("drugInfo", drugInfo)
            setdrugInfoDetails(drugInfo);
            setmanufacturer(drugInfo.manufacturer);
            setdrugname(drugInfo.productName);
            setMRP(drugInfo.MRP);
            setcompositions(drugInfo.composition.split(","));
            const userSelectsArr = [];
            compositions.forEach(element => {
                let obj = {};
                Object.assign(obj, { name: element.toLowerCase() });
                userSelectsArr.push(obj);
            });
            setuserSelects(userSelectsArr);
            setUpdateDrugsForm(prevState => ({
                ...prevState,
                drugname: drugInfo.productName,
                manufacturer: drugInfo.manufacturer,
                MRP: drugInfo.MRP,
                // drugname: drugInfo.productName,
            }));
        }
    }, [drugInfo])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // debugger;
        setUpdateDrugsForm({ ...UpdateDrugsForm, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    const deleteSelects = (s) => {
        console.log(userSelects);
        const filteredSelects = userSelects.filter((item) => item.name !== s.name);
        setuserSelects(filteredSelects);
        // const userSelects = userSelects.filter((item) => item.name !== s.name);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            // Fetch the entered value here
            console.log('Entered value:', UpdateDrugsForm.composition);
            console.log('Entered value:', event.target.value);
            if (event.target.value.trim() != '') {
                let obj = {};
                Object.assign(obj, { name: event.target.value.toLowerCase() });

                const filteredUserSelects = userSelects.filter(
                    (el) => el.name.toLowerCase() !== obj.name.toLowerCase()
                );

                // Add the new object
                setuserSelects([...filteredUserSelects, obj]);
                setUpdateDrugsForm(prevState => ({
                    ...prevState,
                    composition: ''
                    // drugname: drugInfo.productName,
                }));
            }
            // You can perform further actions here, like making API requests, updating state, etc.
        }
    };

    const submitDrugDetails = async (e) => {
        e.preventDefault();
        console.log(UpdateDrugsForm)
        let compositionString = '';
        userSelects.forEach((x, index) => {
            if (index === 0) {
                compositionString = x.name;
            } else {
                compositionString = compositionString + ',' + x.name;
            }
        });
        let obj = {
            productName: UpdateDrugsForm.drugname,
            composition: compositionString,
            manufacturer: UpdateDrugsForm.manufacturer,
            MRP: UpdateDrugsForm.MRP,
            drugType: UpdateDrugsForm.drugType,
            schedule: "After Having Dinner",
        }
        console.log("obj", obj);
        const apiRes = await updateDrugDetailsAPI(obj);
        console.log("apiRes", apiRes);
        if (apiRes) {
            onClose();
        }
    }

    const closedialog = () => {
        onClose();
    }
    return (
        <div className="row">
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
                        maxHeight: '370px',
                        margin: '25px auto', // Center the modal
                        padding:'0px'
                    },
                }}
            >
                <div className="row">
                    {
                        drugInfoDetails ? (
                            <div className="row">
                                <div className="couponformdiv p-0 mb-3">
                                    {/* <div id="pt-Coupons">Update Drug Info</div> */}
                                    <h5 className='page-header'>Update Drug Info</h5>
                                    </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-8 row">
                                            <div className="col-6 px-2">
                                                <label className="add-panel-lbl">Drug Name </label>
                                                <input type="text" className="form-control" name="drugname"
                                                    value={UpdateDrugsForm.drugname}
                                                    onChange={handleChange}
                                                    required readOnly />
                                            </div>
                                            <div className="col-6 px-2">
                                                <label className="add-panel-lbl">Composition</label>
                                                <input type="text" className="form-control" name="composition"
                                                    value={UpdateDrugsForm.composition} placeholder="Press enter to submit"
                                                    onKeyDown={handleKeyDown}
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                            <div className="col-6 px-2">
                                                <label className="add-panel-lbl">Manufacturer</label>
                                                <input type="text" className="form-control" name="manufacturer"
                                                    value={UpdateDrugsForm.manufacturer}
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                            <div className="col-6 px-2">
                                                <label className="add-panel-lbl">MRP</label>
                                                <input type="number" className="form-control" name="MRP"
                                                    value={UpdateDrugsForm.MRP}
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                            <div className="col-6 px-2">
                                                <label className="add-panel-lbl">Drug Type</label>
                                                <select type="text" className="form-control" name="drugType"
                                                    value={UpdateDrugsForm.drugType}
                                                    onChange={handleChange}
                                                    required>
                                                    <option value="">Select drug type</option>
                                                    <option value="Tablet">Tablet</option>
                                                    <option value="Strips">Strips</option>
                                                    <option value="Syrups">Syrups</option>
                                                    <option value="Bottles">Bottles</option>
                                                    <option value="Packets">Packets</option>
                                                    <option value="Injections">Injections</option>
                                                    <option value="Drops">Drops</option>
                                                    <option value="Ointments">Ointments</option>
                                                    <option value="Surgicals">Surgicals</option>
                                                    <option value="Lotions">Lotions</option>
                                                    <option value="Cream">Cream</option>
                                                    <option value="Powder">Powder</option>
                                                    <option value="Granules">Granules</option>
                                                    <option value="Oil">Oil</option>
                                                    <option value="Gel">Gel</option>
                                                    <option value="Soap">Soap</option>
                                                    <option value="Solutions">Solutions</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="row">
                                                <label className="add-panel-lbl">Selected Composition</label>
                                                <div className="input-container" id="selected-composition-input">
                                                    {
                                                        userSelects ? (userSelects.map((el, index) => (
                                                            <div className="user-chip" key={index} >{el.name}
                                                                <img id="694" className="delete-icon-chip" onClick={() => deleteSelects(el)}
                                                                    src="../images/cancel_icon.png" alt="delete-composition" />
                                                            </div>
                                                        ))) : ''
                                                    }


                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                <div className="row " id="buttondiv">
                                    <div id="buttonact-div" className="d-flex mt-2 mb-2 justify-content-center medium-purple">
                                        <button type="submit" className="provider-submit-btn" onClick={submitDrugDetails} id="submit" >Submit</button>
                                        <button type="button" className="provider-cancel-btn ms-4" onClick={closedialog} id="cancel">Cancel</button>
                                    </div>
                                </div>
                            </div>



                        ) : ''
                    }

                </div>
            </Modal>

        </div>
    )
}

export default UpdateCustomDrugInfo;