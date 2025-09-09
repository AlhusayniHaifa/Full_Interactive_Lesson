import React, { useState } from 'react';

const steps = [
  {
    img: "/images/word_p3_1.jpeg",
    text: "الخطوة الأولى: الضغط على الخلية للبدء بالكتابة",
    highlightStyle: { top: "85px", left: "288px", width: "49px", height: "13px" , },
    audio: "/media/audio/audio_p3_1.mpeg",
  },
  {
    img: "/images/word_p3_2.jpeg",
    text: " الخطوة الثانية: يمكنك تنسيق الجدول من خلال الشريط الرئيسي ",
    highlightStyle: { top: "13px", left: "410px", width: "46px", height: "15px" },
    audio: "/media/audio/audio_p3_2.mpeg",
  },
  {
    img: "/images/word_p3_3.jpeg",
    text: "الخطوة الثالثة: من خلال هذه القائمة يمكنك اختيار نوع الخط ",
    highlightStyle: { top: "20px", left: "340px", width: "110px", height: "201px" },
    audio: "/media/audio/audio_p3_3.mpeg",
  },
  {
    img: "/images/word_p3_4.png.jpeg",
    text: "الخطوة الرابعة: من خلال هذه القائمة يمكنك تغيير حجم الخط",
    highlightStyle: { top: "20px", left: "379px", width: "30px", height: "140px" },
    audio: "/media/audio/audio_p3_4.mpeg",
  },
  {
    img: "/images/word_p3_5.jpeg",
    text: "الخطوة الخامسة: من خلال هذه القائمة يمكنك تغيير لون الخط",
    highlightStyle: { top: "35px", left: "270px", width: "100px", height: "130px" },
    audio: "/media/audio/audio_p3_5.mpeg",
  },
  {
    img: "/images/word_p3_6.jpeg",
    text: "تهانينا! لقد قمت بتنسيق الجدول بنجاح",
    audio: "/media/audio/audio_p3_6.mpeg",
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
