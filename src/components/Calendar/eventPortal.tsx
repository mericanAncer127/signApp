import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import dayjs, { Dayjs } from "dayjs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  styled,
  Button,
  TextField,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import MyDateTimePicker from "./myDateTimePicker";
import { BaseEvent } from "../../store/request";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const InputSection = styled(Box)({
  margin: 15,
});

interface EventPortalProps {
  id: string;
  title: string;
  start: Date;
  end: Date;
  open: boolean;
  baseDescription: string;
  basePrice: number;
  handleClose: () => void;
  handleDelete: () => void;
  handleSave: (baseEvent: BaseEvent) => void;
}

const RenderNewEventCard: React.FC<EventPortalProps> = (props) => {
  const {
    id,
    open,
    handleClose,
    handleDelete,
    start,
    end,
    handleSave,
    baseDescription,
    basePrice,
    title,
  } = props;

  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(
    dayjs(start)
  );
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(dayjs(end));
  const [description, setDescription] = useState<string>(baseDescription);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setDescription(baseDescription);
    setPrice(basePrice);
    setStartDateTime(dayjs(start));
    setEndDateTime(dayjs(end));
  }, [open]);

  const handleStartDateTimeChange = (newValue: Dayjs | null) => {
    setStartDateTime(newValue);
  };
  const handleEndDateTimeChange = (newValue: Dayjs | null) => {
    setEndDateTime(newValue);
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={handleDelete}
          sx={{
            position: "absolute",
            right: 40,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <DeleteIcon />
        </IconButton>
        <DialogContent dividers>
          <InputSection>
            <MyDateTimePicker
              label="Start Date & Time"
              value={startDateTime}
              handleChange={handleStartDateTimeChange}
            />
          </InputSection>
          <InputSection>
            <MyDateTimePicker
              label="End Date & Time"
              value={endDateTime}
              handleChange={handleEndDateTimeChange}
            />
          </InputSection>
          <InputSection>
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              minRows={2}
              fullWidth
              multiline
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputSection>
          <InputSection>
            <TextField
              id="outlined-basic"
              label="Price"
              variant="outlined"
              type="number"
              value={price}
              onChange={(e) => {
                const newPrice = parseFloat(e.target.value); // Parse the input value to a number
                setPrice(isNaN(newPrice) ? 0 : newPrice); // Ensure newPrice is not NaN
              }}
            />
          </InputSection>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() =>
              handleSave({
                _id: id,
                description: description,
                price: price,
                start: startDateTime?.toDate() || new Date(),
                end: endDateTime?.toDate() || new Date(),
              })
            }
          >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

const EventPortal: React.FC<EventPortalProps> = (props) => {
  return (
    <div>{createPortal(<RenderNewEventCard {...props} />, document.body)}</div>
  );
};

export default EventPortal;
