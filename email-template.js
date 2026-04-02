module.exports = {
  subject: "You're invited to [Name]'s Baby Shower! 🌿",
  html: (rsvpUrl) => `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: auto; color: #3b2f2f;">
      <h1 style="color: #5c7a4e;">You're Invited! 🌿</h1>
      <p>Join us to celebrate [Parent Name(s)] and their little one.</p>
      <p>
        <strong>Date:</strong> [Date]<br/>
        <strong>Time:</strong> [Time]<br/>
        <strong>Location:</strong> [Location]
      </p>
      <a href="${rsvpUrl}" style="
        background: #5c7a4e; color: white;
        padding: 12px 24px; text-decoration: none;
        border-radius: 6px; display: inline-block; margin-top: 16px;">
        RSVP Now
      </a>
      <p style="color: #888; font-size: 13px; margin-top: 32px;">Sent with love 🍄</p>
    </div>
  `
};