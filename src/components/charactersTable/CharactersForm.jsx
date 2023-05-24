import { useState, useEffect } from "react";
import "./Form.css";
// import Treetable from "./Treetable";
import axios from "axios";

const CharactersForm = () => {
  const [characterName, setCharacterName] = useState("");
  const [error, setError] = useState(false);
  const [glbFile, setGlbFile] = useState("")
  const [iconFile, setIconFile] = useState("")
  const [userRegister, setUserRegister] = useState({
    characterName: '',
    characterType: 'Male',
  })

  const [editStatus, setEditStatus] = useState(false)
  const [updatedData, setUpdatedData] = useState([])
  const [showForm, setShowForm] = useState(true)
  const [show, setShow] = useState(false)

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/category/getparentcategories`)
      .then(response => response.json())
      .then(data => setData(data.results))
      .catch(error => console.error(error));
  }, []);

  const defaultStates = () => {
    setUserRegister({
      characterName: '',
      characterType: '',
    })

  }

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
    setCharacterName(characterName);
  }

  const showAlert = () => {
    setShow(true)
    setTimeout(() => {
      setShow(false)
    }, 2000);
  }


  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(userRegister);
      let formData = new FormData();
      formData.append('characterName', userRegister.characterName)
      formData.append('characterType', userRegister.characterType)
      formData.append('glbfile', glbFile)
      formData.append('iconfile', iconFile)
      if (editStatus) {
        await axios.post(`${import.meta.env.VITE_API_URL}/category/edit/${editStatus}`, formData)
        setEditStatus(false)

      } else {
        console.log("creating--------------------------- ", `${import.meta.env.VITE_API_URL}/character/create`);
        const resu = await axios.post(`${import.meta.env.VITE_API_URL}/character/create`, formData)
        console.log(resu);
      }
      showAlert()
      const getDataaa = await axios.get(`${import.meta.env.VITE_API_URL}/category/getAllResults`)
      setUpdatedData(getDataaa.data.newresults)
      // defaultStates()
    } catch (error) {
      console.log(error);
    }
  };


  const editFn = async (category) => {
    setEditStatus(category._id)
    setUserRegister({
      categoryName: category.categoryName,
      characterType: userRegister.characterType,
      displayOrder: category.displayOrder,
      combineCategory: category.parentCategoryId
    })
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
              <label htmlFor="inputtext" className="col-sm-4 col-form-label">Character Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control" name="characterName" id="inputtext" value={userRegister.characterName} onChange={handleinput} required />
                {error ? <span className="mb-1 text-danger ">*Character Name is Required</span> : ''}
              </div>
            </div>
            <div className="row mb-3">
              <label className="col-sm-4 col-form-label">Character Type</label>
              <div className="dropdown col-sm-8 dropsquiz">
                <select className="btn btn-secondary dropdown-toggle col-sm-12 " name="characterType" value={userRegister.characterType} onChange={handleinput} >
                  <option className="dropdown-item" value="Male">Male</option>
                  <option className="dropdown-item" value="Female">Female</option>
                </select>
              </div>
            </div>

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
          </div>

          <div className="Sub_btn text-center mt-5 ">
            <button type="delete" className="btn" onClick={() => setShowForm(false)} >Cancel</button>
            <button type="delete" className="btn" onClick={defaultStates} >Reset</button>
            <button type="submit" value="submit" className="btn btn-success px-4 mx-5 " >{editStatus ? "Update" : "Save"}</button>
          </div>
        </form>
      </div>}
      {/* {!showForm && <Treetable editFn={editFn} updatedData={updatedData} setShowForm={() => setShowForm(true)} />} */}

    </div>
  )
}

export default CharactersForm