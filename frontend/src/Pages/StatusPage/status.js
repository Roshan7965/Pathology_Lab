import React, { useState, useEffect } from 'react'
import './status.css'
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import Modal from '../../CommonComponents/Modal/modal';
import noDataImg from '../../assets/noData.jpg';
import {Link} from 'react-router-dom';
import axios from 'axios';
const Status = () => {
  


  const [activeBar, setActiveBar] = useState("Pending")
  const [data, setData] = useState([]);
  const [clickedUpdate, setClickedUpdate] = useState(false)
  const [clickedPatient,setClickedpat]= useState(null);
  useEffect(() => {
    fetchPatient();
  }, [activeBar]);

  const fetchPatient =async()=>{
    await axios.get(`https://pathology-lab-backend.onrender.com/patient/getStatus/${activeBar}`).then(res=>{
      setData(res.data.data);
      console.log(res.data.data)
    }).catch(err=>{
      console.log(err);
    })
  }
  const updateIconClick=(item)=>{
    setClickedUpdate(true)
    setClickedpat(item);
  }
  const deletePatient =async(id)=>{
    await axios.delete(`https://pathology-lab-backend.onrender.com/patient/${id}`).then(resp=>{
      window.location.reload();
    }).catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className="statusPage">
      <div className="statusPageWorkDiv">
        <div className="statusBar">
          <div className={`statusTitle ${activeBar === 'Pending' ? "activeBarStatus" : null}`} onClick={() => { setActiveBar("Pending") }}>Pending</div>
          <div className={`statusTitle ${activeBar === 'Completed' ? "activeBarStatus" : null}`} onClick={() => { setActiveBar("Completed") }}>Completed</div>
        </div>
        <div className="statusList">
          {
            data && data.map((item, index) => {
              return (
                <div className="statusRowList">
                  <div className="statusName">
                    {item?.name}
                  </div>
                  <div className="statusDrDetails">
                    <div className="statusDrName">{item?.examinedBy}</div>
                    <div className="statusDrName">{item?.reportDate}</div>
                  </div>
                  <div className="statusBtns">
                    {
                      activeBar==="Pending"?<div className="icons" style={{ backgroundColor: "yellowgreen" }} onClick={() => { updateIconClick(item) }}><UpdateIcon /></div>:null
                    }
                    
                    {
                      activeBar==="Pending"?<div className="icons" style={{ backgroundColor: "red" }} onClick={()=>deletePatient(item._id)}><DeleteIcon /></div>:null
                    }
                    <Link to={activeBar==="Completed"?`/prescition/${item._id}`:`/report/${item._id}`} className="icons" ><ArticleIcon /></Link>
                  </div>
                </div>
              );
            })
          }
          {
            data.length===0 && <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%"}}>
              <img width={350} src={noDataImg} />
            </div>
          }


        </div>
      </div>
      {
        clickedUpdate && <Modal item={clickedPatient}  setOpenCreate={setClickedUpdate}/>
      }
    </div>
  )
}

export default Status