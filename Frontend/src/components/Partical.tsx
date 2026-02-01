// import React, { useCallback } from 'react';
// import Particles from 'react-tsparticles';
// import { loadFull } from 'tsparticles';
// import { Engine } from 'tsparticles-engine';

// const Partical: React.FC = () => {
//   const particlesInit = useCallback(async (engine: Engine) => {
//     await loadFull(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container: any) => {
//     await console.log(container);
//   }, []);

//   const options = React.useMemo(
//     () => ({
//       background: {
//         color: {
//           value: "#0d47a1",
//         },
//       },
//       fpsLimit: 60,
//       interactivity: {
//         events: {
//           onClick: {
//             enable: true,
//             mode: "push",
//           },
//           onHover: {
//             enable: true,
//             mode: "repulse",
//           },
//           resize: true,
//         },
//         modes: {
//           push: {
//             quantity: 4,
//           },
//           repulse: {
//             distance: 200,
//             duration: 0.4,
//           },
//         },
//       },
//       particles: {
//         color: {
//           value: "#ffffff",
//         },
//         links: {
//           color: "#ffffff",
//           distance: 150,
//           enable: true,
//           opacity: 0.5,
//           width: 1,
//         },
//         collisions: {
//           enable: true,
//         },
//         move: {
//           direction: "none",
//           enable: true,
//           outModes: {
//             default: "out",
//           },
//           random: false,
//           speed: 1,
//           straight: false,
//         },
//         number: {
//           density: {
//             enable: true,
//           },
//           value: 280,
//         },
//         opacity: {
//           value: 0.1,
//         },
//         shape: {
//           type: "circle",
//         },
//         size: {
//           value: { min: 1, max: 5 },
//         },
//       },
//       detectRetina: true,
//     }),
//     [],
//   );

//   return (
//     <div>
//       <Particles id="tsparticles" init={particlesInit} loaded={particlesLoaded} />
//       <div className='max-w-lg mx-auto mt-10'>
//         <div className='text-center font-semibold text-4xl'>
//           "Your Story, Our Platform"
//         </div>
//         <div className='text-center font-normal text-xl mt-3'>
//           Blogging made simple, Storytelling made powerful
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Partical;