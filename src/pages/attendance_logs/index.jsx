import DashBoardTemplate from "../containers/dashboard_template";
import { useState, useEffect } from "react";

import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  FormControl,
  MenuItem,
  InputLabel,
  Autocomplete,
  IconButton,
  AppBar,
  Toolbar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import axios from "axios";
import {
  selectedStyle,
  unselectedStyle,
  modalHeaderStyle,
  modalStyle,
  ButtonStyle1,
  ButtonStyle2,
  StyledTableCell,
  StyledTableRow,
  SearchIconWrapper,
  StyledInputBase,
  Search,
} from "./styles";

export default function Logs(props) {
  const [venueSelected, setVenueSelected] = useState("Coworking Space");
  const [venueId, setVenueId] = useState(1);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const [info, setInfo] = useState({});
  const [user, setUser] = useState('');
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([
    {
      name: "pam",
      isLoggedin: "Yes",
      isOverstaying: "No",
      loginTime: "19:30:00",
      logoutTime: "21:30:50",
    },
    {
      name: "pam1",
      isLoggedin: "Yes",
      isOverstaying: "Yes",
      loginTime: "13:50:00",
      logoutTime: "14:06:00",
    },
  ]);
  // const [user, setUser] = useState({
  //   id: user.id,
  //   name: user.name,
  // });
  // const searchInput = (e) => {
  //   setSearchText(e.target.value);
  // };
  let filteredEvents = events
    .filter((item) => {
      return item.name === user.id && item.referenceNo.contains(searchText)
    })

  return (
    <div>
      <DashBoardTemplate title="Attendance Logs">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            fontFamily: "Poppins",
          }}
        ></div>
        <br></br>
        <Box
          backgroundColor="white"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <div>
            <Box sx={{ flexGrow: 1, border: '3px solid rgba(0, 0, 0, 0.05)' , marginLeft: "745px"}}>
              <Search sx={{paddingRight: "-2000px"}}>
                <SearchIconWrapper>
                  <SearchIcon />
                  
                  {/* {filteredEvents((item, index) => {

                  })} */}
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search ID..."
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Box>
          </div>
          <Box
            sx={{
              p: "0px 0px 0px 0px",
            }}
            maxWidth="90%"
          >
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <ButtonGroup>
                <Button
                  sx={
                    venueSelected === "Coworking Space"
                      ? selectedStyle
                      : unselectedStyle
                  }
                  onClick={() => {
                    setVenueSelected("Coworking Space");
                    setVenueId(1);
                  }}
                >
                  CO-WORKING SPACE
                </Button>
                <Button
                  sx={
                    venueSelected === "Conference Room A"
                      ? selectedStyle
                      : unselectedStyle
                  }
                  onClick={() => {
                    setVenueSelected("Conference Room A");
                    setVenueId(2);
                  }}
                >
                  CONFERENCE A
                </Button>
                <Button
                  sx={
                    venueSelected === "Conference Room B"
                      ? selectedStyle
                      : unselectedStyle
                  }
                  onClick={() => {
                    setVenueSelected("Conference Room B");
                    setVenueId(3);
                  }}
                >
                  CONFERENCE B
                </Button>
              </ButtonGroup>
            </div>
            <TableContainer>
              <Table
                style={{
                  width: 1000,
                  textAlign: "center",
                  fontFamily: "Oswald",
                }}
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">isLoggedin</StyledTableCell>
                    <StyledTableCell align="center">isOverstaying</StyledTableCell>
                    <StyledTableCell align="center">Login Time</StyledTableCell>
                    <StyledTableCell align="center">Logout Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events.map((event, index) => (
                    <StyledTableRow key={index}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {event.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {event.isLoggedin}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {event.isOverstaying}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {event.loginTime}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {event.logoutTime}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </DashBoardTemplate>
    </div>
  );
}
