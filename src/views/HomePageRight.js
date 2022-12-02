import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import { StudentContext } from "../contexts/StudentContext";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function HomePageRight() {
  const classes = useStyles();
  const { studentName, setStudentName } = useContext(StudentContext);
  const [detail, setDetail] = useState({});
  //console.log(useParams());
  const { studentID } = useParams(); //string
  //console.log(studentID);

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = () => {
    fetch(
      `http://ec2-3-91-144-53.compute-1.amazonaws.com:3000/api/certificate/getOne/${studentID}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log("res error");
        }
      })
      .then((data) => {
        setDetail(data);
      })
      .catch((err) => console.log(err));
  };
  console.log(detail);

  return (
    <React.Fragment>
      <div className={classes.sideBar}>
        <Card>
          <CardContent className={classes.heading}>Student Details</CardContent>
          <Divider sx={{ mb: 1 }} />
          <CardContent>
            <Card>
              <Typography className={classes.content}>
                Student Id: {detail.studentId}
              </Typography>
            </Card>
            <br />
            <Card>
              <Typography className={classes.content}>
                Name: {detail.studentName}
              </Typography>
            </Card>
            <br />
            <Card>
              <Typography className={classes.content}>
                Email: {detail.studentEmail}
              </Typography>
            </Card>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  sideBar: {},
  heading: {
    fontSize: 17,
  },

  content: {
    backgroundColor: "#EBF5FB ",
    padding: 9,
  },
});
