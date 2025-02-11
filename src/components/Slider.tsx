import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
];

const ReviewCard = () => {
  return (
    <div className="border rounded-3xl p-8 bg-white">
      <div>
        <div>
          <div className="space-y-6">
            <div className="text-start">
              <h4 className="font-semibold text-xl">The Best Booking System</h4>
            </div>
            <div className="text-start">
              <p className="text-base font-normal text-gray-800 text-opacity-50">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Tempora excepturi et similique accusamus dolor reprehenderit
                eos, enim ea praesentium. Magni.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-5 items-center">
                <div className="text-start ">
                  <h3 className="font-medium text-lg">Sara Mohamed</h3>
                  <p className="text-base font-normal">Jakatar</p>
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
      {reviews.map((_, index) => (
        <SwiperSlide key={index}>
          <ReviewCard />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
