import React, { useEffect, useState } from 'react';
import '../../App.css';
import '../../Styles/Admin-PanelsList.css';
import { getDefaultPanelsAPI } from '../../services/adminPortalPanelsService'
// import moment from 'moment';
import CustomPagination from '../CustomComponents/CustomPagination';
import { useNavigate } from 'react-router-dom';


const PanlesList = ({ handleComponentSelect }) => {

    const [searchText, setSearchText] = useState('');
    const [pageNo, setpageNo] = useState(0);
    const [pageSize, setpageSize] = useState(1);
    const [panelsList, setPanelsList] = useState([]);
    const [totalPanelsCount, setTotalPanelsCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        getDefaultPanels();
    }, [pageNo]);

    const getDefaultPanels = async () => {
        console.log("pageNo", pageNo)
        const getDefaultPanelsRes = await getDefaultPanelsAPI(searchText, pageNo, pageSize);
        // console.log("getDefaultPanelsRes", getDefaultPanelsRes)
        if (getDefaultPanelsRes) {
            setPanelsList(getDefaultPanelsRes.panels);
            setTotalPanelsCount(getDefaultPanelsRes.count)
        }
    }

    const handlePageChange = (newPage) => {
        // debugger;
        console.log("newPage", newPage)
        setpageNo(newPage - 1);
    };

    const search = () => {

    }

    const addPanel = () => {
        handleComponentSelect('AddNewPanel');
    }
    return (
        <div className="row">
            <div className="main-container">
                <div className="d-flex justify-content-between align-items-center">
                    <label className="heading screen-heading">PANELS/PACKAGES</label>
                    <div className="searchdiv d-flex justify-content-center" id="searchdiv">
                        <div className="form-control d-flex justify-content-between searchInput">
                            <input type="text" className="input_search_tag" placeholder="search Profiles" />
                            <img className="searchicon" onClick={search} src="../images/search.svg" alt='search-panels' />
                        </div>
                    </div>
                    <button className="add-panel-btn" onClick={addPanel} >+ Add Profile</button>
                </div>
                <div className="">
                    <div className="row table-header">
                        <div className="col-lg-4 col-4 ">
                            <label className=" table-header-text">PROFILE NAME</label>
                        </div>
                        <div className="col-lg-2 col-2 ">
                            <label className=" table-header-text">PROFILE CODE</label>
                        </div>

                        <div className="col-lg-4 col-4 ">
                            <label className="table-header-text">TEST NAMES</label>
                        </div>
                        <div className="col-lg-2 col-2 ">
                            <label className="table-header-text">ACTIONS</label>
                        </div>
                    </div>
                    {panelsList.length > 0 && totalPanelsCount > 0 && panelsList.map((panel, index) => (
                        <div key={index} className="row text-center trow card-body">
                            <div className="col-lg-4 col-4 table-data-text">{panel.panelName}</div>
                            <div className="col-lg-2 col-2 table-data-text">{panel.panelShortCode}</div>
                            <div className="col-lg-4 col-4 table-data-text">
                                {
                                    panel.tests.length > 0 && panel.tests.map((test, testIndex) => (
                                        <span key={testIndex}>{test.testName} - {test.testShortCode}</span>
                                    ))}
                            </div>
                            <div className="col-lg-2 col-2 tab-det table-data-text">
                                {/* <img src="./assets/images/edit.svg" alt="" (click)="editPanel(panel)" className="editImg me-2">
                                <img src="./assets/images/delete.png" alt="" (click)="deletePanel(panel.panelID,i)" className="deleteimg"> */}
                            </div>
                        </div>
                    ))}
                    <CustomPagination
                        totalCount={totalPanelsCount}
                        pageSize={pageSize}
                        page={pageNo}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default PanlesList;