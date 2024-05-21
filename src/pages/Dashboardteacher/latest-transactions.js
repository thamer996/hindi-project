import React, { Component } from 'react';
import { Table, Card, CardBody, Button } from "reactstrap";

//Import Images
import user2 from "../../assets/images/users/user-2.jpg";
import user4 from "../../assets/images/users/user-4.jpg";
import user5 from "../../assets/images/users/user-5.jpg";
import user6 from "../../assets/images/users/user-6.jpg";

class LatestTransactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [
                { imgUrl: user2, name: "Herbert C. Patton", status: "Present", amount: "14,584", date: "5/12/2016", color: "success" },
                { imgUrl: user4, name: "Nikolaj S. Henriksen", status: "Present", amount: "954", date: "8/11/2016", color: "success" },
                { imgUrl: user4, name: "Nikolaj S. Henriksen", status: "Confirm", amount: "954", date: "8/11/2016", color: "success" },
                { imgUrl: user5, name: "Lasse C. Overgaard", status: "Absent", amount: "44,584", date: "7/11/2016", color: "danger" },
                { imgUrl: user6, name: "Kasper S. Jessen", status: "Present", amount: "8,844", date: "1/11/2016", color: "success" },
                
                
            ],
        };
    }

    render() {
        return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-4">Best Teachers</h4>

                        <div className="table-wrapper">
                            <Table className="align-middle table-centered table-vertical table-nowrap">
                                <tbody>
                                    {this.state.transactions.map((transaction, key) => (
                                        <tr key={key}>
                                            <td>
                                                <img src={transaction.imgUrl} alt="user" className="avatar-xs rounded-circle me-2" /> {transaction.name}
                                            </td>
                                            <td><i className={"mdi mdi-checkbox-blank-circle  text-" + transaction.color}></i> {transaction.status}</td>
                                            <td>
                                                <Button color="secondary" size="sm" className="waves-effect waves-light">View</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default LatestTransactions;
