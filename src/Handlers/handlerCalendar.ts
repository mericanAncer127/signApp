import { confirmAlert } from "react-confirm-alert";
import { MyEvent } from "../types";
import dayjs from "dayjs";
import {
  BaseEvent,
  sendCreateEventRequest,
  sendDeleteEventRequest,
  sendUpdateEventRequest,
} from "../store/request";
import { createEvent, deleteEvent, updateEvent } from "../store/eventSlice";

export const SaveEventHandler = (
  newEvent: any,
  myEvents: MyEvent[],
  dispatch: any,
  handleClose: any
) => {
  const existingEvents = myEvents.filter(
    (event: MyEvent) => event.id === newEvent._id
  );
  if (newEvent.description === "") {
    confirmAlert({
      overlayClassName: "overlay-confirm-alert",
      title: "Error",
      message: "Description Field is Empty. Fill in this field before saving.",
      buttons: [
        {
          label: "OK",
          onClick: () => {
            console.log("ok");
          },
        },
      ],
    });
  } else if (newEvent.price === undefined || newEvent.price === 0) {
    confirmAlert({
      overlayClassName: "overlay-confirm-alert",
      title: "Error",
      message: "Price must be higher than 1.",
      buttons: [
        {
          label: "OK",
          onClick: () => {
            console.log("ok");
          },
        },
      ],
    });
  } else if (dayjs(newEvent.start).isAfter(dayjs(newEvent.end))) {
    confirmAlert({
      overlayClassName: "overlay-confirm-alert",
      title: "Error",
      message: "Start Date & Time must be earlier than End.",
      buttons: [
        {
          label: "OK",
          onClick: () => {
            console.log("ok");
          },
        },
      ],
    });
  } else if (existingEvents.length) {
    //will update
    const ex_event = existingEvents[0];
    confirmAlert({
      overlayClassName: "overlay-confirm-alert",
      title: "Confirm Update Event",
      message:
        "Some attributes changed within this event. Are you sure to update this Event?",
      buttons: [
        {
          label: "Cancel",
          onClick: handleClose,
        },
        {
          label: "OK",
          onClick: () => {
            sendUpdateEventRequest(ex_event?.id || "", {
              ...ex_event,
              start: newEvent.start,
              end: newEvent.end,
              description: newEvent.description,
              price: newEvent.price,
            })
              .then((res) => res.data)
              .then((_updatedEvent) => {
                const updatedEvent: any = {
                  ...ex_event,
                  start: newEvent.start,
                  end: newEvent.end,
                  description: newEvent.description,
                  title: newEvent.description,
                  price: newEvent.price,
                };
                dispatch(updateEvent(updatedEvent));
              });
            handleClose();
          },
        },
      ],
    });
  } else {
    //will create new one
    sendCreateEventRequest({
      _id: "",
      description: newEvent.description,
      price: newEvent.price,
      start: newEvent.start,
      end: newEvent.end,
    })
      .then((res) => res.data)
      .then((createdEvnt) => {
        const event: any = {
          id: createdEvnt._id,
          description: createdEvnt.description,
          title: createdEvnt.description,
          price: createdEvnt.price,
          start: new Date(createdEvnt.start),
          end: new Date(createdEvnt.end),
          allDay: false,
        };
        dispatch(createEvent(event));
        confirmAlert({
          overlayClassName: "overlay-confirm-alert",
          title: "Created New Event",
          message: "Your recent Eent is Created newly",
          buttons: [
            {
              label: "OK",
              onClick: handleClose,
            },
          ],
        });
      })
      .catch((err: any) => {
        console.log("create err", err);
      });
  }
};

export const EventDeleteHandler = (
  event: any,
  dispatch: any,
  handleClose: any
) => {
  if (event.id != "") {
    // will delete
    confirmAlert({
      overlayClassName: "overlay-confirm-alert",
      title: "Remove Event",
      message: "Are you sure to remove this event?",
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            console.log("Cancel");
          },
        },
        {
          label: "OK",
          onClick: () => {
            sendDeleteEventRequest(event.id)
              .then((res) => {
                dispatch(deleteEvent(event.id));
              })
              .catch((err) => console.log(err));
            handleClose();
          },
        },
      ],
    });
  }
};
