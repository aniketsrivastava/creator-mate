// ─────────────────────────────────────────────────────────────────────────────
// CreatorMate.ai — Google Apps Script (Debug Version)
// ─────────────────────────────────────────────────────────────────────────────

const SHEET_NAME = "CreatorMate Beta";

function doPost(e) {
  try {
    // Log everything we receive
    Logger.log("=== NEW SUBMISSION ===");
    Logger.log("e.parameter: " + JSON.stringify(e.parameter));
    Logger.log("e.parameters: " + JSON.stringify(e.parameters));
    Logger.log("postData type: " + (e.postData ? e.postData.type : "none"));
    Logger.log("postData contents: " + (e.postData ? e.postData.contents : "none"));

    const data = parseRequest(e);
    Logger.log("Parsed data: " + JSON.stringify(data));

    appendRow(data);
    Logger.log("Row appended successfully");

    return respond({ status: "success" });
  } catch (err) {
    Logger.log("ERROR: " + err.message);
    return respond({ status: "error", message: err.message });
  }
}

function doGet(e) {
  return respond({ status: "ok", message: "CreatorMate Apps Script is live." });
}

function parseRequest(e) {
  // FormData (sent by landing page with no-cors)
  if (e.parameter && Object.keys(e.parameter).length > 0) {
    Logger.log("Reading from e.parameter (FormData)");
    return {
      timestamp: e.parameter.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name:      e.parameter.name      || "(empty)",
      email:     e.parameter.email     || "(empty)",
      handle:    e.parameter.handle    || "(empty)",
      struggle:  e.parameter.struggle  || "—",
      budget:    e.parameter.budget    || "—",
    };
  }

  // JSON fallback
  if (e.postData && e.postData.contents) {
    Logger.log("Reading from postData (JSON)");
    return JSON.parse(e.postData.contents);
  }

  Logger.log("WARNING: No data found in request");
  return {
    timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name:      "(no data received)",
    email:     "(no data received)",
    handle:    "(no data received)",
    struggle:  "—",
    budget:    "—",
  };
}

function appendRow(data) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);

  Logger.log("Looking for sheet: " + SHEET_NAME);

  if (!sheet) {
    // List all available sheet names to help debug
    const allSheets = ss.getSheets().map(s => s.getName());
    Logger.log("Sheet not found! Available sheets: " + allSheets.join(", "));
    throw new Error("Sheet '" + SHEET_NAME + "' not found. Available: " + allSheets.join(", "));
  }

  Logger.log("Sheet found, appending row...");

  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.handle,
    data.struggle,
    data.budget,
    "Landing Page",
  ]);
}

function respond(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}