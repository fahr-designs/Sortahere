module.exports = {
  subject: "You're Invited 🌿 To A Baby Shower!",

  html: (rsvpUrl, name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>You're Invited!</title>
  <!--
    Google Fonts: supported in Apple Mail, iOS Mail, modern Android.
    Gmail and Outlook will fall back to Georgia. Always define a serif fallback.
  -->
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
  <!--
    A minimal <style> block for pseudo-selectors and media queries.
    Gmail strips this in some views — all critical styles must also be inline.
  -->
  <style>
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding: 16px !important; }
      .card { padding: 24px 20px !important; }
      .details-table td { display: block !important; padding: 4px 0 !important; }
    }
    a.cta-btn:hover {
      background-color: #4a6640 !important;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f5efe4; font-family: 'Playfair Display', Georgia, serif;">

  <!-- Outer wrapper: sets max-width and centers -->
  <table
    role="presentation"
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="background-color: #f5efe4;"
  >
    <tr>
      <td align="center" class="email-wrapper" style="padding: 32px 16px;">

        <!-- Card container -->
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="max-width: 560px; background-color: #fdf8f0; border-radius: 12px; border: 1px solid #d6c9a8; box-shadow: 0 4px 20px rgba(59,47,47,0.08);"
        >

          <!-- Header band -->
          <tr>
            <td
              align="center"
              style="background-color: #5c7a4e; padding: 28px 32px 24px; border-radius: 11px 11px 0 0;"
            >
              <p style="margin: 0; font-size: 22px; color: #f5efe4; letter-spacing: 3px; text-transform: uppercase; font-family: 'Playfair Display', Georgia, serif; font-weight: 400;">
                You're Invited
              </p>
              <h1 style="margin: 8px 0 0; font-size: 36px; color: #ffffff; font-family: 'Playfair Display', Georgia, serif; font-weight: 700; line-height: 1.2;">
                🌿 Baby Shower 🌿
              </h1>
              <p style="margin: 10px 0 0; font-size: 16px; color: #c8dbb8; font-family: Georgia, serif; font-style: italic;">
                for [Parent Name(s)]
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td class="card" style="padding: 32px 40px;">

              <!-- Intro -->
              <p style="margin: 0 0 24px; font-size: 16px; color: #4a3728; line-height: 1.7; font-family: Georgia, serif; text-align: center;">
                Dear ${name},
                <br />
                We'd love to have you join us as we celebrate the arrival of baby Aguilar-Hernandez-Ross!
                Come share in the joy with good company, warm hearts, and a few woodland friends.
              </p>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top: 1px solid #d6c9a8; padding-bottom: 24px;"></td>
                </tr>
              </table>

              <!-- Event details block -->
              <table role="presentation" class="details-table" width="100%" 
                cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 28px;">
                <tr>
                  <td style="padding: 8px 0; font-family: Georgia, serif; font-size: 14px; color: #8a7a60; text-transform: uppercase; letter-spacing: 1.5px; width: 100px; vertical-align: top;">
                    Date
                  </td>
                  <td style="padding: 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 17px; color: #3b2f2f; font-weight: 700; vertical-align: top;">
                    [Date]
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-family: Georgia, serif; font-size: 14px; color: #8a7a60; text-transform: uppercase; letter-spacing: 1.5px; vertical-align: top;">
                    Time
                  </td>
                  <td style="padding: 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 17px; color: #3b2f2f; font-weight: 700; vertical-align: top;">
                    [Time]
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-family: Georgia, serif; font-size: 14px; color: #8a7a60; text-transform: uppercase; letter-spacing: 1.5px; vertical-align: top;">
                    Location
                  </td>
                  <td style="padding: 8px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 17px; color: #3b2f2f; font-weight: 700; vertical-align: top;">
                    [Location]
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-top: 1px solid #d6c9a8; padding-bottom: 28px;"></td>
                </tr>
              </table>

              <!-- CTA button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <!--
                      Bulletproof button pattern: <a> inside a <td> with background-color on the <td>.
                      This ensures Outlook renders the background even when it ignores border-radius.
                      See: https://buttons.cm (Campaign Monitor's bulletproof button generator)
                    -->
                    
                      href="${rsvpUrl}"
                      class="cta-btn"
                      target="_blank"
                      style="
                        display: inline-block;
                        background-color: #b87333;
                        color: #ffffff;
                        font-family: Georgia, serif;
                        font-size: 15px;
                        font-weight: 700;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                        text-decoration: none;
                        padding: 14px 40px;
                        border-radius: 6px;
                      ">
                      RSVP Now
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 20px 0 0; font-size: 13px; color: #9e8e78; font-family: Georgia, serif; text-align: center;">
                Can't click the button? Copy this link into your browser:<br />
                <span style="color: #5c7a4e; word-break: break-all;">${rsvpUrl}</span>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center"
              style="background-color: #ede3d0; padding: 20px 32px; border-radius: 0 0 11px 11px; border-top: 1px solid #d6c9a8;">
              <p style="margin: 0; font-size: 13px; color: #8a7a60; font-family: Georgia, serif; font-style: italic;">
                Sent with love 🍄🌿🐿️
              </p>
            </td>
          </tr>

          <tr>
            <td style="height: 16px;">
              <p>
                &nbsp; Check out the baby 
                  <a href="${registryUrl}" target="_blank" style="color: #5c7a4e; text-decoration: underline;">registry</a>! &nbsp;
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