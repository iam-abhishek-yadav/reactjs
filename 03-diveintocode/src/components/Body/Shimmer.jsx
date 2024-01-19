import { useSpring, animated } from 'react-spring';

const generateShimmerStyle = (height) => ({
  height: `${height}px`,
  background: "linear-gradient(to right, #d1d1d1, #e0e0e0, #d1d1d1)",
});

const Shimmer = () => {
  const shimmerAnimation = useSpring({
    from: { opacity: 0.5 },
    to: { opacity: 1 },
    loop: { reverse: true },
  });

  const resCardStyles = Array.from({ length: 12 }).map((_, index) => (
    <animated.div key={index} className="res-card" style={{ ...generateShimmerStyle(500), ...shimmerAnimation }}></animated.div>
  ));

  return (
    <>
      <div className="search-container">
        <div className="search-box" style={{ height: "36px", background: "linear-gradient(to right, #d1d1d1, #e0e0e0, #d1d1d1)", width: "204px" }}></div>
        <button style={{ width: "150px", backgroundColor: "#d1d1d1" }}></button>
        <button style={{ width: "100px", backgroundColor: "#d1d1d1" }}></button>
      </div>
      <div className="res-container">
        {resCardStyles}
      </div>
    </>
  );
}

export default Shimmer;
