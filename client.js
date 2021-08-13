const {ipcRenderer} = require("electron");
const {exec} = require("child_process");

var dist = 5;
var max = 300;
var min = 1;
var amount = 1.4;
var active = false;
var keysDown = {};

function init() {
  warmup();
  showActive();
  showDist();
}

function warmup() {
  execute(`node new-app/mouse.js warmup`);
}
function test() {
  execute(`node new-app/mouse.js test`);
}

function showActive() {
  document.getElementById("active").innerHTML = active ? `
    <h1 style="background-color:lime">
      ACTIVE
    </h1>
  ` : `
    <h1 style="background-color:red">
      Inactive
    </h1>
  `;
}
function setActive() {
  dist = parseFloat(document.getElementById("distance").value);
  showDist();
}
function showDist() {
  dist = Math.round(Math.max(min, Math.min(max, dist)));
  document.getElementById("distance").value = dist;
  document.getElementById("distance").setAttribute("min", min);
  document.getElementById("distance").setAttribute("max", max);
}

function toggleActive() {
  active = !active;
  showActive();
}

/* addEventListener("keydown", event => {
  showActive();
  console.log(event.code);
  switch (event.code) {
    case "Insert": {
      if (!keysDown.Insert) {
        toggleActive();
      }
    }; break;
    case "KeyW": {
      if (active) {
        execute(`node new-app/mouse.js move 0 ${- dist}`);
      }
    }; break;
    case "KeyA": {
      if (active) {
        execute(`node new-app/mouse.js move ${- dist} 0`);
      }
    }; break;
    case "KeyS": {
      if (active) {
        execute(`node new-app/mouse.js move 0 ${dist}`);
      }
    }; break;
    case "KeyD": {
      if (active) {
        execute(`node new-app/mouse.js move ${dist} 0`);
      }
    }; break;
    case "KeyM": {
      if (active) {
        dist *= amount;
        showDist();
      }
    }; break;
    case "KeyN": {
      if (active) {
        dist /= amount;
        showDist();
      }
    }; break;
  }
  keysDown[event.code] = true;
});
addEventListener("keyup", event => {
  delete keysDown[event.code];
}); */

function execute(cmd) {
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

ipcRenderer.on("MoveUp", () => {
  if (active) {
    execute(`node new-app/mouse.js move 0 ${- dist}`);
  }
});
ipcRenderer.on("MoveLeft", () => {
  if (active) {
    execute(`node new-app/mouse.js move ${- dist} 0`);
  }
});
ipcRenderer.on("MoveDown", () => {
  if (active) {
    execute(`node new-app/mouse.js move 0 ${dist}`);
  }
});
ipcRenderer.on("MoveRight", () => {
  if (active) {
    execute(`node new-app/mouse.js move ${dist} 0`);
  }
});
ipcRenderer.on("Activate", () => {
  toggleActive();
});
ipcRenderer.on("SpeedIncrease", () => {
  if (active) {
    dist *= amount;
    showDist();
  }
});
ipcRenderer.on("SpeedDecrease", () => {
  if (active) {
    dist /= amount;
    showDist();
  }
});
ipcRenderer.on("LeftClick", () => {
  if (active) {
    execute(`node new-app/mouse.js click left`);
  }
});
ipcRenderer.on("MiddleClick", () => {
  if (active) {
    execute(`node new-app/mouse.js click middle`);
  }
});
ipcRenderer.on("RightClick", () => {
  if (active) {
    execute(`node new-app/mouse.js click right`);
  }
});
ipcRenderer.on("ScrollUp", () => {
  if (active) {
    console.warn("Scroll not implemented yet!")
  }
});
ipcRenderer.on("ScrollDown", () => {
  if (active) {
    console.warn("Scroll not implemented yet!")
  }
});