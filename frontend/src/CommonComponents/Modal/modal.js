import React, { useState, useEffect } from 'react'
import './modal.css';
import axios from 'axios';
const Modal = ({ setOpenCreate, item }) => {
    const [input, setInput] = useState({ "name": item ? item.name : "", "age": item ? item.age : "", "address": item ? item.address : "", "mobileNo": item ? item.mobileNo : "", "examinedBy": item ? item.examinedBy : "", "examinedDate": item ? item.examinedDate : "", "test": item ? item.test : "", "reportDate": item ? item.reportDate : "" });
    const [listOfTest, setListOfTest] = useState([])
    useEffect(() => {
        handleSelectOption();
    }, [])
    console.log(item)
    const handleSelectOption = async () => {
        await axios.get('http://localhost:8000/test/get').then(response => {
            const data = response.data.data;
            setListOfTest(data);
            if (!item) {
                setInput({ ...input, test: data[0]._id })
            } else {
                setInput({ ...input, test: item?.test })
            }


        }).catch(err => {

            console.log(err);
        })
    }

    const handleInputs = (event) => {
        setInput({ ...input, [event.target.name]: event.target.value })
    }
    const handleCreateNew = async () => {
        if (!item) {
            await axios.post("http://localhost:8000/patient/post", input).then(resp => {
                console.log(resp)
                window.location.reload();
            }).catch(err => {
                alert("Please fill every Details")
                console.log(err)
            })
        }else{
            await axios.put(`http://localhost:8000/patient/${item?._id}`, input).then(resp => {
                console.log(resp)
                window.location.reload();
            }).catch(err => {
                alert("Something Went Wrong")
                console.log(err)
            })
        }

    }
    return (
        <div className="modal">
            <div className="modal-card">
                <div className="modal-titlbox">
                    <div className="modal-title">{item ? "Update Patient" : "Create New"} </div>
                    <div className="x-btn" onClick={() => setOpenCreate(prev => !prev)}>X</div>
                </div>
                <div className="modal-body">
                    <div className="inputRowModal">
                        <div className="inputBox">
                            <div className="input-label">Name</div>
                            <input type='text' name="name" value={input.name} onChange={(e) => { handleInputs(e) }} className='input-modal' placeholder='Enter a Name' />
                        </div>
                        <div className="inputBox">
                            <div className="input-label">Age</div>
                            <input type='text' name="age" value={input.age} onChange={(e) => { handleInputs(e) }} className='input-modal' placeholder='Enter Age' />
                        </div>

                    </div>

                    <div className="inputRowModal">
                        <div className="inputBox">
                            <div className="input-label">Address</div>
                            <input type='text' name='address' value={input.address} onChange={(e) => { handleInputs(e) }} className='input-modal' placeholder='Enter address' />
                        </div>
                        <div className="inputBox">
                            <div className="input-label">Mobile</div>
                            <input type='text' name="mobileNo" value={input.mobileNo} onChange={(e) => { handleInputs(e) }} className='input-modal' placeholder='Enter Mobile No' />
                        </div>

                    </div>

                    <div className="inputRowModal">
                        <div className="inputBox">
                            <div className="input-label">Examined By</div>
                            <input type='text' name='examinedBy' value={input.examinedBy} onChange={(e) => { handleInputs(e) }} className='input-modal' placeholder='Examined By' />
                        </div>
                        <div className="inputBox">
                            <div className="input-label">Examined Date</div>
                            <input type='date' name='examinedDate' value={input.examinedDate} onChange={(e) => { handleInputs(e) }} className='input-modal' placeholder='Examined Date' />
                        </div>

                    </div>

                    <div className="inputRowModal">
                        <div className="inputBox">
                            <div className="input-label">Selected test</div>
                            <select className='input-modal' name='test' value={input.test} onChange={(e) => { handleInputs(e) }} >
                                {
                                    listOfTest?.map((item, index) => {
                                        return (
                                            <option value={`${item._id}`}>{item.name}</option>
                                        );
                                    })
                                }

                            </select>
                        </div>
                        <div className="inputBox">
                            <div className="input-label" >Report Date</div>
                            <input type='date' name='reportDate' className='input-modal' onChange={(e) => { handleInputs(e) }} value={input.reportDate} placeholder='Report Date' />
                        </div>

                    </div>
                    <div className="btnDivModal">
                        <div className="submit-modal" onClick={handleCreateNew}>Submit</div>
                        <div className="submit-modal">Clear</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Modal