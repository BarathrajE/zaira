// "use client";
// import { motion } from "framer-motion";
// import { AiFillCamera, AiOutlineShopping } from "react-icons/ai";
// import { useStore } from "../shirtStore";
// import Image from "next/image";

// export function Overlay() {
//   const { color } = useStore();

//   return (
//     <div className="fixed inset-0 w-full h-full pointer-events-none">
//       <motion.header className="flex justify-between items-center w-full p-10 pointer-events-auto">
//         <div className="text-2xl font-bold">Logo</div>
//         <div>
//           <AiOutlineShopping size="3em" />
//         </div>
//       </motion.header>
//       <motion.section className="flex flex-col items-center justify-center h-full w-full">
//         <Customizer />
//       </motion.section>
//     </div>
//   );
// }

// function Customizer() {
//   const { color, colors, decals, decal, setColor, setDecal } = useStore();

//   return (
//     <div className="flex flex-col items-center justify-end h-full w-full mb-6">
//       <div className="flex gap-2.5 mb-5">
//         {colors.map((c) => (
//           <div
//             key={c}
//             className="w-7 h-7 rounded-full border-2 border-white hover:scale-125 transition-transform cursor-pointer"
//             style={{ background: c }}
//             onClick={() => setColor(c)}
//           />
//         ))}
//       </div>
//       <div className="absolute left-12 bottom-10">
//         <div className="flex gap-5">
//           {decals.map((d) => (
//             <div
//               key={d}
//               className="cursor-pointer hover:scale-125 transition-transform"
//               onClick={() => setDecal(d)}
//             >
//               <Image
//                 src={`/${d}_thumb.png`}
//                 alt="brand"
//                 fill
//                 sizes="24px"
//                 className="object-contain grayscale hover:grayscale-0"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       <button
//         className="absolute bottom-10 right-10 flex items-center gap-3.5 px-7.5 py-3.5 rounded shadow hover:scale-110 transition-all"
//         style={{ background: color }}
//         onClick={() => {
//           const canvas = document.querySelector("canvas") as HTMLCanvasElement;
//           if (!canvas) return;
//           const link = document.createElement("a");
//           link.setAttribute("download", "canvas.png");
//           link.setAttribute(
//             "href",
//             canvas
//               .toDataURL("image/png")
//               .replace("image/png", "image/octet-stream")
//           );
//           link.click();
//         }}
//       >
//         DOWNLOAD <AiFillCamera size="1.3em" />
//       </button>
//     </div>
//   );
// }
