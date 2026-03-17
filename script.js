/********************************
 * مسارات الفرق (5 × 5)
 ********************************/
const paths = {
  1: { characters:[1,4,5,3,2], puzzles:[4,5,3,2] },
  2: { characters:[2,1,4,5,3], puzzles:[1,4,5,3] },
  3: { characters:[3,2,1,4,5], puzzles:[2,1,4,5] },
  4: { characters:[4,5,3,2,1], puzzles:[5,3,2,1] },
  5: { characters:[5,3,2,1,4], puzzles:[3,2,1,4] }
};

/********************************
 * أكواد البداية
 ********************************/
function checkCode() {
  const code = document.getElementById("codeInput").value.trim();
  const error = document.getElementById("error");

  const startCodes = {
    "042": 1,
    "9516": 2,
    "A182530": 3,
    "032314": 4,
    "8160": 5
  };

  if (!startCodes[code]) {
    error.textContent = "يادي الذكاء";
    return;
  }

  const pathId = startCodes[code];

  localStorage.setItem("pathId", pathId);
  localStorage.setItem("step", 0);
  localStorage.setItem("usedCharacters", JSON.stringify([]));
  localStorage.setItem("currentCharacter", paths[pathId].characters[0]);

  window.location.href = "investigation.html";
}


function getCurrentCharacter() {
  return Number(localStorage.getItem("currentCharacter"));
}

function goToPuzzle() {
  const pathId = localStorage.getItem("pathId");

const introSeen = localStorage.getItem("introSeen_path_" + pathId);
const firstCharChosen = localStorage.getItem("firstCharacterChosen_path_" + pathId);

  // أول شخصية للفريق + لسه ماشافش intro
  if (!introSeen && !firstCharChosen) {
    localStorage.setItem("firstCharacterChosen_path_" + pathId, "true");
    window.location.href = "intro.html";
  } else {
    window.location.href = "puzzle.html";
  }
}


function nextStep() {
  const pathId = Number(localStorage.getItem("pathId"));
  let step = Number(localStorage.getItem("step"));
  let used = JSON.parse(localStorage.getItem("usedCharacters"));

  // سجل القائد الحالي
  used.push(paths[pathId].characters[step]);
  step++;

  localStorage.setItem("usedCharacters", JSON.stringify(used));
  localStorage.setItem("step", step);

  const totalCharacters = paths[pathId].characters.length;

  // 🟢 لو داخل على آخر متهم
  if (step === totalCharacters - 1) {
    localStorage.setItem(
      "currentCharacter",
      paths[pathId].characters[step]
    );
    window.location.href = "last-character.html";
    return;
  }

  // 🟡 لو خلص آخر متهم
  if (step === totalCharacters) {
    window.location.href = "before-end.html";
    return;
  }

  // باقي الشخصيات
  localStorage.setItem(
    "currentCharacter",
    paths[pathId].characters[step]
  );

  window.location.href = "investigation.html";
}