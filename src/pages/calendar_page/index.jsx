import * as React from "react";
import DashBoardTemplate from "../containers/dashboard_template";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ModalOne from "./components/modal1";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  // FormControl,
  IconButton,
  // InputLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
import moment from "moment/moment";
import ClearIcon from "@mui/icons-material/Clear";
import {
  ButtonStyle1,
  selectedStyle,
  unselectedStyle,
  modalHeaderStyle,
  modalStyle,
  ButtonStyle2,
} from "./styles";

const today = new Date();
//dynamic max week
const maxWeeks = 2;
const after_2_weeks = new Date();
after_2_weeks.setDate(today.getDate() + maxWeeks * 7);
const events = [
  {
    title: "Meeting",
    start: "2023-05-15T19:30:00",
    end: "2023-05-15T20:00:00",
    venue: "Coworking Space",
  },
  {
    title: "Meeting",
    start: "2023-05-16T09:30:00",
    end: "2023-05-16T11:30:00",
    venue: "Conference A",
  },
];

const maxComputers = 10;
export default function Calendar(props) {
  //data to send
  //new booking
  const [user, setUser] = useState({
    id: 1,
    username: "joe",
  });

  const [refresh, setRefresh] = useState(true);
  const [attendeeList, setAttendeeList] = useState([]);
  const fakeUserDb = [
    { name: "127-2242-290", id: 2 },
    { name: "225-5224-280", id: 3 },
    { name: "Celine", id: 4 },
  ];
  const handleChange = (e) => {
    var tempBooking = booking.current;
    if (e.target.name === "computers") {
      tempBooking[e.target.name] = parseInt(e.target.value);
    } else {
      tempBooking[e.target.name] = e.target.value;
    }
    booking.current = tempBooking;
    setRefresh(!refresh);
  };

  const booking = useRef({
    purpose: "Studying",
    description: "",
    startTime: "",
    venue: "",
    endTime: "",
    date: "",
    computers: 0,
    coins: 0,
    points: 0,
    user: user.id,
    officeName: "",
    attendees: [],
  });

  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);
  const [attendeeName, setAttendeeName] = useState("");
  const [venueSelected, setVenueSelected] = useState("Coworking Space");
  const [error, setError] = useState(false);
  const found = (element) => element.name === attendeeName;
  const deleteUser = (index) => {
    setAttendeeList([
      ...attendeeList.slice(0, index),
      ...attendeeList.slice(index + 1),
    ]);
  };
  return (
    <div>
      <DashBoardTemplate title="Calendar">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography
            sx={{ paddingLeft: 2, color: "darkred" }}
            fontFamily="Roboto"
          >
            *Click and drag on time-slots to start booking
          </Typography>
        </div>
        <br></br>
        <Box
          backgroundColor="white"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            sx={{
              p: "0px 0px 0px 0px",
            }}
            maxWidth="90%"
          >
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <ButtonGroup>
                <Button
                  sx={
                    venueSelected === "Coworking Space"
                      ? selectedStyle
                      : unselectedStyle
                  }
                  onClick={() => setVenueSelected("Coworking Space")}
                >
                  Co-working Space
                </Button>
                <Button
                  sx={
                    venueSelected === "Conference A"
                      ? selectedStyle
                      : unselectedStyle
                  }
                  onClick={() => setVenueSelected("Conference A")}
                >
                  Conference Room A
                </Button>
                <Button
                  sx={
                    venueSelected === "Conference B"
                      ? selectedStyle
                      : unselectedStyle
                  }
                  onClick={() => setVenueSelected("Conference B")}
                >
                  Conference Room B
                </Button>
              </ButtonGroup>
            </div>
            <FullCalendar
              events={events.filter((item) => {
                return item.venue === venueSelected;
              })}
              selectAllow={(select) => {
                return select.end.getDay() === select.start.getDay();
              }}
              // function para sa pili ug timeslot calendar functions
              select={(info) => {
                setOpenModal1(true);
                var dateSplitted = info.startStr.split("T");
                var startDate = dateSplitted[0];
                var startTime = dateSplitted[1].split("+")[0];
                var dateSplitted2 = info.endStr.split("T");
                var endTime = dateSplitted2[1].split("+")[0];
                var tempBooking = booking.current;
                tempBooking.startTime = startTime;
                tempBooking.endTime = endTime;
                tempBooking.date = startDate;
                tempBooking.venue = venueSelected;
                booking.current = tempBooking;
                console.log(booking.current);
              }}
              //function para ig click ug usa ka event
              eventClick={(info) => {
                console.log(info.event.title);
              }}
              unselect={(jsEvent, view) => {}}
              // dayClick={(date, jsEvent, view) => {}}
              selectOverlap={(event) => {}}
              selectable={true}
              showNonCurrentDates={false}
              slotMinTime="09:00:00"
              slotMaxTime="23:00:00"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              // initialView="dayGridMonth"
              views={{
                dayGridMonth: {
                  selectable: false,
                },
                dayGridWeek: {
                  selectable: false,
                },
              }}
              headerToolbar={{
                start: "prev,next today",
                center: "title",
                end: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              allDaySlot={false}
              initialView="timeGridWeek"
              aspectRatio={25.0}
              weekends={true}
              //events data

              eventContent={renderEventContent}
              validRange={{
                start: today,
                end: after_2_weeks,
              }}
              eventBackgroundColor="#fecc00"
              eventTextColor="black"
              height="100"
              contentHeight="auto"
            ></FullCalendar>
          </Box>

          <Typography>hello</Typography>
        </Box>
      </DashBoardTemplate>
      {/* modal 1 modal1 modal one modalone */}
      <ModalOne
        error={error}
        setError={setError}
        booking={booking}
        openModal1={openModal1}
        setOpenModal2={setOpenModal2}
        setOpenModal1={setOpenModal1}
        handleChange={handleChange}
      />
      <Modal
        open={openModal2}
        onClose={() => setOpenModal2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box sx={modalStyle}>
          <Box sx={modalHeaderStyle}>
            <Typography
              sx={{ fontWeight: "bold" }}
              id="modal-modal-title"
              variant="h5"
              component="h2"
              fontFamily="Oswald"
              color="white"
            >
              Booking Enrollment
            </Typography>
            <Button
              onClick={() => {
                setOpenModal2(false);
              }}
              sx={{ p: 0, m: 0, color: "white" }}
            >
              <CloseIcon></CloseIcon>
            </Button>
          </Box>

          <Box p="30px 30px 0px 30px">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <TextField
                name="computers"
                type="number"
                sx={{ width: "40%" }}
                value={booking.current.computers}
                InputProps={{
                  inputProps: {
                    min: 0,
                    max: maxComputers,
                  },
                }}
                id="outlined-basic"
                label="Computers"
                variant="standard"
                onChange={(e) => handleChange(e)}
                autoFocus={false}
              />
            </Box>
            <br></br>

            <Typography
              fontWeight="bold"
              variant="h6"
              fontFamily="Oswald"
              backgroundColor="#222222"
              color="white"
              p="5px 10px 5px 10px"
              sx={{ display: "inline-block" }}
            >
              Attendees:
            </Typography>

            <Box sx={{ display: "flex", marginTop: "20px" }}>
              {/* <TextField
                sx={{ width: "100%", marginRight: "20px" }}
                id="outlined-basic"
                placeholder="Enter Name or Id"
                variant="standard"
                onChange={(e) => {
                  setAttendeeName(e.target.value);
                }}
              /> */}
              <Autocomplete
                freeSolo
                defaultValue=""
                autoSelect={false}
                id="combo-box-demo"
                options={fakeUserDb.map((item) => {
                  return {
                    label: item.name,
                    id: item.id,
                  };
                })}
                inputValue={attendeeName}
                onInputChange={(event, newInputValue) => {
                  setAttendeeName(newInputValue);
                }}
                sx={{ width: 300, marginRight: 5 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Enter Name or Id"
                    variant="standard"
                  />
                )}
              />
              <Button
                onClick={(e) => {
                  if (attendeeName === "") {
                    alert("Please Enter Attendee name");
                    return;
                  }
                  if (
                    attendeeList.some(found) ||
                    attendeeName === user.username
                  ) {
                  } else {
                    let isExisting = false;
                    let id = null;
                    let userFound = null;
                    //finds username in database
                    userFound = fakeUserDb.find((x) => x.name === attendeeName);

                    if (userFound !== undefined) {
                      isExisting = true;
                      id = userFound?.id;
                    }
                    const newUser = {
                      name: attendeeName,
                      existing: isExisting,
                      id: id,
                    };
                    setAttendeeList([...attendeeList, newUser]);
                    // setRefresh(!refresh)
                  }
                }}
                sx={{
                  color: "white",
                  backgroundColor: "#555555",
                  ":hover": { color: "#white", backgroundColor: "#555555" },
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
          <Box m="5px 15px 0px 15px">
            <List
              style={{ maxHeight: "200px", width: "100%", overflow: "auto" }}
              className="userList"
              dense={true}
            >
              <ListItem sx={{ p: "0px 0px 0px 20px" }}>
                <ListItemText
                  primary={user.username}
                  secondary={
                    <Typography fontSize={14} color="green">
                      Owner
                    </Typography>
                  }
                />
              </ListItem>
              {attendeeList.map((item, index) => (
                <ListItem
                  key={index}
                  sx={{ p: "0px 0px 0px 20px" }}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        deleteUser(index);
                      }}
                    >
                      <ClearIcon></ClearIcon>
                    </IconButton>
                  }
                >
                  {/* <ListItemAvatar>
                  <Avatar>
                    <PersonIcon></PersonIcon>
                  </Avatar>
                </ListItemAvatar> */}
                  <ListItemText
                    primary={item.name}
                    secondary={
                      item.existing === true ? (
                        <Typography fontSize={14} color="green">
                          Existing User:Yes{" "}
                        </Typography>
                      ) : (
                        <Typography fontSize={14} color="#555555">
                          Existing User:No{" "}
                        </Typography>
                      )
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", m: "15px" }}
          >
            <Button
              onClick={() => {
                setOpenModal1(true);
                setOpenModal2(false);
              }}
              sx={ButtonStyle1}
            >
              Back
            </Button>
            <ButtonGroup>
              <Button
                sx={ButtonStyle2}
                onClick={() => {
                  if (booking.current.computers > attendeeList.length) {
                    alert(
                      "You can't borrow computers more than the number of attendees"
                    );
                  } else {
                    console.log(booking.current);
                    setOpenModal3(true);
                    setOpenModal2(false);
                  }
                }}
              >
                Proceed
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
      {/* modal3 modal 3 */}
      <Modal
        disableAutoFocus={true}
        open={openModal3}
        onClose={() => setOpenModal3(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box sx={modalHeaderStyle}>
            <Typography
              sx={{ fontWeight: "bold" }}
              id="modal-modal-title"
              variant="h5"
              component="h2"
              fontFamily="Oswald"
              color="white"
            >
              Summary
            </Typography>
            <Button
              onClick={() => {
                setOpenModal3(false);
              }}
              sx={{ p: 0, m: 0, color: "white" }}
            >
              <CloseIcon></CloseIcon>
            </Button>
          </Box>

          <Box p={5} paddingTop={3} paddingBottom={0}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                fontFamily="Roboto Slab"
                fontSize={15}
              >
                Venue:
              </Typography>
              <Typography
                fontWeight="bold"
                fontFamily="Roboto Slab"
                fontSize={15}
              >
                {booking.current.venue}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                Date:
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                {moment(booking.current.date).format("MMMM D Y")}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                Start Time:
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                {booking.current.startTime}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                End Time:
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                {booking.current.endTime}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                Title:
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                {booking.current.description}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                Office Name:
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                {booking.current.officeName}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                Purpose:
              </Typography>
              <Typography
                fontWeight="bold"
                fontSize={15}
                fontFamily="Roboto Slab"
              >
                {booking.current.purpose}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                fontWeight="bold"
                marginBottom="0px"
                fontFamily="Roboto Slab"
                fontSize={15}
              >
                No. of Computers:
              </Typography>
              <Typography
                fontWeight="bold"
                marginBottom="0px"
                fontFamily="Roboto Slab"
                fontSize={15}
              >
                {booking.current.computers}
              </Typography>
            </Box>
            <br></br>
            <Typography
              fontWeight="bold"
              marginTop="0px"
              fontFamily="Oswald"
              backgroundColor="black"
              sx={{ float: "left", transform: "rotate(-5deg)" }}
              p="5px 10px 5px 10px"
              color="white"
            >
              Attendees
            </Typography>
            <List
              className="userList"
              dense={true}
              style={{ maxHeight: "150px", width: "100%", overflow: "auto" }}
            >
              <React.Fragment>
                <ListItem m={0}>
                  <ListItemText
                    fontSize="12px"
                    primary={user.username}
                    // secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
              {attendeeList.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem m={0} key={index}>
                    <ListItemText
                      fontSize="12px"
                      primary={item.name}
                      // secondary={secondary ? 'Secondary text' : null}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Box>
          <Box
            sx={{
              margin: "10px 15px 15px 15px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={() => {
                setOpenModal3(false);
                setOpenModal2(true);
              }}
              sx={ButtonStyle1}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                alert("booking created");
                booking.current.attendees = attendeeList;
                let toSubmit = booking.current;
                toSubmit.attendees = [
                  ...toSubmit.attendees,
                  { name: user.username, id: user.id },
                ];

                console.log(toSubmit);
              }}
              sx={ButtonStyle2}
            >
              Book
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
