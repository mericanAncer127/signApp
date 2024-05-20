import * as React from "react";
import { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface MyDataRangePickerProps {
  label: string;
  value: Dayjs | null;
  handleChange: (newValue: Dayjs | null) => void;
}

const MyDatePicker: React.FC<MyDataRangePickerProps> = (props) => {
  const { label, value, handleChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DatePicker label={label} value={value} onChange={handleChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MyDatePicker;
