import React, { useState, useEffect } from 'react'
import imgLogo from '../../assets/pathologyLogo.jpg';
import './presciption.css'
import html2Canvas from 'html2canvas'
import jsPDF from 'jspdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Presciption = () => {
    const { id } = useParams();

    const [patient, setPatientData] = useState(null);
    useEffect(() => {
        handleOnPageLoading()
    }, [])
    const handleOnPageLoading = async () => {
        await axios.get(`http://localhost:8000/patient/get/${id}`).then(response => {
            const data = response.data.data;
            setPatientData(data);
        }).catch(err => {
            console.log(err)
        })
    }
    console.log(patient)
    const downLoadPDF = () => {
        const input = document.getElementById("pdfDownload");

        html2Canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(`${patient?.name}.pdf`);
        });
        // navigate('/');

    };

    return (
        <div className="prescription">
            <div className="presdownload" id="pdfDownload">
                <div className="header-logos">
                    <img src={imgLogo} className='presc-logo' />
                    <div className="pathologyDesc">
                        <div className="namePathology">Zoho Pathology</div>
                        <div className="addressDetails">Near Infosys, Hinjewadi Phase 2</div>
                        <div className="mobNo">+91-7228796580</div>
                    </div>

                </div>
                <div className="patient-info">
                    <div className="patient-info-row">
                        <div className="info-detail">
                            <div className="patient-name-attr">Name :</div>
                            <div className="patient-name-value"> {patient?.name}</div>
                        </div>
                        <div className="info-detail-age">
                            <div className="patient-name-attr">Age:</div>
                            <div className="patient-name-value"> {patient?.age}</div>
                        </div>
                        <div className="info-detail">
                            <div className="patient-name-attr">Address:</div>
                            <div className="patient-name-value"> {patient?.address}</div>
                        </div>
                    </div>
                    <div className="patient-info-row">
                        <div className="info-detail">
                            <div className="patient-name-attr">Examined By :</div>
                            <div className="patient-name-value"> {patient?.examinedBy}</div>
                        </div>
                        <div className="info-detail-age">
                            <div className="patient-name-attr">MobNo:</div>
                            <div className="patient-name-value"> {patient?.mobileNo}</div>
                        </div>
                        <div className="info-detail">
                            <div className="patient-name-attr">Examined Date:</div>
                            <div className="patient-name-value"> {patient?.examinedDate}</div>
                        </div>
                    </div>

                </div>
                <div className="result-section">
                    <div className="particular-test">
                        <table className='table'>
                            <thead className='thead'>
                                <tr>
                                    <th></th>
                                    <th>Normal Range</th>
                                    <th>Unit</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    patient?.result?.map((item, id) => {
                                        return (
                                            <tr className='finalPresTableRow' key={id}>
                                                <td>{item.name}</td>
                                                <td>{item.range}</td>
                                                <td>{item.unit}</td>
                                                <td>{item.result}</td>
                                            </tr>
                                        );
                                    })
                                }



                            </tbody>
                        </table>
                        <div className="footer-prescription">
                            <div className="examinedBy">
                                <div className="signature">
                                    <div>Tested By</div>
                                    <div>Dr Bashir Ahmad </div>
                                </div>
                                <div className="signature">
                                    <div>Report Date</div>
                                    <div>{patient?.reportDate} </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pdf-down-btn" onClick={downLoadPDF}>

                Download

            </div>
        </div>
    )
}

export default Presciption