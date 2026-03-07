const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactEmail = async ({ name, email, message }) => {
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: process.env.MAIL_USER,
		reply_to: email,
		subject: `[Portfolio] Nouveau message de ${name}`,
		html: `
            <div style="font-family:monospace;background:#0f172a;color:#e2e8f0;padding:2rem;border:2px solid #2563eb;">
                <h2 style="color:#2563eb;text-transform:uppercase;letter-spacing:0.1em;">
                    📨 Nouveau message — Portfolio
                </h2>
                <hr style="border-color:#2563eb;margin:1rem 0;" />
                <p><strong style="color:#60a5fa;">De :</strong> ${name}</p>
                <p><strong style="color:#60a5fa;">Email :</strong> ${email}</p>
                <hr style="border-color:#1e3a5f;margin:1rem 0;" />
                <p><strong style="color:#60a5fa;">Message :</strong></p>
                <blockquote style="border-left:4px solid #2563eb;padding-left:1rem;color:#94a3b8;font-style:italic;">
                    ${message.replace(/\n/g, "<br>")}
                </blockquote>
            </div>
        `,
	});
};

module.exports = { sendContactEmail };
