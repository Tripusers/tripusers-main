"use client";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from "react";
import "./style.scss";
const DatePickerInput = ({
  ...props
}:
  | DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  | any) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen((prev) => !prev);
  const [value, setValue] = useState<string>();

  const date = new Date();
  const currentMonth = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
  const currentDate = date.getDate();
  const currentYear = date.getFullYear();
  const [data, setData] = useState({
    dd: currentDate,
    yyy: currentYear,
    mm: currentMonth,
  });
  const generateCalendarDates = () => {
    const daysInMonth = new Date(data.yyy, data.mm, 0).getDate();
    const dates = [];

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }

    return dates;
  };
  useEffect(() => {
    if (
      `${data.dd}/${data.mm}/${data.yyy}` !=
      `${currentDate}/${currentMonth}/${currentYear}`
    ) {
      props.setValue("date", `${data.dd}/${data.mm}/${data.yyy}`);
      setValue(`${data.dd}/${data.mm}/${data.yyy}`);
    }
  }, [data.dd]);

  // console.log(data);
  // console.log("date ==>", new Date(data.yyy, data.mm - 1, 1), data);

  return (
    <div className="date-picker-container">
      <input
        {...props}
        className="date-picker-input"
        onFocus={handleOpen}
        value={value}
        autoCorrect={false}
        autoComplete="off"
      />
      {open && (
        <div className={`calendar ${open ? "visible" : null}`}>
          <div className="buttons">
            <select
              value={data.mm}
              onChange={(e) => {
                // console.log(e.target.value);
                setData((prv) => ({
                  ...prv,
                  mm: parseInt(e.target.value),
                }));
              }}
            >
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((v, i) => (
                <option value={i + 1}>{v}</option>
              ))}
            </select>

            <select
              onChange={(e) => {
                const yy = e.currentTarget.value;
                console.log(yy);

                setData((prev) => ({
                  ...prev,
                  yyy: parseInt(yy || ""),
                }));
              }}
            >
              <option value={currentYear}>{currentYear}</option>
              {[...new Array(100)].map((v, i) => (
                <option key={i} value={currentYear + i + 1}>
                  {currentYear + i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((v) => (
              <span style={{ color: v == "Sun" ? "tomato" : "" }}>{v}</span>
            ))}
            {[
              ...new Array(new Date(data.yyy, data.mm - 1, 1).getDay()).fill(
                ""
              ),
            ].map((v, i) => (
              <span key={i}></span>
            ))}
            {generateCalendarDates().map((date, index) => (
              <span
                className={
                  new Date(data.yyy, data.mm - 1, date).getTime() < Date.now()
                    ? "date dis"
                    : "date"
                }
                style={{
                  color:
                    new Date(data.yyy, data.mm - 1, date).getTime() < Date.now()
                      ? "#8080807a"
                      : "",
                }}
                key={index}
                onClick={() => {
                  if (
                    new Date(data.yyy, data.mm - 1, date).getTime() >=
                    Date.now()
                  ) {
                    setData((prv) => ({ ...prv, dd: date }));
                    setOpen(false);
                  }
                }}
              >
                {date}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerInput;
