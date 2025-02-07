




import { useContext, useEffect, useRef, useState } from "react";
import { search } from "../assets/weather";
import axios from "axios";
import { Data, User } from "../Context";

export default function Search() {
    const key = "a63df7afb6a4e89a8ce94864b8626deb";
    const inputref = useRef(null);
    const firstRender = useRef(true);
    const [loading, setloading] = useState(false)
    const [inputsearch, setinputsearch] = useState("");
    const [res, setres] = useState(false); // جعل القيمة الافتراضية `false`

    const hussen = useContext(User);
    const weather = useContext(Data)

    function handleinput(event) {
        setinputsearch(event.target.value);
        hussen.setsh(null);

    }

    function handleKeyDown(event) {
        if (event.key === "Enter" && inputsearch.trim() !== "") {
            setres(prev => !prev);
            inputref.current.blur();
        }
    }

    function handleclickbtn() {
        if (inputsearch.trim() !== "") {
            setres(prev => !prev);
            inputref.current.blur();
        }
    }




    function formatDate(dateString) {
        const date = new Date(dateString.replace(" ", "T")); // تحويل النص إلى كائن Date
        const options = { weekday: 'short', day: '2-digit', month: 'short' };
        return date.toLocaleDateString('en-GB', options);
    }

    function formatTime(dateString) {
        const date = new Date(dateString.replace(" ", "T")); // تحويل النص إلى كائن Date
        const options = { weekday: 'long' };
        return date.toLocaleDateString('en-GB', options);
    }
    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (!inputsearch.trim()) return;

        setloading(true);

        Promise.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputsearch}&appid=${key}&units=metric`),
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${inputsearch}&appid=${key}&units=metric`)
        ])
            .then(([weatherResponse, forecastResponse]) => {
                console.log(weatherResponse.data);
                console.log(forecastResponse.data);




                const forecastData = forecastResponse.data.list
                    .filter((item, index) => [1, 10, 18, 26, 34].includes(index)) 
                    .map(item => ({
                        time: formatTime(item.dt_txt),
                        temp: item.main.temp,
                        id: item.weather[0].id,
                    }));

                const formattedTime = formatDate(forecastResponse.data.list[0].dt_txt);

                weather.setweather({
                    "country": weatherResponse.data.name,
                    "temp": weatherResponse.data.main.temp,
                    "humidity": weatherResponse.data.main.humidity,
                    "windspeed": weatherResponse.data.wind.speed,
                    "id": weatherResponse.data.weather[0].id,
                    "description": weatherResponse.data.weather[0].description,
                    "time": formattedTime,
                    "forecast": forecastData

                });

                hussen.setsh(true);
            })
            .catch(error => {
                console.log(error);
                hussen.setsh(false);
            })
            .finally(() => {
                setinputsearch("");
                setloading(false);
            });

    }, [res]);

    return (
        <section className="w-full relative">
            <input
                type="text"
                ref={inputref}
                className="w-full bg-bla px-[16px] py-[10px] rounded-[99px] search outline-none text-white pr-[50px] cursor-pointer"
                placeholder="Search city..."
                value={inputsearch}
                onChange={handleinput}
                onKeyDown={handleKeyDown}
            />

            {!loading ? <img
                src={search}
                alt="search"
                className="absolute top-[25%] right-[15px] cursor-pointer"
                onClick={handleclickbtn}
            /> :
                <div
                    className="absolute top-[25%] right-[15px] cursor-pointer"

                >
                    <div class="dot-spinner">
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div className="dot-spinner__dot"></div>
                        <div class="dot-spinner__dot"></div>
                    </div>
                </div>}

        </section>
    );
}
