import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../config'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form, Image } from 'react-bootstrap';
import PieChart from 'react-pie-graph-chart';

export default function AssessmentShow() {

    const [Assessment, setAssessment] = useState([])
    const navigate = useNavigate();//เปลี่ยนหน้าพร้อมตัวแปร

    function getAssessment() {
        const AssessmentCollectionRef = collection(db, 'AssessmentSave')
        getDocs(AssessmentCollectionRef).then(response => {
            const Assessments = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setAssessment(Assessments)
        })
            .catch(error => console.log(error.messsage))
    }

    useEffect(() => {
        getAssessment()
    }, [])

    return (
        <div>
            <div className="row" >
                {Assessment.slice().reverse().map(Assessments => (
                    <div className="col-sm-12 mb-2" key={Assessments.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{Assessments.data.title}</h5>
                                <p className="card-text">{Assessments.data.description}</p>
                                <button className="btn btn-primary" onClick={() => (navigate('/PlayAssessment', { state: { id: Assessments.id, title: Assessments.data.title, resultCounsel: Assessments.data.resultCounsel, resultCounselElse: Assessments.data.resultCounselElse, resultScore: Assessments.data.resultScore, resultSymbol: Assessments.data.resultSymbol } }))}>ทำแบบประเมิน</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export function PlayAssessmentShow(id, title, resultCounsel, resultCounselElse, resultScore, resultSymbol) {
    const [Assessment, setAssessment] = useState([])
    const [scoreCount] = useState([])
    const navigate = useNavigate();//เปลี่ยนหน้าพร้อมตัวแปร
    const [image, setImage] = useState()
    const [noteAnswer] = useState([]); //เก็บข้อความหมายเหตุเพิ่มเติม
    const count = [];

    //modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function getPlayAssessment() {
        const AssessmentCollectionRef = collection(db, 'AssessmentSave/' + id + '/Assessment')
        getDocs(AssessmentCollectionRef).then(response => {
            const Assessments = response.docs.map(doc => ({
                data: doc.data(),
                id: doc.id,
            }))
            setAssessment(Assessments)
        })
            .catch(error => console.log(error.messsage))
    }
    //เทียบคะแนน เกณฑ์
    function counsel(array) {
        if (array.includes(0) === true) {
            return resultCounselElse;
        }else{
            return resultCounsel;
        }
    }

    //ข้อความลงใน Array
    function setMoreTextInArray(moreTextInput, index) {
        noteAnswer[index] = moreTextInput;
        console.log(noteAnswer);
    }
    //รูปภาพเพิ่มเติม
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };
    //ลบรูป
    const removeSelectedImage = () => {
        setImage();
    };

    //เช็คตัวแปรว่าง
    function findUndefinedArray(inputArray) {
        return inputArray.includes(undefined);
    }
    const handleSubmit = () => {
        //รวมคะแนน
        const totalCount = count.reduce(
            (previousScore, currentScore, index) => previousScore + currentScore,
            0);
        if (Assessment.length === scoreCount.length && findUndefinedArray(scoreCount) === false) {
            handleShow();
        } else {
            alert("มีข้อที่ยังไม่ได้ตอบ (" +
                totalCount + "/" + Assessment.length + ")");
        }
    }

    //นับข้อ
    const answer2 = (index) => {
        scoreCount[index] = 2
        count[index] = 1
    }
    const answer1 = (index) => {
        scoreCount[index] = 1
        count[index] = 1
    }
    const answer0 = (index) => {
        scoreCount[index] = 0
        count[index] = 1
    }

    //นับคำตอบ
    const countsAnswer = {};
    countsAnswer[2] = 0;
    countsAnswer[1] = 0;
    countsAnswer[0] = 0;
    for (const num of scoreCount) {
        countsAnswer[num] = countsAnswer[num] ? countsAnswer[num] + 1 : 1;
    }

    useEffect(() => {
        getPlayAssessment();
    }, [])

    return (
        <>
            <div className="row">
                <div className="col-sm-12 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <h5>{title}</h5>
                        </div>
                    </div>
                </div>
                {Assessment.map((Assessments, index) => (
                    <div className="col-sm-12 mb-2" key={Assessments.id}>
                        <div className="card">
                            <div className="card-body">
                                <p className="card-title font-weight-normal" style={{ fontSize: 18 }}>{index + 1}. {Assessments.data.AssessmentAnswer}</p>
                                <div className="form-check pb-1">
                                    <input className="form-check-input" type="radio" name={Assessments.id} id={Assessments.id + "1"} onChange={() => (answer2(index))} />
                                    <label className="form-check-label" htmlFor={Assessments.id + "1"}>
                                        สอดคล้อง
                                    </label>
                                </div>
                                <div className="form-check pb-1">
                                    <input className="form-check-input" type="radio" name={Assessments.id} id={Assessments.id + "2"} onChange={() => (answer1(index))} />
                                    <label className="form-check-label" htmlFor={Assessments.id + "2"}>
                                        ปฎิบัติตามบางส่วน
                                    </label>
                                </div>
                                <div className="form-check pb-1">
                                    <input className="form-check-input" type="radio" name={Assessments.id} id={Assessments.id + "3"} onChange={() => (answer0(index))} />
                                    <label className="form-check-label" htmlFor={Assessments.id + "3"}>
                                        ไม่ปฎิบัติตาม
                                    </label>
                                </div>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>หมายเหตุ (ไม่บังคับ)</Form.Label>
                                    <Form.Control type="text" onChange={(e) => setMoreTextInArray(e.target.value, index)} placeholder="กรอกหมายเหตุ" />
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="col-sm-12 mb-2">
                    <Form.Group controlId="imageMore" className="mb-3">
                        <Form.Label>รูปภาพเพิ่มเติม</Form.Label>
                        <Form.Control accept="image/*"
                            type="file"
                            onChange={imageChange} />
                    </Form.Group>
                    {image && (
                        <>
                            <div className="card">
                                <div className="card-body">
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        className="img-fluid rounded mx-auto d-block mb-2"
                                    />
                                </div>
                            </div>
                            <Button type="button" className="btn btn-danger w-100 my-2" onClick={removeSelectedImage}>
                                ลบรูปภาพ
                            </Button>
                        </>
                    )}
                    <Button type="button" className="btn btn-primary w-100" onClick={handleSubmit}>
                        ประมวลผล
                    </Button>
                </div>
            </div>
            <Modal className="text-center" show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Body className='mt-4'>
                    <h1>ผลลัพธ์</h1>
                    <div className='px-3'>
                        <PieChart data={[
                            {
                                type: "สอดคล้อง",
                                value: countsAnswer[2],
                                color: "#00FF00"
                            },
                            {
                                type: "ปฎิบัติตามบางส่วน",
                                value: countsAnswer[1],
                                color: "#FFFF00"
                            },
                            {
                                type: "ไม่ปฎิบัติตาม",
                                value: countsAnswer[0],
                                color: "#FF0000"
                            }
                        ]} />
                    </div>
                    <p>คำแนะนำ</p>
                    <p>{counsel(scoreCount)}</p>
                </Modal.Body>
                <Button className='btn btn-primary mx-3 mb-2' onClick={() => (navigate('/PdfTH', { state: { title: title, Assessment: Assessment, scoreCount: scoreCount, noteAnswer: noteAnswer, image: image, resultScore: resultScore, resultCounsel: resultCounsel, resultCounselElse: resultCounselElse, resultSymbol: resultSymbol } }))}>
                    ไปหน้าสร้าง PDF
                </Button>
                <Button className='btn btn-primary opacity-75 mx-3 mb-2 ' onClick={() => (navigate('/Assessment'))}>
                    กลับไปยังหน้าแบบประเมิน
                </Button>
                <Button className='btn btn-danger mx-3 mb-4' onClick={handleClose}>
                    ปิด
                </Button>
            </Modal>
        </>
    )
}
