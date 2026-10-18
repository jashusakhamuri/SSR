const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const isSmtpConfigured =
  process.env.EMAIL_USER &&
  !process.env.EMAIL_USER.includes('your_gmail') &&
  process.env.EMAIL_APP_PASSWORD &&
  !process.env.EMAIL_APP_PASSWORD.includes('your_gmail');

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
      // Critical for avoiding spam
      tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2',
      },
    })
  : null;

// Anti-spam: build a proper Message-ID
function buildMessageId() {
  const domain = process.env.EMAIL_USER
    ? process.env.EMAIL_USER.split('@')[1]
    : 'mirchistore.com';
  return `<${uuidv4()}@${domain}>`;
}

// Plain text version for multipart (spam filters reward this)
function toPlainText(order) {
  return `
ORDER CONFIRMATION — Mirchi Powder Store
==========================================
Order ID  : #${order.id}
Customer  : ${order.customer_name}
Product   : ${order.product} (x${order.quantity})
Subtotal  : ₹${parseFloat(order.subtotal).toFixed(2)}
Shipping  : ₹${parseFloat(order.shipping).toFixed(2)}
GST (18%) : ₹${parseFloat(order.gst).toFixed(2)}
TOTAL     : ₹${parseFloat(order.total).toFixed(2)}

Shipping Address:
${order.address}
${order.city ? order.city + ', ' : ''}${order.state ? order.state + ', ' : ''}${order.postal_code || ''}
${order.country}
Phone: ${order.phone}

Thank you for supporting traditional Indian spice craftsmanship!
Reply to this email or WhatsApp us at +91 98765 43210 for any queries.

— The Mirchi Powder Store Team
`.trim();
}

function customerHtml(order) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation — Mirchi Powder Store</title>
</head>
<body style="margin:0;padding:0;background:#FFF8F0;font-family:Georgia,serif;color:#4E342E;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #EAD9C8;border-radius:4px;overflow:hidden;max-width:600px;">

        <!-- Header -->
        <tr>
          <td style="background:#9E1B20;padding:28px 32px;text-align:center;border-bottom:4px solid #DFAE2B;">
            <h1 style="margin:0;color:#FFF8F0;font-size:26px;font-weight:normal;letter-spacing:2px;">🌶️ Mirchi Powder Store</h1>
            <p style="margin:6px 0 0;color:#DFAE2B;font-style:italic;font-size:13px;">Traditional · Handcrafted · Pure</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <h2 style="color:#9E1B20;font-size:20px;font-weight:normal;margin-top:0;border-bottom:1px dashed #DFAE2B;padding-bottom:12px;">✅ Order Confirmed</h2>
            <p style="font-size:15px;">Namaste <strong>${order.customer_name}</strong>,</p>
            <p style="font-size:14px;line-height:1.7;color:#5C453C;">
              Thank you for choosing <strong>Mirchi Powder Store</strong>. We have received your order and our spice team is preparing your fresh batch with care.
            </p>

            <!-- Order Info Box -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF8F0;border-left:4px solid #DFAE2B;margin:20px 0;border-radius:2px;">
              <tr><td style="padding:16px;">
                <p style="margin:0 0 6px;font-size:13px;"><strong>Order ID:</strong> #${order.id}</p>
                <p style="margin:0 0 6px;font-size:13px;"><strong>Date:</strong> ${new Date(order.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p style="margin:0;font-size:13px;"><strong>Status:</strong> <span style="color:#50723C;font-weight:bold;">Confirmed — Pending Dispatch</span></p>
              </td></tr>
            </table>

            <!-- Invoice Table -->
            <h3 style="font-size:15px;color:#4E342E;border-bottom:1px solid #EAD9C8;padding-bottom:8px;">Order Summary</h3>
            <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
              <tr style="border-bottom:2px solid #9E1B20;">
                <th style="text-align:left;color:#4E342E;">Item</th>
                <th style="text-align:center;color:#4E342E;">Qty</th>
                <th style="text-align:right;color:#4E342E;">Amount</th>
              </tr>
              <tr style="border-bottom:1px solid #EAD9C8;">
                <td style="padding:10px 8px;">${order.product}</td>
                <td style="text-align:center;">${order.quantity}</td>
                <td style="text-align:right;">₹${parseFloat(order.subtotal).toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2" style="text-align:right;color:#7F6A61;padding:6px 8px;">Shipping</td>
                <td style="text-align:right;color:#7F6A61;">₹${parseFloat(order.shipping).toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="2" style="text-align:right;color:#7F6A61;padding:6px 8px;">GST (18%)</td>
                <td style="text-align:right;color:#7F6A61;">₹${parseFloat(order.gst).toFixed(2)}</td>
              </tr>
              <tr style="border-top:2px solid #9E1B20;font-size:16px;font-weight:bold;color:#9E1B20;">
                <td colspan="2" style="padding:12px 8px;">Grand Total</td>
                <td style="text-align:right;">₹${parseFloat(order.total).toFixed(2)}</td>
              </tr>
            </table>

            <!-- Delivery Address -->
            <h3 style="font-size:15px;color:#4E342E;border-bottom:1px solid #EAD9C8;padding-bottom:8px;margin-top:28px;">Shipping To</h3>
            <p style="font-size:13px;color:#5C453C;font-style:italic;line-height:1.8;margin:0;">
              ${order.address}<br>
              ${order.city ? order.city + ', ' : ''}${order.state ? order.state + ', ' : ''}${order.postal_code || ''}<br>
              <strong>${order.country}</strong><br>
              📞 ${order.phone}
            </p>

            ${order.special_instructions ? `
            <div style="margin-top:20px;background:#f9f5f0;border:1px dashed #C8A87A;padding:14px;border-radius:2px;">
              <strong style="font-size:13px;">Special Instructions:</strong>
              <p style="margin:6px 0 0;font-size:12px;font-style:italic;color:#7F6A61;">${order.special_instructions}</p>
            </div>` : ''}

            <!-- Footer note -->
            <div style="margin-top:36px;text-align:center;border-top:1px dashed #DFAE2B;padding-top:24px;">
              <p style="font-size:12px;color:#9F8A7A;">Questions? Reply to this email or WhatsApp us at <strong>+91 98765 43210</strong></p>
              <p style="font-size:13px;color:#9E1B20;font-weight:bold;margin-top:6px;">Thank you for supporting traditional Indian spice farming! 🌿</p>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#4E342E;padding:16px;text-align:center;">
            <p style="margin:0;color:#C8A87A;font-size:11px;">© ${new Date().getFullYear()} Mirchi Powder Store · Guntur, Andhra Pradesh, India</p>
            <p style="margin:4px 0 0;color:#9F8A7A;font-size:10px;">You received this because you placed an order on our store.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminHtml(order) {
  return `<!DOCTYPE html>
<html><body style="font-family:sans-serif;background:#f4f4f4;padding:20px;color:#333;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-top:4px solid #9E1B20;padding:24px;border-radius:4px;">
    <h2 style="color:#9E1B20;margin-top:0;">🚨 New Order #${order.id}</h2>
    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
      <tr style="background:#f9f9f9;"><td style="font-weight:bold;width:40%;">Customer</td><td>${order.customer_name}</td></tr>
      <tr><td style="font-weight:bold;">Email</td><td>${order.email || 'Not provided'}</td></tr>
      <tr style="background:#f9f9f9;"><td style="font-weight:bold;">Phone</td><td>${order.phone}</td></tr>
      <tr><td style="font-weight:bold;">Country</td><td>${order.country}</td></tr>
      <tr style="background:#f9f9f9;"><td style="font-weight:bold;">Address</td><td>${order.address}, ${order.city || ''} ${order.state || ''} - ${order.postal_code || ''}</td></tr>
      <tr><td style="font-weight:bold;">Product</td><td>${order.product} × ${order.quantity}</td></tr>
      <tr style="background:#f9f9f9;"><td style="font-weight:bold;">Total</td><td style="color:#9E1B20;font-weight:bold;font-size:16px;">₹${parseFloat(order.total).toFixed(2)}</td></tr>
    </table>
  </div>
</body></html>`;
}

async function sendOrderEmails(order) {
  if (!isSmtpConfigured) {
    console.log('\n📧 [EMAIL DEV MODE] SMTP not configured — printing email preview:');
    console.log(`  To Customer: ${order.email || 'N/A'}`);
    console.log(`  Order: #${order.id} | ${order.product} × ${order.quantity} | ₹${parseFloat(order.total).toFixed(2)}`);
    console.log('  (Set EMAIL_USER and EMAIL_APP_PASSWORD in server/.env to send real emails)\n');
    return;
  }

  const messageId = buildMessageId();
  const subject = `Order Confirmed #${order.id} — Mirchi Powder Store`;

  try {
    // Send to customer
    if (order.email) {
      await transporter.sendMail({
        from: `"Mirchi Powder Store" <${process.env.EMAIL_USER}>`,
        to: order.email,
        replyTo: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject,
        'message-id': messageId,
        headers: {
          'X-Mailer': 'Mirchi Store Mailer 1.0',
          'List-Unsubscribe': `<mailto:${process.env.EMAIL_USER}?subject=unsubscribe>`,
          'Precedence': 'transactional',
        },
        text: toPlainText(order),
        html: customerHtml(order),
      });
      console.log(`✅ Order confirmation email sent → ${order.email}`);
    }

    // Send to admin
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
    await transporter.sendMail({
      from: `"Mirchi Store Alerts" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `🔔 New Order #${order.id} — ₹${parseFloat(order.total).toFixed(2)}`,
      'message-id': buildMessageId(),
      text: `New order from ${order.customer_name}. Order #${order.id}. Total ₹${parseFloat(order.total).toFixed(2)}.`,
      html: adminHtml(order),
    });
    console.log(`✅ Admin alert sent → ${adminEmail}`);

  } catch (err) {
    console.error('❌ Email send failed:', err.message);
  }
}

module.exports = { sendOrderEmails };
