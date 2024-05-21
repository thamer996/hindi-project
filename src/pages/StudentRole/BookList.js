import React, { useState } from "react";
import { connect } from "react-redux";

import { setBreadcrumbItems } from "../../store/actions";
import { Row, Col, Card, CardBody, Table, Button, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const BookList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

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
    filterBooks(e.target.value);
  };

  const filterBooks = (query) => {
    const filtered = books.filter((book) => {
      return (
        book["Book Title"].toLowerCase().includes(query.toLowerCase()) ||
        book.Publisher.toLowerCase().includes(query.toLowerCase()) ||
        book.Author.toLowerCase().includes(query.toLowerCase()) ||
        book.Subject.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredBooks(filtered);
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          
          <Table striped bordered responsive> {/* Use Table component from reactstrap */}
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
              {(searchQuery ? filteredBooks : books).map((book, index) => (
                <tr key={index}>
                  <td>{book["Book Title"]}</td>
                  <td>{book.Publisher}</td>
                  <td>{book.Author}</td>
                  <td>{book.Subject}</td>
                  <td>{book["Rack Number"]}</td>
                  <td>{book.Qty}</td>
                  <td>{book["Book Price"]}</td>
                  <td>{book["Post Date"]}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(null, { setBreadcrumbItems })(BookList);