import React, { useState, useEffect } from 'react';
import './styles.css';

const cities = ["Philadelphia, PA", "New York, NY", "San Francisco, CA", "Chicago, IL", "Boston, MA"];

const CityDropdown = ({ selectedCity, onSelect }) => {
  const [active, setActive] = useState(false);

  const handleClick = (city) => {
    onSelect(city);
    setActive(false);
  };

  useEffect(() => {
    const handleClickOutside = () => setActive(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="generic" onClick={(e) => e.stopPropagation()}>
      <h1>{selectedCity}</h1>
      <button className="dropdown-btn" onClick={() => setActive(!active)}>▼</button>
      {active && (
        <div className="dropdown-content active" id="dropdown">
          {cities.filter(c => c !== selectedCity).map(city => (
            <div key={city} className="city" onClick={() => handleClick(city)}>{city}</div>
          ))}
        </div>
      )}
    </div>
  );
};

const Forecast = ({ data }) => {
  return (
    <div className="hourly">
      {data.map(({ time, temp }) => (
        <div key={time} className="hour-item">
          <div className="time">{time}</div>
          <div className="temp">{temp}</div>
        </div>
      ))}
    </div>
  );
};

const Insights = ({ data }) => {
  const [rows, setRows] = useState(data);

  const handleDragStart = (index) => (e) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDrop = (index) => (e) => {
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (fromIndex !== index) {
      const updated = [...rows];
      const temp = updated[fromIndex];
      updated[fromIndex] = updated[index];
      updated[index] = temp;
      setRows(updated);
    }
  };

  return (
    <div className="container">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className="draggable-row"
          draggable
          onDragStart={handleDragStart(idx)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop(idx)}
        >
          <img src={row.img} alt="icon" /> {row.text}
        </div>
      ))}
    </div>
  );
};

const Calendar = ({ days }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <>
      <div className="month"><h2>February</h2></div>
      <div className="calendar">
        {weekdays.map(day => <div key={day} className="weekday">{day}</div>)}
        <div></div>
        {days.map(({ day, temp }) => (
          <div key={day} className="day">
            <div className="day-number">{day}</div> {temp}
          </div>
        ))}
      </div>
    </>
  );
};

const App = () => {
  const [city, setCity] = useState("Philadelphia, PA");

  const hourlyData = [
    { time: "8 AM", temp: "28°F" }, { time: "9 AM", temp: "29°F" },
    { time: "10 AM", temp: "31°F" }, { time: "11 AM", temp: "32°F" },
    { time: "12 PM", temp: "34°F" }, { time: "1 PM", temp: "36°F" },
    { time: "2 PM", temp: "37°F" }, { time: "3 PM", temp: "36°F" },
    { time: "4 PM", temp: "34°F" }, { time: "5 PM", temp: "33°F" },
  ];

  const insightsData = [
    { img: "https://openweathermap.org/img/wn/02d.png", text: "Sunset Time: 5:19 PM" },
    { img: "https://openweathermap.org/img/wn/01d.png", text: "Air Quality: Low" },
    { img: "https://openweathermap.org/img/wn/50d.png", text: "UV Index: 6 - high" },
  ];

  const calendarData = [
    { day: 1, temp: "34°F" }, { day: 2, temp: "33°F" }, { day: 3, temp: "39°F" },
    { day: 4, temp: "41°F" }, { day: 5, temp: "40°F" }, { day: 6, temp: "42°F" },
    { day: 7, temp: "44°F" }, { day: 8, temp: "52°F" }, { day: 9, temp: "48°F" },
    { day: 10, temp: "43°F" }, { day: 11, temp: "41°F" }, { day: 12, temp: "35°F" },
    { day: 13, temp: "37°F" }, { day: 14, temp: "33°F" }, { day: 15, temp: "40°F" },
    { day: 16, temp: "42°F" }, { day: 17, temp: "48°F" }, { day: 18, temp: "45°F" },
    { day: 19, temp: "40°F" }, { day: 20, temp: "39°F" }, { day: 21, temp: "32°F" },
    { day: 22, temp: "33°F" }, { day: 23, temp: "39°F" }, { day: 24, temp: "34°F" },
    { day: 25, temp: "31°F" }, { day: 26, temp: "42°F" }, { day: 27, temp: "53°F" },
    { day: 28, temp: "52°F" }, { day: 29, temp: "57°F" },
  ];

  return (
    <div>
      <CityDropdown selectedCity={city} onSelect={setCity} />
      <Forecast data={hourlyData} />
      <div className="generic"><h2>Insights</h2></div>
      <Insights data={insightsData} />
      <Calendar days={calendarData} />
    </div>
  );
};

export default App;
