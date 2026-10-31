const phases = {
  epitaph: {
    status: "For the subscriber",
    name: "Your Epitaphs",
    text: "A letter for someone you name. The person who carries out a task does not read it.",
    points: [
      "Last words, written for one person.",
      "A task for someone else does not open the letter."
    ]
  },
  assets: {
    status: "For the subscriber",
    name: "Asset registry",
    text: "Register a digital or physical item first. Delegation comes after, not here.",
    points: [
      "A digital item, such as an account or a file.",
      "A physical item, such as a key, a box, or a keepsake.",
      "This is the list. It is not yet a task for someone."
    ]
  },
  vault: {
    status: "For the subscriber",
    name: "Vault & chores",
    text: "The items, and the tasks you give to one designated person.",
    points: [
      "A physical or digital item, once you are ready to hand it on.",
      "A task for one person you name. Feed the cat. Close an account.",
      "That person does the task. They do not read the letter."
    ]
  },
  wishes: {
    status: "For the subscriber",
    name: "Final wishes",
    text: "Wishes that happen once. This is still the subscriber, writing down what they want.",
    points: [
      "A funeral arrangement.",
      "The other one-time instructions around that farewell."
    ]
  },
  casket: {
    status: "For the subscriber",
    name: "Casket designer",
    text: "Design the casket on screen. Having it made belongs with the businesses, later.",
    points: [
      "Shape and look, decided by the subscriber.",
      "A casket provider would make it in a later phase."
    ]
  },
  speaking: {
    status: "For the subscriber · not built yet",
    name: "Still speaking",
    text: "Messages that continue, on days you choose, in a form you decided.",
    points: [
      "Words, audio, or video.",
      "Written ahead of time, or shaped with AI.",
      "An avatar: a face and a voice you prepared."
    ]
  },
  network: {
    status: "Not for subscribers · not built yet",
    name: "After-death businesses",
    text: "A network for the businesses that carry out a death. The subscriber does not use this side.",
    points: [
      "A funeral home.",
      "A casket provider.",
      "A cemetery.",
      "A restaurant.",
      "A cake shop.",
      "A flower shop."
    ]
  }
};

const cardText = document.querySelector("#phase-text");
const cardName = document.querySelector("#phase-name");
const cardStatus = document.querySelector("#phase-status");
const cardPoints = document.querySelector("#phase-points");

function show(key) {
  const phase = phases[key];
  cardStatus.textContent = phase.status;
  cardName.textContent = phase.name;
  cardText.textContent = phase.text;
  cardPoints.replaceChildren(...phase.points.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));
  document.querySelectorAll(".phase-tab").forEach((tab) => {
    const on = tab.dataset.phase === key;
    tab.classList.toggle("is-on", on);
    tab.setAttribute("aria-selected", on ? "true" : "false");
  });
}

document.querySelectorAll(".phase-tab").forEach((tab) => {
  tab.addEventListener("click", () => show(tab.dataset.phase));
});

show("epitaph");
