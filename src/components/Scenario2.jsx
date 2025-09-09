import React, { useState } from 'react';

const steps = [
  {
    img: "/images/word_p1_3.jpeg",
    text: " الخطوة الاولى: الضغط على قائمة إدراج من قائمة المهام",
    highlightStyle: { top: "13px", left: "397px", width: "20px", height: "13px" , },
    audio: "/media/audio/audio_p2_1.mpeg",
  },
  {
    img: "/images/word_p2_2.png",
    text: "الخطوة الثانية: اختر 'جدول' من قائمة الإدراج",
    highlightStyle: { top: "16px", left: "402px", width: "24px", height: "40px" },
    audio: "/media/audio/audio_p2_2.mpeg",
  },
  {
    img: "/images/word_p2_2.png",
    text: "الخطوة الثالثة: الضغط على إدراج الجدول",
    highlightStyle: { top: "102px", left: "360px", width: "60px", height: "21px" },
    audio: "/media/audio/audio_p2_3.mpeg",
  },
  {
    img: "/images/word_p2_4.png",
    text: "الخطوة الرابعة: تحديد عدد الصفوف والأعمدة",
    highlightStyle: { top: "44px", left: "195px", width: "108px", height: "40px" },
    audio: "/media/audio/audio_p2_4.mpeg",
  },
  {
    img: "/images/word_p2_4.png",
    text: "الخطوة الخامسة: اضغط على زر 'موافق' لإدراج الجدول",
    highlightStyle: { top: "128px", left: "230px", width: "46px", height: "18px" },
    audio: "/media/audio/audio_p2_5.mpeg",
  },
  {
    img: "/images/word_p2_5.png",
    text: "تهانينا! تم إدراج الجدول بنجاح",
    audio: "/media/audio/audio_p2_6.mpeg",
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
          width: "500px",
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
