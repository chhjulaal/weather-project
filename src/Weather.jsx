import { use, useEffect, useState } from "react";
// import { MyAppNav } from "./Navbar";
import "./Weather.css";
import { FaArrowRight, FaCalendar, FaMap, FaSearch } from "react-icons/fa";

function Weather() {
  const [data, setData] = useState([]);
  const [city, setCity] = useState("Bhopal");
  const [selectedData, setSelectedData] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // fetching data
  const handeData = async () => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=e4082a1cfae742f68e8132515250407&q=${city}&days=7&aqi=yes&alerts=yes`;
    try {
      let response = await fetch(url);
      response = await response.json();
      await new Promise((res) => setTimeout(res, 2000));
      // console.log(response);
      setData(response);
    } catch (error) {
      console.error("Failed to fetch weather data:", error);
    }
  };

  useEffect(() => {
    handeData();
  }, [city]);

  const handelCity = (e) => {
    setCity(e);
  };
  // console.log(data);

  useEffect(() => {
    setSelectedData(data?.forecast?.forecastday[0]);
    setSelectedDate(data?.forecast?.forecastday[0].date);
    console.log(selectedData);
  }, [data]);

  const handelSelectedWeather = (index) => {
    // console.log(selectedData);
    setSelectedData(data?.forecast?.forecastday[index]);
    setSelectedDate(data?.forecast?.forecastday[index].date);
    // console.log(selectedData?.hour?.[0]?.cloud ?? "Cloud data not available");
  };
  const getDay = (e) => {
    let day = new Date(e);
    let a = day.getDay(day);
    if (a == 1) {
      return "Monday";
    }
    if (a == 2) {
      return "Tuesday";
    }
    if (a == 3) {
      return "Wednesday";
    }
    if (a == 4) {
      return "Thursday";
    }
    if (a == 5) {
      return "Friday";
    }
    if (a == 6) {
      return "Saturday";
    }
    if (a == 0) {
      return "Sunday";
    }
  };

  return (
    <>
      <div>
        {/* Navbar */}
        <div className="navbar">
          <div className="location">
            <img
              src="https://cdn-icons-png.flaticon.com/128/14453/14453595.png"
              style={{ width: "20px" }}
            />
            <span style={{ color: "white" }}>{city}</span>
          </div>
          <div className="searchCity">
            <input
              placeholder="Search City"
              style={{ margin: "0px 10px" }}
              value={city}
              onChange={(e) => handelCity(e.target.value)}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/8915/8915520.png"
              style={{ width: "25px" }}
            />
          </div>
          {/* <div className="calender">
            <FaCalendar style={{ color: "white" }}></FaCalendar>
          </div> */}
        </div>
        {/*  main content start here */}
        <div className="hero">
          <div className="main-content">
            <div className="container1">
              <div className="box1">
                <div style={{ marginTop: "15px" }}>
                  <img
                    src={selectedData?.day?.condition?.icon}
                    // src={weatherIcon}
                    className="img"
                  />
                </div>
                <div className="locationDate">
                  <div style={{ margin: "20px 0px", textAlign: "start" }}>
                    <div className="locationName">
                      <h3>
                        {data?.location?.name}, {data?.location?.country}
                      </h3>
                    </div>
                    <div className="locationName">
                      <span id="datText">
                        {selectedData?.day?.condition?.text},
                        {/* Today{selectedData?.day?.conditionx`} */}
                      </span>
                      <span id="dateSpan"> {selectedDate}</span>
                    </div>
                  </div>
                  <div>
                    <h1 id="daymaxtemp_c">{selectedData?.day?.maxtemp_c}°</h1>
                  </div>
                </div>
              </div>
              <div className="box2">
                <div className="card">
                  <div style={{ color: "black" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: "10px 0px",
                      }}
                    >
                      <div>
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/12607/12607703.png"
                          className="cardImg"
                        />
                      </div>
                      <div>
                        <h1 className="cardTem">19.0°</h1>
                      </div>
                    </div>

                    <div className="DivcardDay">
                      <div style={{ margin: "0px 0px 4px 0px " }}>
                        <h3 className="cardDay">Satuarday</h3>
                      </div>
                      {/* <div>
                        <h5>Sunday</h5>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div style={{ color: "black" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        margin: "10px 0px",
                      }}
                    >
                      <div>
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/12607/12607703.png"
                          className="cardImg"
                        />
                      </div>
                      <div>
                        <h1 className="cardTem">17.3°</h1>
                      </div>
                    </div>

                    <div className="DivcardDay">
                      <div style={{ margin: "0px 0px 4px 0px " }}>
                        <h3 className="cardDay">Satuday</h3>
                      </div>
                      {/* <div>
                        <h5>Sunday</h5>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container2">
              <div style={{ margin: "10px" }}>
                <h2>Today's Highlights</h2>
              </div>
              <div>
                <div className="main-content-todays">
                  <div className="todaysHighlight">
                    <div>
                      <img
                        src="https://github.com/uginemedia/Build-a-complete-weather-application-in-react-js/blob/master/src/assets/ultraviolet.png?raw=true"
                        style={{ width: "50px" }}
                      />
                    </div>
                    <div>
                      <div>
                        <h3>Feel Like</h3>
                      </div>
                      <div>
                        <h5>
                          {selectedData?.day?.air_quality?.["us-epa-index"] == 1
                            ? "Good"
                            : selectedData?.day?.air_quality?.[
                                "us-epa-index"
                              ] == 2
                            ? "Moderate"
                            : selectedData?.day?.air_quality?.[
                                "us-epa-index"
                              ] == 3
                            ? "Sensitive Groups"
                            : selectedData?.day?.air_quality?.[
                                "us-epa-index"
                              ] == 4
                            ? "Unhealthy"
                            : selectedData?.day?.air_quality?.[
                                "us-epa-index"
                              ] == 5
                            ? "Very Unhealthy"
                            : selectedData?.day?.air_quality?.[
                                "us-epa-index"
                              ] == 6
                            ? "Hazardous"
                            : "Good"}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <h1>{selectedData?.day?.avgtemp_c}°</h1>
                    </div>
                  </div>{" "}
                  <div className="todaysHighlight">
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/17798/17798807.png"
                        style={{ width: "50px" }}
                      />
                    </div>
                    <div>
                      <div>
                        <h3>Cloud</h3>
                      </div>
                      <div>
                        <h5>
                          {selectedData?.hour?.[0]?.cloud <= 10
                            ? "Clear"
                            : selectedData?.hour?.[0]?.cloud <= 30
                            ? "Mostly Clear"
                            : selectedData?.hour?.[0]?.cloud <= 50
                            ? "Partly Cloudy"
                            : selectedData?.hour?.[0]?.cloud <= 70
                            ? "Mostly Cloudy"
                            : selectedData?.hour?.[0]?.cloud <= 90
                            ? "Very Cloudy"
                            : "Overcast"}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <h1>{selectedData?.hour?.[0]?.cloud}°</h1>
                    </div>
                  </div>{" "}
                  <div className="todaysHighlight">
                    <div>
                      <img
                        src="https://github.com/uginemedia/Build-a-complete-weather-application-in-react-js/blob/master/src/assets/rain.png?raw=true"
                        style={{ width: "50px" }}
                      />
                    </div>
                    <div>
                      <div>
                        <h3>Rain</h3>
                      </div>
                      <div>
                        <h5>{selectedData?.day?.condition?.text}</h5>
                      </div>
                    </div>
                    <div>
                      <h1>{selectedData?.day?.daily_chance_of_rain}°</h1>
                    </div>
                  </div>
                </div>
                <div className="main-content-todays">
                  <div className="todaysHighlight">
                    <div>
                      <img
                        src="https://github.com/uginemedia/Build-a-complete-weather-application-in-react-js/blob/master/src/assets/drops.png?raw=true"
                        style={{ width: "50px" }}
                      />
                    </div>
                    <div>
                      <div>
                        <h3>Humidity</h3>
                      </div>
                      <div>
                        <h5>
                          {selectedData?.day?.avghumidity <= 20
                            ? " Extremely Dry Air"
                            : selectedData?.day?.avghumidity <= 30
                            ? " Low Humidity (Dry)"
                            : selectedData?.day?.avghumidity <= 50
                            ? "Comfortable / Ideal"
                            : selectedData?.day?.avghumidity <= 60
                            ? "Slightly Humid"
                            : selectedData?.day?.avghumidity <= 70
                            ? " Humid"
                            : selectedData?.day?.avghumidity <= 80
                            ? " Very Humid"
                            : "  Saturated"}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <h1>{selectedData?.day?.avghumidity}°</h1>
                    </div>
                  </div>{" "}
                  <div className="todaysHighlight">
                    <div>
                      <img
                        src="https://github.com/uginemedia/Build-a-complete-weather-application-in-react-js/blob/master/src/assets/ultraviolet.png?raw=true"
                        style={{ width: "50px" }}
                      />
                    </div>
                    <div>
                      <div>
                        <h3>Ultraviolet</h3>
                      </div>
                      <div>
                        <h5>
                          {selectedData?.day?.uv <= 2
                            ? "Low"
                            : selectedData?.day?.uv <= 5
                            ? "Moderate"
                            : selectedData?.day?.uv <= 7
                            ? "High"
                            : selectedData?.day?.uv <= 10
                            ? "Very High"
                            : "Extreme"}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <h1>{selectedData?.day?.uv}°</h1>
                    </div>
                  </div>{" "}
                  <div className="todaysHighlight">
                    <div>
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/9231/9231936.png"
                        style={{ width: "50px" }}
                      />
                    </div>
                    <div>
                      <div>
                        <h3>Wind Kph</h3>
                      </div>
                      <div>
                        <h5>
                          {selectedData?.day?.maxwind_kph <= 15
                            ? "Light Breeze"
                            : selectedData?.day?.maxwind_kph <= 30
                            ? "Moderate Wind"
                            : selectedData?.day?.maxwind_kph <= 50
                            ? "Strong Wind"
                            : "Very Strong Wind"}
                        </h5>
                      </div>
                    </div>
                    <div>
                      <h1>{selectedData?.day?.maxwind_kph}°</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* side bar  */}
          <div className="sidebarParent">
            <div className="sidebar">
              <div>
                <h2 style={{ color: "white" }}>Weekly Weather</h2>
              </div>
              <div>
                {data?.forecast?.forecastday?.map((item, index) => (
                  <div
                    className="otherCities"
                    key={index}
                    onClick={() => handelSelectedWeather(index)}
                  >
                    <div>
                      <img
                        src={item?.day?.condition?.icon}
                        style={{ width: "60px" }}
                      />
                    </div>
                    <div>
                      <div>
                        <h3>{getDay(item.date)}</h3>
                      </div>
                      <div>
                        <h5>{item.date}</h5>
                      </div>
                    </div>
                    <div>
                      <h1>{item?.day?.maxtemp_c}°</h1>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="see-more">
                <span style={{ margin: "0px 10px" }}>See More</span>{" "}
                <FaArrowRight size={18}></FaArrowRight>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Weather;
