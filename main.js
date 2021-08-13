const {app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, screen} = require("electron");
const path = require("path");
const {exec} = require("child_process");

var tray, isQuiting;
app.on("before-quit", function () {
  tray.destroy();
  isQuiting = true;
});
var dist = 30;
var max = 300;
var min = 1;
var amount = 1.6;
var scroll = 1;
var active = true;
var doTray = true;
// doTray = false;

function createWindow() {
  warmup();
  if (doTray) {
    tray = new Tray(path.join(__dirname, "icon-active.png"));

    labels = ["👍 Activate", "👎 Deativate"];
    template = [
      {
        label: labels[1], click: function () {
          toggleActive();
          template[0].label = template[0].label == labels[0] ? labels[1] : labels[0];
          tray.setContextMenu(Menu.buildFromTemplate(template));
        }
      },
      {
        label: "❌ Quit", click: function () {
          isQuiting = true;
          app.quit();
        }
      }
    ];
    tray.setContextMenu(Menu.buildFromTemplate(template));
    tray.setToolTip("Mousr");
  }

  if (doTray) {
    tray.on("click", toggleActive);
  }

  globalShortcut.register("Insert", toggleActive);
  setShortcuts();
}

app.allowRendererProcessReuse = false;
app.whenReady().then(createWindow);

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

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function setShortcuts() {
  globalShortcut.register("W", () => {
    if (active) {
      execute(`node mouse.js move 0 ${- dist}`);
    }
  });
  globalShortcut.register("A", () => {
    if (active) {
      execute(`node mouse.js move ${- dist} 0`);
    }
  });
  globalShortcut.register("S", () => {
    if (active) {
      execute(`node mouse.js move 0 ${dist}`);
    }
  });
  globalShortcut.register("D", () => {
    if (active) {
      execute(`node mouse.js move ${dist} 0`);
    }
  });
  globalShortcut.register("E", () => {
    if (active) {
      dist *= amount;
    }
  });
  globalShortcut.register("Q", () => {
    if (active) {
      dist /= amount;
    }
  });
  globalShortcut.register("X", () => {
    if (active) {
      execute(`node mouse.js click left`);
    }
  });
  globalShortcut.register("C", () => {
    if (active) {
      execute(`node mouse.js click middle`);
    }
  });
  globalShortcut.register("V", () => {
    if (active) {
      execute(`node mouse.js click right`);
    }
  });
  globalShortcut.register("R", () => {
    if (active) {
      console.warn("Scroll not implemented!")
      // execute(`node mouse.js scroll ${- dist * scroll}`);
    }
  });
  globalShortcut.register("F", () => {
    if (active) {
      console.warn("Scroll not implemented!")
      // execute(`node mouse.js scroll ${dist * scroll}`);
    }
  });
  globalShortcut.register("T", () => {
    if (active) {
      execute(`node mouse.js test`);
    }
  });
}

function removeShortcuts() {
  globalShortcut.unregister("W");
  globalShortcut.unregister("A");
  globalShortcut.unregister("S");
  globalShortcut.unregister("D");
  globalShortcut.unregister("E");
  globalShortcut.unregister("Q");
  globalShortcut.unregister("X");
  globalShortcut.unregister("C");
  globalShortcut.unregister("V");
  globalShortcut.unregister("R");
  globalShortcut.unregister("F");
  globalShortcut.unregister("T");
}

function warmup() {
  execute(`node mouse.js warmup`);
}
function test() {
  execute(`node mouse.js test`);
}
function setDist() {
  dist = Math.round(Math.max(min, Math.min(max, dist)));
}
function toggleActive() {
  active = !active;
  if (active) {
    setShortcuts();
    tray.setImage(path.join(__dirname, "icon-active.png"));
    console.log("Activated");
  } else {
    removeShortcuts();
    tray.setImage(path.join(__dirname, "icon.png"));
    console.log("Dectivated");
  }
}

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