import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { events } from "../data/seed";
import { useState, useEffect } from "react";
import { Event } from "../types/events";

function TempTable(): JSX.Element {
  const [data, setData] = useState<Event[]>([]);
  useEffect(() => {
    setData(events);
  }, []);
  const toast = useToast();

  // Function to copy event organizer's email
  const handleCopy = async (event: Event) => {
    await navigator.clipboard.writeText(event.organizer.email);
    //Pop up to alert user they copied the email
    toast({
      title: "email copied!",
      status: "success",
      isClosable: true,
      duration: 750,
    });
  };
  const formatDate = (event: Event, calType: string) => {
    const date = event.date;
    const [month, day, year] = date.split("/");
    let formattedDate = "";
    if (calType == "google") {
      formattedDate = `${year}${month}${day}`;
    } else {
      formattedDate = `${year}-${month}-${day}`;
    }
    return formattedDate;
  };

  return (
    <>
      <TableContainer>
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Event Name</Th>
              <Th>Organizer</Th>
              <Th>Date</Th>
              <Th>Location</Th>
              <Th>Budget</Th>
              <Th>Type Of Event</Th>
            </Tr>
          </Thead>

          {data.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <Tbody>
              {" "}
              {data.map((event) => (
                <Tr>
                  <Th>{event.name}</Th>
                  <Th>
                    <Tooltip label={event.organizer.email}>
                      <span
                        onClick={() => {
                          handleCopy(event);
                        }}
                      >
                        {event.organizer.name}
                      </span>
                    </Tooltip>
                  </Th>
                  <Th>
                    <Tooltip label="Add event to calendar">
                      <div>
                        {event.date}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "20px",
                          }}
                        >
                          <div style={{ width: "20px" }}>
                            <a
                              href={`https://calendar.google.com/calendar/r/eventedit?text=${event.name}&dates=${formatDate(event, "google")}/${formatDate(event, "google")}&details=Event+organized+by+${event.organizer.name}&location=${event.location}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"></img>
                            </a>
                          </div>
                          <div style={{ width: "20px" }}>
                            <a
                              href={`https://outlook.office.com/calendar/action/compose?subject=${event.name}g&startdt=${formatDate(event, "outlook")}&allday=true&location=${event.location}&body=Event%20organized%20by%20${event.organizer.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg/1101px-Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg.png"></img>
                            </a>
                          </div>
                        </div>
                      </div>
                    </Tooltip>
                  </Th>
                  <Th>{event.location}</Th>
                  <Th>${event.budget}</Th>
                  <Th>{event.eventType}</Th>
                </Tr>
              ))}
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default TempTable;
