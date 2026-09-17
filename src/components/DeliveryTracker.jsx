import "./DeliveryTracker.css";
import { useEffect, useState } from "react";

export default function DeliveryTracker({ show, onClose }) {

  const [progress, setProgress] = useState(0);
  const [time, setTime] = useState(25);

  useEffect(() => {

    if (!show) return;

    setProgress(0);
    setTime(25);

    const timer = setInterval(() => {

      setProgress((prev) => {

        if (prev >= 100) {
          clearInterval(timer);

          setTimeout(() => {
            onClose();
          }, 2000);

          return 100;
        }

        return prev + 4;

      });

      setTime((prev) => (prev > 0 ? prev - 1 : 0));

    }, 1000);

    return () => clearInterval(timer);

  }, [show, onClose]);

  if (!show) return null;

  return (

    <div className="tracker">

      <h1>🚚 Order On The Way</h1>

      <div className="road-container">

        <div className="restaurant">
          🍽️
          <p>Restaurant</p>
        </div>

        <div className="road">

          <div
            className="truck"
            style={{
              left: `calc(${progress}% - 50px)`,
            }}
          >
            <img
              src="/images/tro.webp"
              alt="Truck"
            />
          </div>

        </div>

        <div className="home">
          🏠
          <p>Home</p>
        </div>

      </div>

      <div className="progress">

        <div
          className="fill"
          style={{
            width: `${progress}%`
          }}
        ></div>

      </div>

      <h2>{time} Minutes Remaining</h2>

      <p className="status">

        {progress < 25 && "✅ Order Confirmed"}

        {progress >= 25 &&
          progress < 50 &&
          "👨‍🍳 Preparing Food..."}

        {progress >= 50 &&
          progress < 75 &&
          "🍳 Cooking..."}

        {progress >= 75 &&
          progress < 100 &&
          "🚚 Driver is on the way..."}

        {progress === 100 &&
          "🎉 Delivered Successfully!"}

      </p>

      {progress < 100 ? (

        <button onClick={onClose}>
          Cancel Order
        </button>

      ) : (

        <button onClick={onClose}>
          Done
        </button>

      )}

    </div>

  );

}