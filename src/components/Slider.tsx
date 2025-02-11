import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [
  {
    name: "David Williams",
    review:
      "Our stay at Seaside Beach Vacations was absolutely perfect! The property was right on the beach, and we loved waking up to the sound of the waves every morning. The home was beautifully decorated, fully stocked, and so cozy. We had everything we needed for a relaxing vacation and can’t wait to come back next year!",
    rating: 5,
  },
  {
    name: "Ashley Miller",
    review:
      "From the booking process to check-out, Seaside Beach Vacations made everything so easy. The staff was incredibly responsive, and the location was ideal for a peaceful beach getaway. We spent our days lounging on the sand and our evenings watching stunning sunsets. Highly recommend!",
    rating: 5,
  },
  {
    name: "Tyler Johnson",
    review:
      "I was blown away by the attention to detail in the home we rented. It felt like a luxury experience without the price tag. The location is just unbeatable—close to all the local spots yet private and serene. My family and I had a wonderful time, and we’ll definitely be booking again next summer!",
    rating: 5,
  },
  {
    name: "Megan Clark",
    review:
      "What a fantastic experience! The whole booking process was so smooth, and the house we stayed in exceeded our expectations. Everything from the comfortable beds to the fully equipped kitchen made our stay so enjoyable. If you’re looking for the ultimate beach getaway, this is the place to be!",
    rating: 5,
  },
  {
    name: "Mohammed Hoque",
    review:
      "Seaside Beach Vacations helped us create lasting memories on our family trip. We had a beautiful home with stunning ocean views. The vacation home was so spacious, making it easy for everyone to spread out and relax. It truly felt like a home away from home, and we can’t wait to return!",
    rating: 5,
  },
];

const ReviewCard = ({ data }) => {
  return (
    <div className="border rounded-3xl p-8 bg-white">
      <div>
        <div>
          <div className="space-y-6">
            <div className="text-start">
              <p className="text-base font-normal text-gray-800 text-opacity-50 line-clamp-[7]">
                {data.review}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center">
                <div className="text-start ">
                  <h3 className="font-medium text-lg">{data.name}</h3>
                </div>
              </div>

              {/* star */}
              <div className="flex gap-4">
                <Star fill="yellow" className="text-amber-400" />
                <Star fill="yellow" className="text-amber-400" />
                <Star fill="yellow" className="text-amber-400" />
                <Star fill="yellow" className="text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Slider() {
  return (
    <Swiper
      cssMode={true}
      navigation={true}
      mousewheel={true}
      keyboard={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 40 },
        1280: { slidesPerView: 3, spaceBetween: 50 },
      }}
      modules={[Navigation, Autoplay, Mousewheel, Keyboard]}
      className="mySwiper"
    >
      {reviews.map((item, index) => (
        <SwiperSlide key={index}>
          <ReviewCard data={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
