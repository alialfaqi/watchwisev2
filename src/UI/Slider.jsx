import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";

// const ads = [
//   "https://smhttp-ssl-73217.nexcesscdn.net/pub/media/wysiwyg/june_2023/anker_mainbanner_web_en.jpg",
//   "/intel_mainbanner_web_ar_new.jpg",
//   "/bank_mainbanner_ar_web_new.jpg",
//   "/intelbanner_web_ar.jpg"
// ];

const Slider = ({ trendingMovies }) => {
  return (
    <div className="container mx-auto mt-24">
      <Swiper
        className="ads-slider w-full lg:w-[50%] "
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
          // width: "50%",
          margin: "0 auto",
        }}
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {trendingMovies.map((movie) => (
          <SwiperSlide key={Math.random()}>
            <Link
              className="relative"
              to={`/itemdetails/${movie.id}/${movie.media_type}`}
            >
              <img
                className="w-full"
                src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
                alt="Image not Found"
              />
              <p className="absolute bottom-2 left-[7rem] w-[10rem] z-10 font-bold text-gray-200 ">
                {movie.original_title}
              </p>
              <img
                src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                alt=""
                className="absolute bottom-2 left-2 h-[35%] w-[%30]"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
