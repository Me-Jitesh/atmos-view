import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function DateRangeSelector({ setRange }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleChange = (item) => {
    setState([item.selection]);

    const formatDate = (date) =>
      new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split("T")[0];

    const start = formatDate(item.selection.startDate);
    const end = formatDate(item.selection.endDate);

    setRange({ start, end });
  };

  return (
    <DateRange
      editableDateInputs
      onChange={handleChange}
      moveRangeOnFirstSelection={false}
      ranges={state}
      maxDate={new Date()}
    />
  );
}

export default DateRangeSelector;
