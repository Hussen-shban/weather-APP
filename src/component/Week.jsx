import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { atmosphere, celsius, clear, clouds, drizzle, rain, snow, thunderstorm } from "../assets/weather";
import { Data } from "../Context";
import { useContext, useEffect } from "react";

export default function Week() {



    const weather = useContext(Data).weather
    
    useEffect(() => {
        console.log(containt)

        console.log("✅ تم تحديث data.weather:", weather.forecast);
    }, [weather]); // سيتم تشغيل هذا الـ useEffect عند كل تغيير في `hussen.sh`
    
    const containt= weather.forecast?.map((item,index) =>(

        <SwiperSlide >

        <div className="flex flex-col items-center
                        text-[15px] text-white
                        gap-[6px] bgweek
                        " >
            <p className="pl-[2px]  text-nowrap">{item.time}</p>
            <img
                className="w-[35px] h-[35px]"
                src={weatherphoto(item.id)} alt="" />
            <div className=" flex items-center gap-[1px]">
                <p className=" font-medium">{item.temp}</p>
                <img
                    className="w-[16px] h-[16px]"
                    src={celsius} alt="celsius" />

            </div>


        </div>



    </SwiperSlide>


    ))
    function weatherphoto (id){
        if (id <= 232) return thunderstorm
        if (id <= 321) return drizzle
        if (id <= 531) return rain
        if (id <= 622) return snow
        if (id <= 781) return atmosphere
        if (id <= 800) return clear
        else return clouds

    }


    return (
        <section className="mt-7">
            <Swiper
                className=""
                modules={[Navigation,  Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={3}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
            >
                {containt}

            </Swiper>
        </section>
    )
}