import React from 'react';
import { Col, Card } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const CardUser = ({ users }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/students');
      };
      const handleClickAdd = () => {
        navigate('/addclass');
      };
    return (
        
        <React.Fragment>
             <div className="d-flex justify-content-between  mb-2">
                    <div></div>
                    <button className="btn btn-primary" onClick={handleClickAdd}>Add Classes</button>
                    {/* Button */}

                </div>
            {users.map((user, key) => (
                <Col xl="4" md="6" key={key}>
                    <Card className="directory-card">
                        <div>
                            <div className="directory-bg text-center">
                                <div className="directory-overlay">
                                    {/* You can add any overlay content here */}
                                </div>
                            </div>

                            <div className="directory-content text-center p-4">
                                <p className=" mt-4">{user.designation}</p>
                                <h5 className="font-size-18">{user.name}</h5>
                                <p className="text-muted">{user.desc}</p>
                                <button className="btn btn-primary" onClick={handleClick}>View Students</button>

                                {/* Assuming viewProfile is a function that takes user id */}
                            </div>
                        </div>
                    </Card>
                </Col>
            ))}
        </React.Fragment>
    );
};

export default CardUser;
