import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateSelector({ selectedDate, setSelectedDate }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label>Select Date: </label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()} // no past dates
        maxDate={new Date(Date.now() + 6 * 86400000)} // next 7 days only
      />
    </div>
  );
}

export default DateSelector;
