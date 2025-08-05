import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    // Test data
    const testData = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
    }

    console.log("🧪 Testing newsletter subscription with:", testData)

    // Use newsletter-specific environment variables first, fallback to general ones
    const serviceId = process.env.EMAILJS_NEWSLETTER_SERVICE_ID || process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_NEWSLETTER_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY
    const privateKey = process.env.EMAILJS_NEWSLETTER_PRIVATE_KEY || process.env.EMAILJS_PRIVATE_KEY

    console.log("🧪 Using EmailJS config:", {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      has_private_key: !!privateKey,
    })

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      return NextResponse.json({
        success: false,
        message: "Missing EmailJS environment variables",
        debug: {
          hasServiceId: !!serviceId,
          hasTemplateId: !!templateId,
          hasPublicKey: !!publicKey,
          hasPrivateKey: !!privateKey,
        },
      })
    }

    // Test EmailJS request
    const emailPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        to_email: testData.email,
        to_name: `${testData.firstName} ${testData.lastName}`,
        from_name: "Life with Style",
        from_email: "lifewithstyleinfo1@gmail.com",
        reply_to: "lifewithstyleinfo1@gmail.com",
        subscriber_name: `${testData.firstName} ${testData.lastName}`,
        subscriber_email: testData.email,
        first_name: testData.firstName,
        last_name: testData.lastName,
        subject: "Test Newsletter Subscription",
        message: "This is a test email from the newsletter system.",
        greeting: `Hi ${testData.firstName}`,
        title: "Test Email",
        content: "This is a test of the newsletter system.",
        signature: "The Life with Style Team",
        company_name: "Life with Style",
        website: "lifewithstyle.com",
        subscription_date: new Date().toLocaleDateString(),
      },
    }

    console.log("🧪 Sending test EmailJS request...")

    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    const responseText = await emailResponse.text()
    console.log("🧪 EmailJS Response Status:", emailResponse.status)
    console.log("🧪 EmailJS Response Body:", responseText)

    return NextResponse.json({
      success: emailResponse.ok && responseText === "OK",
      message: emailResponse.ok ? "Test email sent successfully!" : "Test email failed",
      debug: {
        status: emailResponse.status,
        response: responseText,
        config: {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          has_private_key: !!privateKey,
        },
      },
    })
  } catch (error) {
    console.error("🧪 Newsletter test error:", error)
    return NextResponse.json({
      success: false,
      message: "Test failed with error",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ success: false, message: "Email is required for testing" }, { status: 400 })
    }

    console.log("🧪 Testing newsletter subscription with custom email:", email)

    // Use newsletter-specific environment variables first, fallback to general ones
    const serviceId = process.env.EMAILJS_NEWSLETTER_SERVICE_ID || process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_NEWSLETTER_TEMPLATE_ID || process.env.EMAILJS_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_NEWSLETTER_PUBLIC_KEY || process.env.EMAILJS_PUBLIC_KEY
    const privateKey = process.env.EMAILJS_NEWSLETTER_PRIVATE_KEY || process.env.EMAILJS_PRIVATE_KEY

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      return NextResponse.json({
        success: false,
        message: "Missing EmailJS environment variables",
        debug: {
          hasServiceId: !!serviceId,
          hasTemplateId: !!templateId,
          hasPublicKey: !!publicKey,
          hasPrivateKey: !!privateKey,
        },
      })
    }

    const emailPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: {
        to_email: email,
        to_name: "Test User",
        from_name: "Life with Style",
        from_email: "lifewithstyleinfo1@gmail.com",
        reply_to: "lifewithstyleinfo1@gmail.com",
        subscriber_name: "Test User",
        subscriber_email: email,
        first_name: "Test",
        last_name: "User",
        subject: "Test Newsletter Subscription",
        message: `This is a test email sent to ${email} from the newsletter system.`,
        greeting: "Hi Test",
        title: "Test Email",
        content: "This is a test of the newsletter system with your custom email.",
        signature: "The Life with Style Team",
        company_name: "Life with Style",
        website: "lifewithstyle.com",
        subscription_date: new Date().toLocaleDateString(),
      },
    }

    const emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    })

    const responseText = await emailResponse.text()

    return NextResponse.json({
      success: emailResponse.ok && responseText === "OK",
      message: emailResponse.ok ? `Test email sent successfully to ${email}!` : "Test email failed",
      debug: {
        status: emailResponse.status,
        response: responseText,
        email: email,
      },
    })
  } catch (error) {
    console.error("🧪 Newsletter test error:", error)
    return NextResponse.json({
      success: false,
      message: "Test failed with error",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
