import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createClient } from "@supabase/supabase-js"
import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem, CardTitle, Input } from 'reactstrap';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useFormik } from "formik"
import * as Yup from "yup"

const supabase = createClient(
  "https://ypduxejepwdmssduohpi.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwZHV4ZWplcHdkbXNzZHVvaHBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ1MTM0MjIsImV4cCI6MjAzMDA4OTQyMn0.VxanFCHVGBOTaPV1HfFe7Qvb-LQyNoI1OXOYw_TU5HA",
)
const BookList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [Books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([]);
  async function getCountries() {
    const { data, error } = await supabase.from("Books").select("*").eq("brancheId",  localStorage.getItem("BranchId") ?? 1)
    setBooks(data ?? [])
  }
  const books = [
    {
      "Book Title": "Carbon and its Compounds",
      Publisher: "Y.D. Publisher",
      Author: "H.S.Singh",
      Subject: "EVS-2",
      "Rack Number": "3422",
      Qty: "50",
      "Book Price": "$60.00",
      "Post Date": "03/26/2024",
    },
    {
      "Book Title": "Arithmetic progressions Chapter 3",
      Publisher: "D.K Publisher",
      Author: "H.M.Rao",
      Subject: "NCERT Mathematics",
      "Rack Number": "3234",
      Qty: "80",
      "Book Price": "$86.00",
      "Post Date": "03/20/2024",
    },
    {
      "Book Title": "चिट्ठी का सफ़र (लेख)",
      Publisher: "A.G.Publisher",
      Author: "Gourav Sinha",
      Subject: "NCERT Hindi",
      "Rack Number": "3422",
      Qty: "100",
      "Book Price": "$100.00",
      "Post Date": "03/15/2024",
    },
    {
      "Book Title": "Mapping Your Way",
      Publisher: "H.K Publisher",
      Author: "V.D.Rao",
      Subject: "NCERT English",
      "Rack Number": "4211",
      Qty: "100",
      "Book Price": "$100.00",
      "Post Date": "03/10/2024",
    },
    {
      "Book Title": "Coal and Mine Chapter 10",
      Publisher: "R.T.Publisher",
      Author: "Vinay Singh",
      Subject: "Social Studies",
      "Rack Number": "2324",
      Qty: "80",
      "Book Price": "$85.00",
      "Post Date": "03/05/2024",
    },
    {
      "Book Title": "CBSE Class 8 Vigyan Book",
      Publisher: "Sk.Publisher",
      Author: "R.Sharma",
      Subject: "Science",
      "Rack Number": "3422",
      Qty: "100",
      "Book Price": "$120.00",
      "Post Date": "03/01/2024",
    },
    {
      "Book Title": "Experiments with Water",
      Publisher: "D.K.Publisher",
      Author: "Albert",
      Subject: "EVS",
      "Rack Number": "45223",
      Qty: "50",
      "Book Price": "$50.00",
      "Post Date": "02/26/2024",
    },
    {
      "Book Title": "The Cat in the Hat",
      Publisher: "T.N.Publisher",
      Author: "Dr. Seuss",
      Subject: "Trust",
      "Rack Number": "5151",
      Qty: "100",
      "Book Price": "$110.00",
      "Post Date": "02/20/2024",
    },
    {
      "Book Title": "God's Little Acre",
      Publisher: "D.K.Publisher",
      Author: "Erskine Caldwell",
      Subject: "motivational",
      "Rack Number": "5421",
      Qty: "150",
      "Book Price": "$130.00",
      "Post Date": "02/10/2024",
    },
    {
      "Book Title": "A History of Adventure",
      Publisher: "S.K.Publisher",
      Author: "H. Rider Haggard",
      Subject: "Adventure",
      "Rack Number": "5121",
      Qty: "100",
      "Book Price": "$100.00",
      "Post Date": "02/05/2024",
    },
    {
      "Book Title": "Harry Potter and the Philosopher's Stone",
      Publisher: "R.K. Publisher",
      Author: "J. K. Rowling",
      Subject: "prejudice, corruption, madness, and death",
      "Rack Number": "252",
      Qty: "100",
      "Book Price": "$120.00",
      "Post Date": "02/01/2024",
    },
    {
      "Book Title": "The Sound of Music",
      Publisher: "R.K. Publisher",
      Author: "H.K.Khanna",
      Subject: "English",
      "Rack Number": "7856",
      Qty: "100",
      "Book Price": "$120.00",
      "Post Date": "01/25/2024",
    },
    {
      "Book Title": "Every Drop Counts",
      Publisher: "R.K.Publisher",
      Author: "R.S.Mehra",
      Subject: "EVS-1",
      "Rack Number": "3421",
      Qty: "50",
      "Book Price": "$100.00",
      "Post Date": "01/20/2024",
    },
    {
      "Book Title": "Long And Short",
      Publisher: "D.S.Publisher",
      Author: "K.M.Rao",
      Subject: "Mathematics",
      "Rack Number": "3625",
      Qty: "100",
      "Book Price": "$100.00",
      "Post Date": "01/10/2024",
    },
    {
      "Book Title": "The Lord of the Rings.",
      Publisher: "S.K.Publisher",
      Author: "R.D.Singh",
      Subject: "Social Studies",
      "Rack Number": "6755",
      Qty: "50",
      "Book Price": "$50.00",
      "Post Date": "01/01/2024",
    },
    {
      "Book Title": "Human Body Systems Chapter -II",
      Publisher: "S.k.Publisher",
      Author: "R.S Mehra",
      Subject: "Science",
      "Rack Number": "568",
      Qty: "100",
      "Book Price": "$50.00",
      "Post Date": "01/05/2024",
    },
    {
      "Book Title": "Number System",
      Publisher: "D.K.Publisher",
      Author: "D.M. Sinha",
      Subject: "Mathematics",
      "Rack Number": "6432",
      Qty: "80",
      "Book Price": "$45.00",
      "Post Date": "12/26/2023",
    },
    {
      "Book Title": "THE HOUSE OF MIRTH",
      Publisher: "P.K.Publisher",
      Author: "T.N. Singh",
      Subject: "Hindi",
      "Rack Number": "4522",
      Qty: "100",
      "Book Price": "$80.00",
      "Post Date": "12/20/2023",
    },
    {
      "Book Title": "India Resources",
      Publisher: "R.K.Publisher",
      Author: "S.D.Rana",
      Subject: "Social Studies",
      "Rack Number": "396552",
      Qty: "85",
      "Book Price": "$95.00",
      "Post Date": "12/15/2023",
    },
    {
      "Book Title": "English Chapter 5 Animals",
      Publisher: "S.K.Publisher",
      Author: "D.M. Sinha",
      Subject: "English",
      "Rack Number": "6325",
      Qty: "80",
      "Book Price": "$50.00",
      "Post Date": "12/05/2023",
    },
];

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);

  };


    const filtered = Books.filter((book) => {
      return (
        book['title'].toLowerCase().includes(searchQuery.toLowerCase()) ||
        book['publisher'].toLowerCase().includes(searchQuery.toLowerCase())|| 
        book['author'].toLowerCase().includes(searchQuery.toLowerCase()) ||
        book['subject'].toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  console.log('getCountries', filtered)
  console.log('getbooks', Books)
useEffect(()=>{
  getCountries()
},[])
  return (
    <React.Fragment>
      <div className="container mt-5">
        <div>
        <Card>
            <CardBody>
              <CardTitle className="h4">Book List </CardTitle>
              <div className="d-flex mb-2">
                <label className="col-form-label">Search Book</label>
              <div className="col-md-2 ms-2">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="mb-3"
          />
          </div>
          </div>
          <Table striped hover responsive> 
            <thead>
              <tr>
                <th>Book Title</th>
                <th>Publisher</th>
                <th>Author</th>
                <th>Subject</th>
                <th>Rack Number</th>
                <th>Qty</th>
                <th>Book Price</th>
                <th>Post Date</th>
              </tr>
            </thead>
            <tbody>
              {(searchQuery ? filtered : Books).map((book, index) => (
                <tr key={index}>
                  <td>{book["title"]}</td>
                  <td>{book["publisher"]}</td>
                  <td>{book["author"]}</td>
                  <td>{book["subject"]}</td>
                  <td>{book["rackNumber"]}</td>
                  <td>{book["Qty"]}</td>
                  <td>{book["price"]} $ </td>
                  <td>{book["postDate"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          </CardBody>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems })(BookList);