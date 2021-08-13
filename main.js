const {app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut, screen} = require("electron");
const path = require("path");

let isQuiting;
app.on("before-quit", function () {
  isQuiting = true;
});
var doTray = true;
// doTray = false;

function createWindow() {
  if (doTray) {
    tray = new Tray(path.join(__dirname, "icon.png"));

    labels = ["👍 Activate", "👎 Deativate"];
    template = [
      {
        label: labels[0], click: function () {
          win.webContents.send("Activate");
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
    tray.setToolTip("New-App");
  }

  let [width, height] = [400, 100];
  if (!doTray) {
    width *= 1.5;
    height *= 3;
  }
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      nodeIntegration: true
    },
    show: false,
    icon: path.join(__dirname, "icon.png"),
    frame: !doTray,
    resizable: !doTray,
  });
  if (doTray) {
    win.setSkipTaskbar(true);
    let dims = screen.getPrimaryDisplay().workAreaSize
    win.setPosition(dims.width - width, dims.height - height);
  }

  win.loadFile("index.html");
  win.once("ready-to-show", () => {
    win.show()
  });

  win.on("close", function (event) {
    if (!isQuiting) {
      event.preventDefault();
      win.hide();
      event.returnValue = false;
    }
  });

  if (doTray) {
    tray.on("click", function (e) {
      if (win.isVisible()) {
        win.hide();
      } else {
        win.show();
      }
    });
  }

  globalShortcut.register("Insert", () => {win.webContents.send("Activate");});
  globalShortcut.register("W", () => {win.webContents.send("MoveUp");});
  globalShortcut.register("A", () => {win.webContents.send("MoveLeft");});
  globalShortcut.register("S", () => {win.webContents.send("MoveDown");});
  globalShortcut.register("D", () => {win.webContents.send("MoveRight");});
  globalShortcut.register("E", () => {win.webContents.send("SpeedIncrease");});
  globalShortcut.register("Q", () => {win.webContents.send("SpeedDecrease");});
  globalShortcut.register("X", () => {win.webContents.send("LeftClick");});
  globalShortcut.register("C", () => {win.webContents.send("MiddleClick");});
  globalShortcut.register("V", () => {win.webContents.send("RightClick");});
  globalShortcut.register("R", () => {win.webContents.send("ScrollUp");});
  globalShortcut.register("F", () => {win.webContents.send("ScrollDown")});
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