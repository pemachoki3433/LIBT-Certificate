import React, { useEffect, useState, useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import LOGO from "../images/LIBT-Logo-blue.png";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import axios from "axios";
import { useParams } from "react-router-dom";

const API =
  "http://ec2-3-91-144-53.compute-1.amazonaws.com:3000/api/certificate/getAll";
export default function StudentId(props) {
  const { studentName } = useContext(StudentContext);
  const classes = useStyles();
  const [studentID, setStudentID] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    handleApi();
  }, []);

  const handleApi = () => {
    fetch(API)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("res error");
        }
      })
      .then((data) => setStudentID(data))
      .catch((err) => console.log(err));
  };
  //console.log(studentID);

  return (
    <div className={classes.cardContainer}>
      <div className={classes.cardInner}>
        <img src={LOGO} alt="LIBT" width="30%" />
        <div className={classes.ptb20}>
          <TextField
            id="outlined-basic"
            label="Student ID"
            placeholder="Enter Student ID"
            variant="outlined"
            onChange={(e) => {
              setStudentID(e.target.value);
              if (e.target.value.length !== 0) {
                setIsEmpty(false);
              } else {
                setIsEmpty(true);
              }
            }}
            value={studentID}
            fullWidth
          />
        </div>

        <Button
          component={Link}
          to={`student/${studentID}`}
          variant="contained"
          disabled={isEmpty ? true : false}
          onClick={handleApi}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

const useStyles = makeStyles({
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //paddingTop: 50
    minHeight: "100vh",
  },
  cardInner: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  linkClass: {
    textDecoration: "none",
  },
  ptb20: {
    paddingTop: "20px",
    paddingBottom: "20px",
    minWidth: "290px",
  },
});
