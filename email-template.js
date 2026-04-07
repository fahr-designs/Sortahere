// email-template.js
// Baby shower invitation email — Baby Aguilar-Hernandez-Ross
// Design: matches physical invitation — sage green, warm brown, woodland creatures
// Layout: table-based for cross-client compatibility (Gmail, Outlook, Apple Mail)
// Fonts: Playfair Display via Google Fonts (fallback: Georgia, serif)

module.exports = {
  subject: "You're Invited 🌿 Baby Shower · Baby Aguilar-Hernandez-Ross",

  html: (rsvpUrl, name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>You're Invited!</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Cinzel:wght@400;600&display=swap" rel="stylesheet" />
  <style>
    @media only screen and (max-width: 600px) {
      .email-wrapper  { padding: 12px !important; }
      .card           { padding: 28px 20px !important; }
      .hero-title     { font-size: 52px !important; }
      .honoree        { font-size: 22px !important; }
      .details-wrap   { display: block !important; }
      .details-col    { display: block !important; width: 100% !important; padding-bottom: 16px !important; }
      .divider-col    { display: none !important; }
    }
    a.cta-btn:hover { background-color: #9e6428 !important; }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#7d9e82;font-family:'Playfair Display',Georgia,serif;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#7d9e82;background-image:linear-gradient(160deg,rgba(255,255,255,0.12) 0%,transparent 60%);">
    <tr>
      <td align="center" class="email-wrapper" style="padding:32px 16px;">

        <!-- Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:580px;background-color:#f4ede0;border-radius:20px;border:1px solid #c9b99a;box-shadow:0 8px 32px rgba(0,0,0,0.15);overflow:hidden;">

          <!-- ── HERO BAND ── -->
          <tr>
            <td align="center"
              style="background-color:#5e7d63;background-image:linear-gradient(180deg,rgba(255,255,255,0.1) 0%,transparent 100%);padding:36px 32px 28px;border-bottom:3px solid #c9b99a;">

              <!-- Creatures row -->
              <p style="margin:0 0 8px;font-size:28px;letter-spacing:12px;">🐻 🦊 🦌</p>

              <!-- JOIN US FOR A -->
              <p style="margin:0 0 4px;font-family:'Cinzel',Georgia,serif;font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#f4ede0;font-weight:600;">
                Join Us For A
              </p>

              <!-- BABY SHOWER -->
              <h1 style="margin:4px 0 6px;font-family:'Playfair Display',Georgia,serif;font-size:68px;font-weight:700;color:#3e2a12;line-height:0.88;text-shadow:1px 2px 0 rgba(255,255,255,0.25);" class="hero-title">
                Baby<br />Shower
              </h1>

              <!-- IN HONOR OF -->
              <p style="margin:12px 0 6px;font-family:'Cinzel',Georgia,serif;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#a8c4ac;">
                In Honor Of
              </p>

              <!-- HONOREE -->
              <h2 style="margin:0 0 4px;font-family:'Playfair Display',Georgia,serif;font-size:26px;font-weight:500;font-style:italic;color:#3e2a12;line-height:1.3;" class="honoree">
                Baby Aguilar-Hernandez-Ross
              </h2>

              <!-- flourish -->
              <p style="margin:12px 0 0;color:#a8c4ac;font-size:16px;letter-spacing:8px;">— ❧ —</p>

            </td>
          </tr>

          <!-- ── GREETING ── -->
          <tr>
            <td style="padding:28px 40px 0;" class="card">
              <p style="margin:0;font-family:Georgia,serif;font-size:15px;color:#5c3d1e;line-height:1.7;text-align:center;">
                Dear <strong style="color:#3e2a12;">${name}</strong>,
              </p>
              <p style="margin:10px 0 0;font-family:Georgia,serif;font-size:15px;color:#5c3d1e;line-height:1.7;text-align:center;">
                We'd love for you to join us as we celebrate the arrival of our little one.
                Come share in the joy — good company, warm hearts, and a few woodland friends.
              </p>
            </td>
          </tr>

          <!-- ── DIVIDER ── -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid #c9b99a;"></td></tr>
              </table>
            </td>
          </tr>

          <!-- ── EVENT DETAILS (two columns) ── -->
          <tr>
            <td style="padding:20px 40px 0;" class="card">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="details-wrap">
                <tr>
                  <!-- Left column: when & where -->
                  <td valign="top" width="48%" class="details-col" style="padding-right:12px;">
                    <p style="margin:0 0 3px;font-family:'Cinzel',Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8a6642;">When</p>
                    <p style="margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:17px;font-weight:700;color:#3e2a12;">
                      May 31<sup style="font-size:11px;">st</sup>, 2026<br />
                      <span style="font-weight:400;font-style:italic;font-size:15px;">2:00 PM – 8:00 PM</span>
                    </p>
                    <p style="margin:0 0 3px;font-family:'Cinzel',Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8a6642;">Where</p>
                    <p style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:700;color:#3e2a12;line-height:1.4;">
                      Matt Ross Community Center<br />
                      <span style="font-weight:400;font-style:italic;font-size:14px;">8101 Marty St, OP, KS 66204</span>
                    </p>
                  </td>

                  <!-- Divider column -->
                  <td width="4%" class="divider-col" style="text-align:center;">
                    <div style="width:1px;background:#c9b99a;margin:0 auto;height:100%;min-height:80px;"></div>
                  </td>

                  <!-- Right column: RSVP & registry -->
                  <td valign="top" width="48%" class="details-col" style="padding-left:12px;">
                    <p style="margin:0 0 3px;font-family:'Cinzel',Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8a6642;">RSVP To</p>
                    <p style="margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:15px;color:#3e2a12;line-height:1.6;">
                      Victoria · 913.515.5114<br />
                      Franco · 913.378.6526
                    </p>
                    <p style="margin:0 0 3px;font-family:'Cinzel',Georgia,serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#8a6642;">Registry</p>
                    <p style="margin:0;font-family:Georgia,serif;font-size:13px;color:#3e2a12;">
                      <a href="https://my.babylist.com/ydirpkmcn" target="_blank"
                        style="color:#5e7d63;word-break:break-all;">my.babylist.com/ydirpkmcn</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── DIVIDER ── -->
          <tr>
            <td style="padding:24px 40px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="border-top:1px solid #c9b99a;"></td></tr>
              </table>
            </td>
          </tr>

          <!-- ── CTA BUTTON ── -->
          <tr>
            <td align="center" style="padding:24px 40px 0;" class="card">
              <p style="margin:0 0 16px;font-family:'Cinzel',Georgia,serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a6642;">
                Kindly Reply By May 24th
              </p>
              <!-- Bulletproof button: background on <td>, not just <a> -->
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background-color:#c17f3a;border-radius:10px;">
                    <a href="${rsvpUrl}"
                      class="cta-btn"
                      target="_blank"
                      style="display:inline-block;background-color:#c17f3a;color:#ffffff;font-family:'Cinzel',Georgia,serif;font-size:12px;font-weight:600;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:14px 44px;border-radius:10px;">
                      RSVP Now
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:16px 0 0;font-size:12px;color:#8a6642;font-family:Georgia,serif;text-align:center;">
                Or copy this link into your browser:<br />
                <span style="color:#5e7d63;word-break:break-all;">${rsvpUrl}</span>
              </p>
            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td align="center"
              style="background-color:#5e7d63;padding:20px 32px;margin-top:28px;border-top:3px solid #c9b99a;">
              <!-- spacing above footer band -->
            </td>
          </tr>
          <tr>
            <td align="center"
              style="background-color:#5e7d63;padding:0 32px 24px;border-radius:0 0 20px 20px;">
              <p style="margin:0;font-size:20px;letter-spacing:10px;">🦔 🌿 🦝</p>
              <p style="margin:8px 0 0;font-size:12px;color:#d4e8d4;font-family:Georgia,serif;font-style:italic;">
                Sent with love from the Aguilar-Hernandez-Ross family
              </p>
            </td>
          </tr>

        </table>
        <!-- /card -->

      </td>
    </tr>
  </table>

</body>
</html>
  `
};