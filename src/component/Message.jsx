import { useContext, useEffect, useState } from "react";
import { searchcity } from "../assets/message";
import { notfound } from "../assets/message";
import { User } from "../Context";
import { locationn } from "../assets/weather";
export default function Message() {
    const photo = useContext(User)

    // const [locationn, setLocationn] = useState(null);
    // const [city, setCity] = useState("");
    // const [error, setError] = useState(null);

    // const getLocation = () => {
    //     if ("geolocation" in navigator) {
    //         navigator.geolocation.getCurrentPosition(
    //             async (position) => {
    //                 const { latitude, longitude } = position.coords;
    //                 setLocationn({ lat: latitude, lon: longitude });

    //                 try {
    //                     // استدعاء API للحصول على اسم المدينة
    //                     const response = await fetch(
    //                         `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    //                     );
    //                     const data = await response.json();
    //                     if (data.address && data.address.city) {
    //                         setCity(data.address.city);
    //                         console.log(city)
    //                     } else {
    //                         setCity("لم يتم العثور على المدينة");
    //                     }
    //                 } catch (error) {
    //                     setCity("حدث خطأ أثناء جلب البيانات");
    //                 }

    //                 setError(null);
    //             },
    //             (error) => {
    //                 setError("لا يمكن تحديد الموقع. الرجاء السماح بالوصول إلى الموقع.");
    //             }
    //         );
    //     } else {
    //         setError("المتصفح لا يدعم تحديد الموقع الجغرافي.");
    //     }
    // };






  const [location, setLocation] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });

          try {
            // استخدام OpenStreetMap للحصول على اسم المدينة
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.address && (data.address.city || data.address.town || data.address.village)) {
              setCity(data.address.city || data.address.town);
              console.log(city)
            } else {
              setCity("لم يتم العثور على المدينة");
            }
          } catch (error) {
            setCity("حدث خطأ أثناء جلب البيانات");
          }

          setError(null);
        },
        (error) => {
          setError("لا يمكن تحديد الموقع. الرجاء السماح بالوصول إلى الموقع.");
        }
      );
    } else {
      setError("المتصفح لا يدعم تحديد الموقع الجغرافي.");
    }
  };





  useEffect(() => {
    if (city) {
      console.log("مدينة المستخدم:", city);  // سيتم تسجيل اسم المدينة بعد التحديث
    }
  }, [city]);  // هذا سيعمل عندما تتغير قيمة `city`



navigator.geolocation.getCurrentPosition(
    (position) => console.log("📍 الموقع:", position.coords),
    (error) => console.error("⚠️ خطأ في تحديد الموقع:", error)
);


    return (
        <section className="text-white flex flex-col items-center pt-16">
            <img src={photo.sh === null ? searchcity : notfound} alt="searchcity"
                className="w-[200px] "
            />
            <p className="text-[26px] font-medium mt-5 text-center" >Search City</p>
            <p className="text-[18px] font-medium" >or</p>
            <p className="text-center font-medium text-[14px]">Discover the weather conditions based on your location.</p>

            <button
                onClick={getLocation}

                className="btn">
                <img src={locationn} />
            </button>
        </section>
    )
}