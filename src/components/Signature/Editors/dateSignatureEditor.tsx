import React, { CSSProperties, useEffect, useState } from "react";
import MyDatePicker from "../../Common/myDatePicker";
import dayjs, { Dayjs } from "dayjs";
import { SignElement } from "../../../types";

interface DateSignatureEditorProps {
  sign: SignElement;
  style: CSSProperties | undefined;
  onChangeContent: (content: any) => void;
}

const DateSignatureEditor: React.FC<DateSignatureEditorProps> = (props) => {
  const { style, onChangeContent, sign } = props;
  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(
    dayjs(new Date())
  );
  useEffect(() => {
    setStartDateTime(dayjs(sign.content, "YYYY-MM-DD"));
  }, []);

  const handleStartDateTimeChange = (newValue: Dayjs | null) => {
    setStartDateTime(newValue);
    const newContent = newValue?.format("YYYY-MM-DD");
    onChangeContent(newContent);
  };
  return (
    <div style={style}>
      <MyDatePicker
        label="Pick Date"
        value={startDateTime}
        handleChange={handleStartDateTimeChange}
      />
    </div>
  );
};

export default DateSignatureEditor;
