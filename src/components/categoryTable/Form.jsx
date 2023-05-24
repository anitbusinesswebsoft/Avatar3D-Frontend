import { useState, useEffect, useRef } from "react";
import "./Form.css";
import Treetable from "./Treetable";
import axios from "axios";


const Form = () => {

    const [categoryName, setCategoryName] = useState();
    const [error, setError] = useState(false);
    const [isComb, setIsComb] = useState(false);
    const [isAvail, setIsAvail] = useState(false);

    const [glbFile, setGlbFile] = useState("")
    const [iconFile, setIconFile] = useState("")
    const [userRegister, setUserRegister] = useState({
        categoryName: '',
        rootLevel: '',
        displayOrder: '',
        combineCategory: '',
        bodyType: ''
    })
    const [colorCode, setColorCode] = useState(['#000000'])

    const [editStatus, setEditStatus] = useState(false)
    const [updatedData, setUpdatedData] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [show, setShow] = useState(false)
    const ref = useRef()
    const refcolor = useRef()

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/category/getparentcategories`)
            .then(response => response.json())
            .then(data => setData(data.results))
            .catch(error => console.error(error));
    }, []);

    const defaultStates = () => {
        setUserRegister({
            categoryName: '',
            rootLevel: '',
            displayOrder: '',
            combineCategory: ''
        })
        setColorCode([['#000000']])
        setIsAvail(false)
        setIsComb(false)
        ref.current.checked = false
        refcolor.current.checked = false
    }

    const colorHandler = (index, value) => {
        setColorCode([...colorCode.slice(0, index), value, ...colorCode.slice(index + 1)]);
    };

    const handleAddText = () => {
        setColorCode([...colorCode, '#000000'])
    };

    const handleinput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserRegister({ ...userRegister, [name]: value })
        if (value.length < 3) {
            setError(true);
        }
        else {
            setError(false);
        }
        setCategoryName(categoryName);
    }

    const handleSubtractText = (index) => {
        const myArray = colorCode.filter((_, i) => i !== index)
        setColorCode(myArray)
    };

    console.log(userRegister);

    const showAlert = () => {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 2000);
    }
    const onSubmit = async (e) => {
        try {
            const {categoryName, bodyType, combineCategory } = userRegister
            e.preventDefault();
            let formData = new FormData();
            formData.append('categoryName', bodyType+" " + categoryName)
            formData.append('displayOrder', isComb? 2 : 1)
            formData.append('isColorAvailable', isAvail)
            formData.append('colors', colorCode)
            formData.append('glbfile', glbFile)
            formData.append('iconfile', iconFile)
            formData.append('parentCategoryId', combineCategory)
            let result
            if (editStatus) {
                result = await axios.post(`${import.meta.env.VITE_API_URL}/category/edit/${editStatus}`, formData)
                setEditStatus(false)
                showAlert()
            } else {
                result = await axios.post(`${import.meta.env.VITE_API_URL}/category/create`, formData)
                showAlert()
            }
            const getDataaa = await axios.get(`${import.meta.env.VITE_API_URL}/category/getAllResults`)
            setUpdatedData(getDataaa.data.newresults)
            // defaultStates()
        } catch (error) {
            console.log(error);
        }
    };

    const editFn = async (category) => {
        setEditStatus(category._id)
        if (category.parentCategoryId) {
            setIsComb(true)
        } else {
            setIsComb(false)
        }
        if (category.isColorAvailable) {
            setIsAvail(true)
        } else {
            setIsAvail(false)
        }
        setUserRegister({
            categoryName: category.categoryName,
            rootLevel: userRegister.rootLevel,
            displayOrder: category.displayOrder,
            combineCategory: category.parentCategoryId
        })
        setColorCode(category.colorCode)
        setIconFile(category.categoryGuid)
        setGlbFile(category.gblGuid)
    }

    return (
        <div className="main_form">
            {show && <div className="alert alert-success" role="alert">
                SuccessFull
            </div>}
            {(showForm || editStatus) && <div className=" main_Container">
                <form name="myform" onSubmit={onSubmit} >
                    <div>
                        <div className="row mb-3">
                            <label htmlFor="inputtext" className="col-sm-4 col-form-label">Category Name</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" name="categoryName" id="inputtext" value={userRegister.categoryName} onChange={handleinput} required />
                                {error ? <span className="mb-1 text-danger ">*Category Name is Required</span> : ''}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Root Level</label>
                            <div className="dropdown col-sm-8 dropsquiz">
                                <select className="btn btn-secondary dropdown-toggle col-sm-12 " name="rootLevel" value={userRegister.rootLevel} onChange={handleinput} >
                                    <option className="dropdown-item text-center" disabled="">- - - please select - - -</option>
                                    <option className="dropdown-item" value="selection1">selection1</option>
                                    <option className="dropdown-item" value="selection2">selection2</option>
                                    <option className="dropdown-item" value="selection3">select3</option>
                                </select>
                            </div>
                        </div>

                        {/* <div className="row mb-3">
                            <label htmlFor="inputnumber" className="col-sm-4 col-form-label">Display Order</label>
                            <div className="col-sm-8">
                                <input type="number" name="displayOrder" className="form-control" id="inputnumber" value={userRegister.displayOrder} onChange={handleinput} required />
                            </div>
                        </div> */}

                        <div className="row mb-3">
                            <label htmlFor="flexSwitch" className="col-sm-4 ">Is Combine Category</label>
                            <div className="form-check form-switch col-sm-7">
                                <input ref={ref} className="form-check-input" checked={isComb} onChange={() => setIsComb(!isComb)} type="checkbox" role="switch" id="flexSwitch" />
                            </div>
                        </div>

                        {isComb ?
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Combine Category</label>
                                <div className="dropdown col-sm-8 ">
                                    <select className="btn btn-secondary dropdown-toggle col-sm-12 " name="combineCategory" value={userRegister.combineCategory} onChange={handleinput} >
                                        <option className="dropdown-item" disabled=""> - - - Please Select - - -</option>
                                        {
                                            data.map((val, index) => <option key={index} className="dropdown-item" value={val._id}>{val.categoryName}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            : ""
                        }

                        {isComb ?
                            <div className="row mb-3">
                                <label className="col-sm-4 col-form-label">Body Type</label>
                                <div className="dropdown col-sm-8 ">
                                    <select className="btn btn-secondary dropdown-toggle col-sm-12 " name="bodyType" value={userRegister.bodyType} onChange={handleinput} >
                                        <option className="dropdown-item" disabled=""> - - - Please Select - - -</option>
                                        <option className="dropdown-item" value="Male">Male</option>
                                        <option className="dropdown-item" value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            : ""
                        }

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Icon File</label>
                            <div className="col-sm-8 " >
                                <input type="file" onChange={(e) => setIconFile(e.target.files[0])} />
                            </div>
                            {/* {iconFile.name ? "" : <h6>{iconFile} </h6>} */}
                        </div>

                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">GLB File</label>
                            <div className="col-sm-8 " >
                                <input type="file" onChange={(e) => setGlbFile(e.target.files[0])} />

                            </div>
                            {glbFile.name ? "" : <h6>{glbFile} </h6>}
                        </div>

                        {userRegister.rootLevel < "selection1" ?
                            <div className="row mb-3">
                                <label htmlFor="flexSwitchCheckDefault" className="col-sm-4 ">Is Color Avilable</label>
                                <div className="form-check form-switch col-sm-7">
                                    <input ref={refcolor} className="form-check-input" checked={isAvail} onChange={() => setIsAvail(!isAvail)} type="checkbox" role="switch" id="flexSwitchCheckDefault" />

                                </div>
                            </div> : ""
                        }
                    </div>

                    <div>
                        {isAvail ?
                            <div style={{ height: `${colorCode.length * 60}px` }} className={`row mb-3 fram`}>
                                {colorCode.map((item, index) => (
                                    <div key={index} >
                                        <div className="row mb-3">
                                            <label htmlFor="inputcolor" className="col-sm-4 col-form-label">Color Code</label>
                                            <div className='col-sm-8'>
                                                <div className=" d-flex " >
                                                    <input type="color" className="" id="inputcolor" name="colorCode" value={colorCode[index]} onChange={(e) => colorHandler(index, e.target.value)} required />
                                                    {colorCode.length > 1 && <button className="btn-sm mx-1" onClick={(e) => (e.preventDefault(), handleSubtractText(index))} >-</button>}
                                                    {colorCode.length - 1 === index && (<button className="btn-sm mx-1" onClick={handleAddText} >+</button>)}
                                                </div>
                                                {/* <div className="mb-1 text-danger ">*This is an error!</div> */}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div> : ""
                        }
                    </div>

                    <div className="Sub_btn text-center mt-5 ">
                        <button type="delete" className="btn" onClick={() => setShowForm(false)} >Cancel</button>
                        <button type="delete" className="btn" onClick={defaultStates} >Reset</button>
                        <button type="submit" value="submit" className="btn btn-success px-4 mx-5 " >{editStatus ? "Update" : "Save"}</button>
                    </div>
                </form>
            </div>}
            {!showForm && <Treetable editFn={editFn} updatedData={updatedData} setShowForm={() => setShowForm(true)} />}

        </div>
    );
};

export default Form;