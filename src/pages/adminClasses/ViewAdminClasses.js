import React from 'react';
import { Col, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import HeaderTeacher from '../../components/HorizontalLayoutTeacher/HeaderTeacher';
import NvbarTeacher from '../../components/HorizontalLayoutTeacher/NvbarTeacher';
const ViewAdminClasses = ({ users }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/students');
      };
      const handleClickAdd = () => {
        navigate('/add-class-admin');
      };
    return (
        
        <React.Fragment>
             <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    <button className="btn btn-primary" onClick={handleClickAdd}>Add Classes</button>
                    {/* Button */}

                </div>
           
                <Col xl="4" md="6" >
                    <Card className="directory-card">
                        <div>
                            <div className="directory-bg text-center">
                                <div className="directory-overlay">
                                    {/* You can add any overlay content here */}
                                </div>
                            </div>

                            <div className="directory-content text-center p-4">
                                <p className=" mt-4">30 students</p>
                                <h5 className="font-size-18">Grade 1 A</h5>
                                <p className="text-muted">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                                <button className="btn btn-primary" onClick={handleClick}>View Students</button>

                                {/* Assuming viewProfile is a function that takes user id */}
                            </div>
                        </div>
                    </Card>
                </Col>
          
        </React.Fragment>
    );
};



export default ViewAdminClasses;
