/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

// Array of video sources
const videoSlides = Array(7).fill("/assets/homeSlide_image/demo.mp4");

const VideoSlide = () => {
  // One ref per video
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // States for each slide
  const [videoStates, setVideoStates] = useState(
    videoSlides.map(() => ({
      isMuted: true,
      isPlaying: true,
      showShop: false,
    }))
  );

  const toggleMute = (index: number) => {
    const newStates = [...videoStates];
    newStates[index].isMuted = !newStates[index].isMuted;
    setVideoStates(newStates);

    const video = videoRefs.current[index];
    if (video) {
      video.muted = newStates[index].isMuted;

      // Force play after unmuting to trigger sound
      if (!newStates[index].isMuted) {
        video.play().catch((err) => {
          console.warn("Play failed after unmuting:", err);
        });
      }
    }
  };

  const togglePlay = (index: number) => {
    const newStates = [...videoStates];
    newStates[index].isPlaying = !newStates[index].isPlaying;
    setVideoStates(newStates);

    const video = videoRefs.current[index];
    if (video) {
      newStates[index].isPlaying ? video?.play() : video.pause();
    }
  };

  const handleMouseEnter = (index: number) => {
    const newStates = [...videoStates];
    newStates[index].showShop = true;
    setVideoStates(newStates);
  };

  const handleMouseLeave = (index: number) => {
    const newStates = [...videoStates];
    newStates[index].showShop = false;
    setVideoStates(newStates);
  };
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const handleEnded = () => {
        if (videoStates[index].isPlaying) {
          video.play();
        }
      };

      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("ended", handleEnded);
      };
    });
  }, [videoStates]);

  return (
    <div className="pb-5">
      <p className="text-[#535e51] pb-4 font-bold text-[28px] sm:text-[35px]">
        Watch shop
      </p>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
          1440: { slidesPerView: 4 },
          1600: { slidesPerView: 5 },
        }}
      >
        {videoSlides.map((videoSrc, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-[340px] h-[460px] mx-5 rounded-2xl overflow-hidden shadow-xl group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={videoSrc}
                autoPlay
                playsInline
                muted={videoStates[index].isMuted} // Dynamic!
                className="w-full h-full object-cover"
              />

              {/* Shop Now Button */}
              {videoStates[index].showShop && (
                <button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                bg-[#535e51] text-white px-6 py-3 
                text-lg font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                >
                  Shop Now
                </button>
              )}

              {/* Mute Button */}
              <button
                onClick={() => toggleMute(index)}
                className="absolute bottom-4 left-4 bg-white text-black px-3 py-2 text-sm rounded-full shadow hover:bg-gray-200 transition-all"
              >
                {videoStates[index].isMuted ? "Unmute" : "Mute"}
              </button>

              {/* Play Button */}
              <button
                onClick={() => togglePlay(index)}
                className="absolute bottom-4 right-4 bg-white text-black px-3 py-2 text-sm rounded-full shadow hover:bg-gray-200 transition-all"
              >
                {videoStates[index].isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlide;
