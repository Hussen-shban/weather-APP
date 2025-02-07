import { useContext, useEffect } from "react"
import { air, atmosphere, celsius, clear, clouds, drizzle, locationn, rain, snow, thunderstorm, water } from "../assets/weather"
import { Data } from "../Context"
export default function Condition() {

    const weather = useContext(Data).weather
    


    function weatherphoto (){
        if (weather.id <= 232) return thunderstorm
        if (weather.id <= 321) return drizzle
        if (weather.id <= 531) return rain
        if (weather.id <= 622) return snow
        if (weather.id <= 781) return atmosphere
        if (weather.id <= 800) return clear
        else return clouds

    }
    return (

        
        <section className="mt-[25px] text-white flex flex-col gap-[25px]" >


            <div className="flex items-center justify-between" >
                <div className="flex items-center gap-[6px] ">
                    <img src={locationn} alt="" />
                    <p className=" font-medium
                                     text-[18px]
                    ">
                       {weather.country}
                    </p>
                </div>
                <p className=" font-medium">
                    {weather.time}
                </p>


            </div>



            <div className="flex items-center justify-between">

                <img src={weatherphoto()} alt="condition" />

                <div className="flex flex-col items-center" >
                    <p
                        className="flex items-center text-[24px]
                               font-semibold gap-[px]      
                    "
                    >
                        {weather.temp}
                        <img
                            className=""
                            src={celsius} alt="celsius" />

                    </p>
                    <p
                        className="text-[16px] font-medium"
                    >{weather.description}</p>
                </div>

            </div>

            <div className="flex items-center justify-between
            text-[14px]
            ">


                <div className="flex items-center gap-1 ">
                    <img src={water} alt="water" />
                    <div>
                        <p  >Humidity</p>
                        <p>{weather.humidity}%</p>
                    </div>


                </div>


                <div className="flex items-center gap-1">
                    <img src={air} alt="water" />
                    <div>
                        <p>Wind Speed</p>
                        <p>{weather.windspeed} M/s</p>
                    </div>


                </div>


            </div>

        </section>
    )
}