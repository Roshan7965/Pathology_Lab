import React,{useState,useEffect,useRef} from 'react';
import './navbar.css';
import imgLogo from '../../assets/pathologyLogo.jpg';
import Modal from '../Modal/modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Navbar = () => {

  const [openCreate,setOpenCreate] = useState(false);
  const [clickAddTest,setClickAddTest] = useState(false);
  const [input,setInput]=useState({"name":"","description":"","price":"","imgLink":"","fasting":"","abnormalRange":"","normalRange":""});
  
  const ref = useRef();
  useEffect(()=>{
    const checkIfClickedOutside = (e)=>{
      if(clickAddTest && ref.current && !ref.current.contains(e.target)){
        setClickAddTest(false);
      }
    }
    document.addEventListener("mousedown",checkIfClickedOutside);
    return()=>{
      document.removeEventListener("mousedown",checkIfClickedOutside);
    }
  },[clickAddTest])

  const handleInput =(event)=>{
    setInput({...input,[event.target.name]:event.target.value})
  }
  const onClickCreate =async()=>{
    await axios.post("https://pathology-lab-backend.onrender.com/test/post",input).then(res=>{
      
      window.location.reload();
    }).catch(err=>{
      console.log(err)
    })
  }
  return (
    <div className="navbar">
      <Link to={'/'} className="leftSideNabvar">
        <img src={imgLogo} className='imgLogoNavbar' alt='logo'/>
      </Link>
      <div className="rightSideNavbar">
          <div className="linksRightNavbar" onClick={()=>{setOpenCreate(prev=>!prev)}}>
            Create New
          </div>
          <Link to='/status' className="linksRightNavbar">
            Report
          </Link>
          <div className="linksRightNavbar">
            <div className="navLinkAddtest" onClick={()=>{setClickAddTest(true)}}>
              Add Test
            </div>
            {
              clickAddTest && <div className="addtest-modal" ref={ref}>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Name</div>
                <input name='name' value={input.name} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Description</div>
                <input name='description' value={input.description} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Price</div>
                <input name='price' value={input.price} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Image Link</div>
                <input name='imgLink' value={input.imgLink} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Fasting</div>
                <input name='fasting' value={input.fasting} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Normal Range</div>
                <input name='normalRange' value={input.normalRange} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="input-addtest-modal">
                <div className="inputAddtestLabel">Abnormal Range</div>
                <input name='abnormalRange' value={input.abnormalRange} onChange={(e)=>{handleInput(e)}} className='modal-input-fld' type='text' />
              </div>
              <div className="create-addtest" onClick={onClickCreate}>Create</div>
            </div>
            }


          </div>
      </div>
      {
        openCreate && <Modal setOpenCreate={setOpenCreate}/>
      }
    </div>
  )
}

export default Navbar