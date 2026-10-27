const form = document.querySelector("#compose");
const note = document.querySelector("#form-note");
const sealed = document.querySelector("#sealed");
const letter = document.querySelector("#letter");
const waiting = document.querySelector("#waiting");
const openedFor = document.querySelector("#opened-for");
const revealed = document.querySelector("#revealed");
const agreements = document.querySelector("#agreements");
const again = document.querySelector("#again");

const agreed = { a: false, b: false };
let people = { a: "", b: "" };
let sentence = "";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  sentence = String(data.get("sentence") || "").trim();
  people = {
    a: String(data.get("personA") || "").trim(),
    b: String(data.get("personB") || "").trim(),
  };

  if (sentence.length < 2) {
    note.textContent = "Write a sentence first.";
    return;
  }
  if (people.a.toLowerCase() === people.b.toLowerCase()) {
    note.textContent = "Choose two different people.";
    return;
  }

  note.textContent = "";
  agreed.a = false;
  agreed.b = false;
  form.hidden = true;
  sealed.hidden = false;
  render();
});

agreements.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-person]");
  if (!button || agreed[button.dataset.person]) return;
  agreed[button.dataset.person] = true;
  render();
});

again.addEventListener("click", () => {
  sentence = "";
  people = { a: "", b: "" };
  agreed.a = false;
  agreed.b = false;
  form.reset();
  sealed.hidden = true;
  form.hidden = false;
  letter.classList.remove("open");
  document.querySelector("#sentence").focus();
});

function render() {
  const count = Number(agreed.a) + Number(agreed.b);
  agreements.innerHTML = ["a", "b"].map((key) => {
    const name = people[key];
    const done = agreed[key];
    return `<div class="person${done ? " agreed" : ""}">
      <strong>${escapeHtml(name)}</strong>
      <button type="button" data-person="${key}" ${done ? "disabled" : ""}>${done ? "Agreed" : "Agree"}</button>
    </div>`;
  }).join("");

  if (count < 2) {
    letter.classList.remove("open");
    waiting.hidden = false;
    waiting.textContent = count === 0 ? "Still sealed." : "Still sealed. One agreement is not enough.";
    openedFor.hidden = true;
    revealed.hidden = true;
    return;
  }

  letter.classList.add("open");
  waiting.hidden = true;
  openedFor.hidden = false;
  revealed.hidden = false;
  revealed.textContent = sentence;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
