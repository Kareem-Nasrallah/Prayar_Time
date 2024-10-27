import maiBg from "/bg.jpg";
import Prayer from "./compoets/Prayers";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("Cairo");
  const [today, setToday] = useState("");
  const [prayersTime, setPrayersTime] = useState({});

  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "الجيزة", value: "Giza" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "أسوان", value: "Aswa" },
    { name: "الأقصر", value: "Luxor" },
  ];

  useEffect(() => {
    const thisDay = new Date();
    const day = `${thisDay.getDate()}`.padStart(2, "0");
    const month = `${thisDay.getMonth() + 1}`.padStart(2, "0");
    const year = thisDay.getFullYear();
    const tryIt = `${day}-${month}-${year}`;
    setToday(tryIt);

    const axiosFunc = async () => {
      try {
        const data = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity/${tryIt}?city=Eg&country=${city}`
        );
        setPrayersTime(data.data.data.timings);
      } catch (err) {
        console.error("Error fetching prayer times:", err);
      }
    };
    axiosFunc();
  }, [city]);
  console.log(prayersTime);

  const formatPrayerTime = (time) => {
    if (!time) {
      return "00:00";
    }
    let [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    hours = String(hours % 12 || 12).padStart(2, "0");
    return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  return (
    <div
      className="vw-100 vh-100 d-flex align-items-center"
      style={{
        backgroundImage: `url(${maiBg})`,
        backgroundPosition: "30%, 50%",
        backgroundSize: "cover",
      }}
    >
      <div className="text-light px-4 mainBox">
        <div
          className="row gap-4 py-4"
          style={{
            borderBottom: "solid 1px #ffffff3e",
          }}
        >
          <div className="col p-0">
            <h2 className="fs-5">المدينة</h2>
            <select
              className="py-2 px-1 text-light w-100 fw-bold"
              style={{
                background: "#bb5629",
                borderRadius: "5px",
                letterSpacing: "1px",
                outline: "none",
              }}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            >
              {cities.map((onecity) => (
                <option key={onecity.value} value={onecity.value}>
                  {onecity.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col p-0">
            <h2 className="fs-5">التاريخ</h2>
            <p
              className="m-0 py-2"
              style={{ fontWeight: "600", letterSpacing: "1px" }}
            >
              {today}
            </p>
          </div>
        </div>
        <div className="row py-4 gap-3">
          <Prayer name="الفجر:" time={formatPrayerTime(prayersTime.Fajr)} />
          <Prayer name="الظهر:" time={formatPrayerTime(prayersTime.Dhuhr)} />
          <Prayer name="العصر:" time={formatPrayerTime(prayersTime.Asr)} />
          <Prayer name="المغرب:" time={formatPrayerTime(prayersTime.Maghrib)} />
          <Prayer name="العشاء:" time={formatPrayerTime(prayersTime.Isha)} />
        </div>
      </div>
    </div>
  );
}

export default App;
