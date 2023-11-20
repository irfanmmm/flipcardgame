import "./App.css";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

function App() {
  const [time, setTime] = useState(0);
  const [state, setstate] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [success, setsuccess] = useState(false);

  console.log(parseFloat((time / 60).toFixed(1)));

  const imojis = ["🤷‍♂️", "🙌", "❤", "🌹", "🎶", "💖", "🎁", "🤷‍♀️", "🎉", "😎"];
  const duplicateimojis = [...imojis, ...imojis];

  useEffect(() => {
    const newdata = duplicateimojis.map((item, index) => ({
      item,
      isActive: false,
      solved: false,
      id: index,
    }));

    setstate(newdata);
  }, []);

  useEffect(() => {
    const activedata = state.filter((item) => item.isActive && !item.solved);

    if (activedata.length === 2) {
      if (activedata[0].item === activedata[1].item) {
        const updatedState = state.map((item) =>
          activedata.some((activeItem) => activeItem.id === item.id)
            ? { ...item, isActive: true, solved: true }
            : item
        );
        setstate(updatedState);
      } else {
        setTimeout(() => {
          const updatedState = state.map((item) =>
            activedata.some((activeItem) => activeItem.id === item.id)
              ? { ...item, isActive: false }
              : item
          );
          setstate(updatedState);
        }, 500);
      }
    }
  }, [state, trigger]);

  useEffect(() => {
    if (state.every((item) => item.solved && item.isActive)) {
      setsuccess(true);
      console.log("You win!");
    }
  }, [state]);

  useEffect(() => {
    if (
      state.length > 0 &&
      state.every((item) => !item.solved && !item.isActive)
    ) {
      setsuccess(false);
      console.log("Initial rendering");
    }
  }, [state]);

  useEffect(() => {
    let maxTimeInterval;

    if (!success) {
      // Set up the interval
      maxTimeInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    // Clean up the interval when the component unmounts or when success is true
    return () => {
      clearInterval(maxTimeInterval);
    };
  }, [success]);

  const HandleActive = (itemvalue) => {
    const updatedState = state.map((item) =>
      item.id === itemvalue.id ? { ...item, isActive: !item.isActive } : item
    );

    setstate(updatedState);
  };

  return (
    <div className="App">
      <div className="parent">
        {state.map((item, index) => (
          <div
            onClick={() => HandleActive(item)}
            key={index}
            className={`flip-card ${item.isActive ? "active" : ""}`}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">{/* Imag */}</div>
              <div className="flip-card-back">
                <h1>{item.item}</h1>
              </div>
            </div>
          </div>
        ))}
        {success && (
          <>
            <Confetti width={window.innerWidth} height={window.innerHeight} />

            <h1>{parseFloat((time / 60).toFixed(1))}: Minuts</h1>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
