import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector({ selectedDate, setSelectedDate }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Select Date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        maxDate={new Date()}
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
}

export default DateSelector;
