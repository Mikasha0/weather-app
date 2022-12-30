import { useRef, useState } from "react";

const Api_key = "5c86490ff1685b81ccc2dcc182a48a32";

function App() {
  const inputRef = useRef(null);
  const [apiData, setApiData] = useState(null);
  const [showWeather, setShowWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const WeatherTypes = [
    {
      type: "Clear",
      img: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
    },
    {
      type: "Rain",
      img: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
    },
    {
      type: "Snow",
      img: "https://cdn-icons-png.flaticon.com/512/642/642102.png",
    },
    {
      type: "Clouds",
      img: "https://cdn-icons-png.flaticon.com/512/414/414825.png",
    },
    {
      type: "Haze",
      img: "https://cdn-icons-png.flaticon.com/512/1197/1197102.png",
    },
    {
      type: "Smoke",
      img: "https://cdn-icons-png.flaticon.com/512/4380/4380458.png",
    },
    {
      type: "Mist",
      img: "https://cdn-icons-png.flaticon.com/512/4005/4005901.png",
    },
    {
      type: "Drizzle",
      img: "https://cdn-icons-png.flaticon.com/512/3076/3076129.png",
    },
  ];

  const fetchWeather = async () => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputRef.current.value}&units=metric&appid=${Api_key}`;
    setLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setApiData(null);
        setShowWeather(
          WeatherTypes.filter(
            (weather) => weather.type === data.weather[0].main
          )
        );
        console.log(data);
        setApiData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    console.log(inputRef.current.value);
  };

  return (
    <div className="bg-gray-800 h-screen grid place-items-center">
      <div className="bg-white w-96 p-4 rounded-md">
        <div className="flex items-center justify-between">
          <input
            type="text"
            ref={inputRef}
            placeholder="Enter Your Location"
            className="text-xl border-b p-1 border-gray-200"
          />
          <button onClick={fetchWeather}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/758/758651.png"
              alt="..."
              className="w-8"
            />
          </button>
        </div>
        <div className="h-[27rem]">
         {loading ? ( <div className="grid place-items-center h-full">
          <img src="https://cdn-icons-png.flaticon.com/512/1477/1477009.png" 
          alt="..."
          className="w-14 mx-auto mb-2 animate-spin"/>
         </div> ):(showWeather && <div className="text-center flex flex-col gap-6 mt-10">
          {
            apiData && <p className="text-xl font-semibold">{apiData?.name + ',' + apiData?.sys.country}</p>
          }
            
            <img src={showWeather[0]?.img} alt="..." className="w-52 mx-auto" />
            <h3 className="text-2xl font-bold text-zinc-800">
              {showWeather[0]?.type}
            </h3>
            {apiData && (
            <>
              <div className="flex justify-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7794/7794499.png"
                  alt="..."
                  className="h-9 mt-1"
                />
                <h2 className="text-4xl font-extra">
                {apiData?.main?.temp}&#176;C
                </h2>
              </div>
            </>)}
          </div>)}
        </div>
      </div>
    </div>
  );
}

export default App;