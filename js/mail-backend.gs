/**
 * Portfolio contact form → Gmail
 *
 * This runs as YOU, so messages land in fabulousdallen87@gmail.com
 * from Google, not from a third-party form service Gmail can block.
 *
 * Setup (about 2 minutes):
 * 1. Open https://script.google.com
 * 2. New project → delete the default code → paste this whole file
 * 3. Save (Ctrl+S). Name it "Portfolio contact"
 * 4. Deploy → New deployment → select type "Web app"
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. Deploy → Authorize access with your Google account
 * 8. Copy the Web app URL
 * 9. Paste it into js/config.js as formEndpoint
 */

function doPost(e) {
  try {
    const data = read_(e);

    if (data._gotcha || data.botcheck) {
      return json_({ ok: true });
    }

    const name = clean_(data.name) || "Someone";
    const email = clean_(data.email);
    const pack = clean_(data.package) || "Not specified";
    const message = clean_(data.message);

    if (!email || !message) {
      return json_({ ok: false, error: "Missing email or message" });
    }

    const body =
      "New inquiry from your portfolio.\n\n" +
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Project: " + pack + "\n\n" +
      message +
      "\n\n— Reply directly to this email to reach them.";

    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      replyTo: email,
      name: name,
      subject: "Portfolio inquiry — " + pack,
      body: body
    });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput("Portfolio contact form is live.");
}

function read_(e) {
  if (!e) return {};
  if (e.postData && /json/i.test(e.postData.type || "")) {
    try {
      return JSON.parse(e.postData.contents || "{}") || {};
    } catch (err) {
      return {};
    }
  }
  return e.parameter || {};
}

function clean_(value) {
  return String(value == null ? "" : value).trim().slice(0, 4000);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
