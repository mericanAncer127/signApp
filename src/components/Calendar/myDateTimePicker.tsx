import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface MyDataRangePickerProps {
  label: string;
  value: Dayjs | null;
  handleChange: (newValue: Dayjs | null) => void;
}

const MyDateTimePicker: React.FC<MyDataRangePickerProps> = (props) => {
  const { label, value, handleChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker label={label} value={value} onChange={handleChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MyDateTimePicker;
