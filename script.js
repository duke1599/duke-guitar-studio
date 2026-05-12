const instrumentSelect = document.querySelector("#instrument");
const courseCards = document.querySelectorAll(".course-card");
const registrationForm = document.querySelector("#registrationForm");
const summaryTitle = document.querySelector("#summaryTitle");
const summaryList = document.querySelector("#summaryList");

const tuitionByInstrument = {
  "เบส": "1,600 บาท",
  "กีตาร์ไฟฟ้า": "1,600 บาท",
  "กีตาร์โปร่ง": "1,600 บาท",
};

const availableTimeText = "เลือกได้ทีละ 1 ชั่วโมง ระหว่าง 11:00 - 15:00";

function setActiveCourse(instrument) {
  courseCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.course === instrument);
  });
}

function renderSummary(items, title = "ยังไม่ได้ส่งใบสมัคร") {
  summaryTitle.textContent = title;
  summaryList.innerHTML = items
    .map(
      (item) => `
        <div>
          <dt>${item.label}</dt>
          <dd>${item.value}</dd>
        </div>
      `
    )
    .join("");
}

courseCards.forEach((card) => {
  card.addEventListener("click", () => {
    const instrument = card.dataset.course;
    instrumentSelect.value = instrument;
    setActiveCourse(instrument);
    renderSummary([
      { label: "คอร์ส", value: instrument },
      { label: "ช่วงเวลาลงเรียน", value: availableTimeText },
      { label: "รูปแบบการเรียน", value: "เรียนออนไลน์ หรือ มาเรียนตัวต่อตัว" },
      { label: "ค่าเรียนต่อเดือน", value: tuitionByInstrument[instrument] },
    ]);
  });
});

instrumentSelect.addEventListener("change", (event) => {
  const instrument = event.target.value;
  setActiveCourse(instrument);
  renderSummary([
    { label: "คอร์ส", value: instrument },
    { label: "ช่วงเวลาลงเรียน", value: availableTimeText },
    { label: "รูปแบบการเรียน", value: "เรียนออนไลน์ หรือ มาเรียนตัวต่อตัว" },
    { label: "ค่าเรียนต่อเดือน", value: tuitionByInstrument[instrument] },
  ]);
});

registrationForm.addEventListener("reset", () => {
  window.setTimeout(() => {
    setActiveCourse("เบส");
    renderSummary([
      { label: "คอร์ส", value: "เบส" },
      { label: "ช่วงเวลาลงเรียน", value: availableTimeText },
      { label: "รูปแบบการเรียน", value: "เรียนออนไลน์ หรือ มาเรียนตัวต่อตัว" },
      { label: "ค่าเรียนต่อเดือน", value: "1,600 บาท" },
    ]);
  }, 0);
});

registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(registrationForm);
  const days = data.getAll("days");

  if (days.length === 0) {
    alert("กรุณาเลือกวันที่สะดวกอย่างน้อย 1 วัน");
    return;
  }

  renderSummary(
    [
      { label: "ผู้เรียน", value: data.get("studentName") },
      { label: "คอร์ส", value: data.get("instrument") },
      { label: "ระดับ", value: data.get("level") },
      { label: "รูปแบบการเรียน", value: data.get("lessonMode") },
      { label: "วันที่สะดวก", value: days.join(", ") },
      { label: "ช่วงเวลา", value: data.get("time") },
      { label: "ค่าเรียนต่อเดือน", value: tuitionByInstrument[data.get("instrument")] },
    ],
    "รับใบสมัครแล้ว"
  );
});
