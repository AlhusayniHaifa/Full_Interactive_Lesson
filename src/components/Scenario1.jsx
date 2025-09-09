import React, { useState } from 'react';

const steps = [
  {
    img: "/images/word_p1_1.jpeg",
    text: "  الخطوة الاولى: فتح برنامج ورد من خلال البحث",
    highlightStyle: { top: "236px", left: "120px", width: "88px", height: "20px" , },
    audio: "/media/audio/audio_p1_1.mpeg",
  },
  {
    img: "/images/word_p1_1.jpeg",
    text: " الخطوة الثانية: الضغط على فتح لفتح البرنامج ",
    highlightStyle: { top: "97px", left: "240px", width: "39px", height: "14px" , },
    audio: "/media/audio/audio_p1_2.mpeg",
  },
  {
    img: "/images/word_p1_2.jpeg",
    text: "الخطوة الثالثة: الضغط على مستند فارغ",
    highlightStyle: { top: "38px", left: "354px", width: "70px", height: "60px" },
    audio: "/media/audio/audio_p1_3.mpeg",
  },
  {
    img: "/images/word_p1_3.jpeg",
    text: "تهانينا! لقد قمت بفتح مستند وورد بنجاح",
    audio: "/media/audio/audio_p1_4.mpeg",
  },
  
];

export default function Scenario1() {
  const [step, setStep] = useState(0);

  const changeStep = (delta) =>
    setStep((s) => (s + delta + steps.length) % steps.length);

  const { img, text, highlightStyle, audio } = steps[step];

  return (
    <div style={{ maxWidth: 800, margin: "auto", textAlign: "center" }}>
      <div
        id="excelSim"
        style={{
          position: "relative",
          width: "470px",
          paddingTop: "252px", 
          backgroundImage: `url(${img})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left",
          border: "1px solid #ccc",
        }}
      >
        {highlightStyle && (
          <div
            style={{
              position: "absolute",
              cursor: "pointer",
              zIndex: 5,
              border: "2px solid red",
              backgroundColor: "transparent",
              ...highlightStyle,
            }}
            title="انقر هنا للانتقال للخطوة التالية"
            onClick={() => changeStep(1)}
          />
        )}
      </div>
      <h2 style={{ marginTop: 15 }}>{text}</h2>
      {audio && <audio src={audio} autoPlay />}
      {step > 0 && (
       <button
         onClick={() => changeStep(-1)}
         style={{ marginTop: 10 }}
        >
    العودة للخطوة السابقة
         </button>
)}
    </div>
  );
}
