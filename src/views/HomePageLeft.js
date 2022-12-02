import React, { useEffect, useState, useContext } from "react";
import { StudentContext } from "../contexts/StudentContext";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  CardMedia,
  TableContainer,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";

export default function HomePageLeft() {
  const classes = useStyles();
  const { studentName, setStudentName } = useContext(StudentContext);
  const [detail, setDetail] = useState({});
  const { studentID } = useParams();

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

  return (
    <React.Fragment>
      <Card>
        <CardContent className={classes.heading}>
          Certificate Details
        </CardContent>
        <Divider sx={{ mb: 6 }} />
        <Grid container spacing={2}>
          <Grid item xs={1}></Grid>
          <Grid item xs={1} className={classes.cDetails}>
            <InfoOutlinedIcon className={classes.icon} />
          </Grid>
          <Grid item xs={9} className={classes.cDetails}>
            <Typography variant="h6">{detail.qualificationName}</Typography>
            <Typography> {detail.category}</Typography>
            <Typography> Certificate Id: {detail.certificateId}</Typography>
            <Typography> Issued On: {detail.issuedDate}</Typography>
            <Typography> Expired On: Does not expire</Typography>
            <br />
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
        <CardContent>
          <br />
          <div className={classes.flexHr}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ShareOutlinedIcon />}
              sx={{ mr: 1 }}
            >
              Share
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<PictureAsPdfOutlinedIcon />}
              sx={{ mr: 1 }}
            >
              Download
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<HelpOutlineOutlinedIcon />}
            >
              Help
            </Button>
          </div>
        </CardContent>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography>Transcript</Typography>
            </Grid>
          </Grid>
        </CardContent>

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={8} className={classes.title}>
              <Typography>Course Name</Typography>
            </Grid>
            <Grid item xs={3} className={classes.title}>
              <Typography>Grade</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={1}></Grid>
            <Grid item xs={8}>
              <Typography>
                {detail?.courseUnits?.map((item) => (
                  <p>{item?.name}</p>
                ))}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography>
                {detail?.courseUnits?.map((item) => (
                  <p>{item?.grade}</p>
                ))}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* <div className={classes.flexHr}>
        <Avatar alt="Name" src="/static/images/avatar/1.jpg" />
        <Typography variant="subtitle1" gutterBottom sx={{ ml: 2 }}>
          Certificate Details - ID / Level / etc...
        </Typography>
      </div> */}
    </React.Fragment>
  );
}

const useStyles = makeStyles({
  flexHr: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
    paddingTop: 20,
  },
  flexHSB: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flexV: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: 17,
  },
  icon: {
    color: "	#89CFF0",
    padding: 4,
  },
  title: {
    backgroundColor: "#D5D8DC ",
  },
  cDetails: {
    backgroundColor: "#EBF5FB ",
  },
});
