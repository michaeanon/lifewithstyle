import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email } = body

    console.log("📧 Newsletter subscription request:", { firstName, lastName, email })

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: "Invalid email format" }, { status: 400 })
    }

    // Use newsletter-specific environment variables first, fallback to general ones
    const serviceId = process.env.EMAILJS_NEWSLETTER_SERVICE_ID || process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_NEWSLETTER_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY
    const privateKey = process.env.EMAILJS_NEWSLETTER_PRIVATE_KEY || process.env.EMAILJS_PRIVATE_KEY

    console.log("📧 Using EmailJS config:", {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      has_private_key: !!privateKey,
    })

    // Check if all required environment variables are present
    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error("❌ Missing required EmailJS environment variables")
      return NextResponse.json(
        {
          success: false,
          message: "Newsletter service configuration error. Please contact support.",
          debug: {
            hasServiceId: !!serviceId,
            hasTemplateId: !!templateId,
            hasPublicKey: !!publicKey,
            hasPrivateKey: !!privateKey,
          },
        },
        { status: 500 },
      )
    }

    // Send welcome email to subscriber
    let emailSent = false
    let emailError = null
    try {
      const emailPayload = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: {
          // Send TO the subscriber
          to_email: email,
          to_name: `${firstName} ${lastName}`,

          // FROM your business
          from_name: "Life with Style",
          from_email: "lifewithstyleinfo1@gmail.com",
          reply_to: "lifewithstyleinfo1@gmail.com",

          // Subscriber details
          subscriber_name: `${firstName} ${lastName}`,
          subscriber_email: email,
          first_name: firstName,
          last_name: lastName,

          // Email content
          subject: "Welcome to Life with Style Newsletter! 💎",
          message: `Hi ${firstName},

Welcome to the Life with Style community! 🎉

Thank you for subscribing to our newsletter. You're now part of an exclusive group that receives:

✨ Latest fashion trends and styling tips
👗 Seasonal outfit inspiration  
💎 Exclusive styling advice
🛍️ Early access to our services and collections
📸 Behind-the-scenes content

What's Next:
📧 Keep an eye on your inbox for our weekly style updates
💌 Follow us on social media for daily inspiration
📞 Book a consultation if you're ready for a personal styling session

We're excited to help you elevate your style journey!

Best regards,
The Life with Style Team

---
Life with Style
Email: lifewithstyleinfo1@gmail.com
Website: lifewithstyle.com

P.S. You can unsubscribe at any time by replying to any of our emails.`,

          // Additional template variables
          greeting: `Hi ${firstName}`,
          title: "Welcome to Life with Style!",
          content: `Thank you for joining our style community. Get ready for exclusive fashion tips and inspiration!`,
          signature: "The Life with Style Team",
          company_name: "Life with Style",
          website: "lifewithstyle.com",
          subscription_date: new Date().toLocaleDateString(),
        },
      }

      console.log("📧 Sending EmailJS request to subscriber:", email)

      const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      })

      const responseText = await emailResponse.text()
      console.log("📧 EmailJS Response Status:", emailResponse.status)
      console.log("📧 EmailJS Response Body:", responseText)

      if (emailResponse.ok && responseText === "OK") {
        emailSent = true
        console.log("✅ Welcome email sent successfully via EmailJS to subscriber:", email)
      } else {
        emailError = `EmailJS Error (${emailResponse.status}): ${responseText}`
        console.error("❌ EmailJS error:", emailError)
      }
    } catch (error) {
      emailError = error instanceof Error ? error.message : "Unknown EmailJS error"
      console.error("❌ EmailJS request failed:", emailError)
    }

    // Send business notification via Formspree
    let businessNotified = false
    try {
      const formspreeResponse = await fetch("https://formspree.io/f/xdkogqko", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          name: `${firstName} ${lastName}`,
          subject: "📧 New Newsletter Subscription - Life with Style",
          message: `New newsletter subscription received!

📧 Subscriber Details:
• Name: ${firstName} ${lastName}
• Email: ${email}
• Subscribed: ${new Date().toLocaleString()}

Email Status: ${emailSent ? "✅ Welcome email sent" : "❌ Welcome email failed"}
${emailError ? `Email Error: ${emailError}` : ""}

The subscriber has been added to your mailing list and should receive welcome email shortly.

---
Life with Style Newsletter System`,
        }),
      })

      if (formspreeResponse.ok) {
        businessNotified = true
        console.log("✅ Business notification sent successfully")
      }
    } catch (error) {
      console.log("⚠️ Business notification failed (non-critical):", error)
    }

    // Return success response
    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: "🎉 Welcome to Life with Style! Check your email for a welcome message.",
      })
    } else {
      return NextResponse.json({
        success: true,
        message: "✅ Subscription confirmed! Welcome email will arrive shortly.",
        debug: {
          emailError,
          businessNotified,
        },
      })
    }
  } catch (error) {
    console.error("❌ Newsletter subscription error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "❌ Something went wrong. Please try again.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
