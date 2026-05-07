const form = document.querySelector("#noteForm");
const input = document.querySelector("#noteInput");
const list = document.querySelector("#noteList");

const notes = JSON.parse(localStorage.getItem("mini-notes") || "[]");

function saveNotes() {
  localStorage.setItem("mini-notes", JSON.stringify(notes));
}

function renderNotes() {
  list.innerHTML = "";

  notes.forEach((text, index) => {
    const item = document.createElement("li");
    item.className = "note";

    const label = document.createElement("span");
    label.textContent = text;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "deleteButton";
    button.textContent = "削除";
    button.addEventListener("click", () => {
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });

    item.append(label, button);
    list.append(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  notes.unshift(text);
  input.value = "";
  saveNotes();
  renderNotes();
});

renderNotes();
