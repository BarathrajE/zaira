/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import { AppDispatch, RootState } from "@/app/redux/store";

import { useDispatch, useSelector } from "react-redux";
import { videoGetAction } from "@/app/redux/action/videofile/video";

const VideoSlide = () => {
  // Redux: fetch video data
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(videoGetAction());
  }, [dispatch]);

  const videos = useSelector((state: RootState) => state.video.videos);
  const videoSlides =
    videos?.map((video: any) => ({
      id: video.id,
      url: video.videoUrl,
    })) || [];

  // One ref per video
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // States for each slide
  const [videoStates, setVideoStates] = useState<
    { isMuted: boolean; isPlaying: boolean; showShop: boolean }[]
  >([]);

  // 🔑 Sync videoStates with videoSlides whenever videos change
 useEffect(() => {
  if (videoSlides.length > 0 && videoStates.length !== videoSlides.length) {
    setVideoStates(
      videoSlides.map(() => ({
        isMuted: true,
        isPlaying: true,
        showShop: false,
      }))
    );
  }
}, [videoSlides, videoStates.length]);

  const toggleMute = (index: number) => {
    setVideoStates((prev) => {
      const newStates = [...prev];
      if (!newStates[index]) return prev;
      newStates[index].isMuted = !newStates[index].isMuted;

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
      return newStates;
    });
  };

  const togglePlay = (index: number) => {
    setVideoStates((prev) => {
      const newStates = [...prev];
      if (!newStates[index]) return prev;
      newStates[index].isPlaying = !newStates[index].isPlaying;

      const video = videoRefs.current[index];
      if (video) {
        newStates[index].isPlaying ? video.play() : video.pause();
      }
      return newStates;
    });
  };

  const handleMouseEnter = (index: number) => {
    setVideoStates((prev) => {
      const newStates = [...prev];
      if (newStates[index]) newStates[index].showShop = true;
      return newStates;
    });
  };

  const handleMouseLeave = (index: number) => {
    setVideoStates((prev) => {
      const newStates = [...prev];
      if (newStates[index]) newStates[index].showShop = false;
      return newStates;
    });
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      const handleEnded = () => {
        if (videoStates[index]?.isPlaying) {
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
        WATCH SHOP
      </p>
      <Swiper
        spaceBetween={30}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
          1280: { slidesPerView: 3 },
          1440: { slidesPerView: 3.5 },
          1600: { slidesPerView: 5 },
        }}
      >
        {videoSlides.map((video: any, index: number) => (
          <SwiperSlide key={video.id || index}>
            <div
              className="relative w-[340px] h-[460px] mx-5 rounded-2xl overflow-hidden shadow-xl group"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={video.url}
                autoPlay
                playsInline
                muted={videoStates[index]?.isMuted ?? true} // ✅ safe access
                className="w-full h-full object-cover"
              />

              {/* Shop Now Button */}
              {videoStates[index]?.showShop && (
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
                {videoStates[index]?.isMuted ? "Unmute" : "Mute"}
              </button>

              {/* Play Button */}
              <button
                onClick={() => togglePlay(index)}
                className="absolute bottom-4 right-4 bg-white text-black px-3 py-2 text-sm rounded-full shadow hover:bg-gray-200 transition-all"
              >
                {videoStates[index]?.isPlaying ? "Pause" : "Play"}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VideoSlide;
