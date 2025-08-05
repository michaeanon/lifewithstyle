import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("📧 Booking request received:", body)

    const { serviceName, selectedDate, selectedTime, selectedFormat, duration, price, clientInfo } = body

    // Generate booking ID
    const bookingId = `LWS-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Format date and time for emails
    const appointmentDate = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const appointmentTime = selectedTime

    // Email data for client confirmation ONLY (via EmailJS)
    const clientEmailData = {
      service_name: serviceName,
      booking_id: bookingId,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
      session_format: selectedFormat === "in-person" ? "In-Person Session" : "Virtual Session",
      duration: duration,
      price: price,
      client_name: clientInfo.name,
      client_email: clientInfo.email,
      client_phone: clientInfo.phone || "Not provided",
      client_notes: clientInfo.notes || "No additional notes",
      to_email: clientInfo.email,
      to_name: clientInfo.name,
      reply_to: "lifewithstyleinfo1@gmail.com",
      subject: `Booking Confirmation - ${serviceName}`,
    }

    let clientEmailSuccess = false
    let businessEmailSuccess = false

    // Send client confirmation email via EmailJS - Using BOOKING-specific variables
    try {
      console.log("📧 Sending client confirmation email via EmailJS...")

      // Use booking-specific environment variables (without _BOOKING_ prefix for backwards compatibility)
      const serviceId = process.env.EMAILJS_SERVICE_ID
      const templateId = process.env.EMAILJS_TEMPLATE_ID
      const publicKey = process.env.EMAILJS_PUBLIC_KEY
      const privateKey = process.env.EMAILJS_PRIVATE_KEY

      console.log("📧 Using booking EmailJS config:", {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        has_private_key: !!privateKey,
      })

      if (!serviceId || !templateId || !publicKey || !privateKey) {
        console.error("❌ Missing booking EmailJS environment variables")
        throw new Error("Missing EmailJS configuration for bookings")
      }

      const clientEmailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          accessToken: privateKey,
          template_params: clientEmailData,
        }),
      })

      const responseText = await clientEmailResponse.text()
      console.log("📧 EmailJS Response Status:", clientEmailResponse.status)
      console.log("📧 EmailJS Response Body:", responseText)

      if (clientEmailResponse.ok && responseText === "OK") {
        console.log("✅ Client confirmation email sent successfully via EmailJS")
        clientEmailSuccess = true
      } else {
        console.error("❌ EmailJS client email failed:", clientEmailResponse.status, responseText)
      }
    } catch (error) {
      console.error("❌ EmailJS client email error:", error)
    }

    // BUSINESS NOTIFICATION: Use FORMSPREE with proper format
    try {
      console.log("📧 Sending business notification via Formspree...")
      console.log("📧 Using Formspree endpoint: https://formspree.io/f/mnndklvg")

      // Simple Formspree data format that should work
      const formspreeData = {
        name: clientInfo.name,
        email: clientInfo.email,
        phone: clientInfo.phone || "Not provided",
        subject: `🎉 NEW BOOKING: ${serviceName} - ${clientInfo.name}`,
        message: `
NEW BOOKING RECEIVED!

BOOKING DETAILS:
- Booking ID: ${bookingId}
- Service: ${serviceName}
- Date: ${appointmentDate}
- Time: ${appointmentTime}
- Format: ${selectedFormat === "in-person" ? "In-Person Session" : "Virtual Session"}
- Duration: ${duration}
- Price: ${price}

CLIENT INFORMATION:
- Name: ${clientInfo.name}
- Email: ${clientInfo.email}
- Phone: ${clientInfo.phone || "Not provided"}
- Notes: ${clientInfo.notes || "No additional notes"}

BOOKING TIMESTAMP: ${new Date().toLocaleString()}
BOOKING STATUS: CONFIRMED

Please confirm this booking and add to your calendar.
You can reply to this email to contact the client directly.
        `,

        // Additional fields for tracking
        service: serviceName,
        booking_date: appointmentDate,
        booking_time: appointmentTime,
        booking_id: bookingId,
        session_format: selectedFormat,
        duration: duration,
        price: price,
        notes: clientInfo.notes || "None",

        // Formspree specific fields
        _replyto: clientInfo.email,
        _subject: `🎉 NEW BOOKING: ${serviceName} - ${clientInfo.name}`,
      }

      console.log("📧 Formspree data being sent:", JSON.stringify(formspreeData, null, 2))

      // Send to YOUR Formspree endpoint
      const formspreeResponse = await fetch("https://formspree.io/f/mnndklvg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formspreeData),
      })

      console.log("📧 Formspree response status:", formspreeResponse.status)

      if (formspreeResponse.ok) {
        const responseData = await formspreeResponse.json()
        console.log("✅ Business notification sent successfully via Formspree:", responseData)
        businessEmailSuccess = true
      } else {
        const errorText = await formspreeResponse.text()
        console.error("❌ Formspree business notification failed:", formspreeResponse.status, errorText)

        // Try even simpler format as backup
        try {
          console.log("📧 Trying ultra-simple Formspree format...")

          const simpleData = {
            name: clientInfo.name,
            email: clientInfo.email,
            message: `New booking: ${serviceName} on ${appointmentDate} at ${appointmentTime}. Client: ${clientInfo.name} (${clientInfo.email}). Booking ID: ${bookingId}`,
            _replyto: clientInfo.email,
          }

          const simpleResponse = await fetch("https://formspree.io/f/mnndklvg", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(simpleData),
          })

          if (simpleResponse.ok) {
            console.log("✅ Simple Formspree notification sent successfully")
            businessEmailSuccess = true
          } else {
            const simpleErrorText = await simpleResponse.text()
            console.error("❌ Simple Formspree failed:", simpleResponse.status, simpleErrorText)
          }
        } catch (simpleError) {
          console.error("❌ Simple Formspree error:", simpleError)
        }
      }
    } catch (error) {
      console.error("❌ Formspree business notification error:", error)
    }

    // FALLBACK: Try form-encoded data (traditional form submission)
    if (!businessEmailSuccess) {
      try {
        console.log("📧 Trying Formspree with form-encoded data as fallback...")

        const formData = new FormData()
        formData.append("name", clientInfo.name)
        formData.append("email", clientInfo.email)
        formData.append("phone", clientInfo.phone || "Not provided")
        formData.append("service", serviceName)
        formData.append("date", appointmentDate)
        formData.append("time", appointmentTime)
        formData.append("booking_id", bookingId)
        formData.append("_replyto", clientInfo.email)
        formData.append("_subject", `🎉 NEW BOOKING: ${serviceName} - ${clientInfo.name}`)
        formData.append(
          "message",
          `
NEW BOOKING RECEIVED!

Service: ${serviceName}
Date: ${appointmentDate}
Time: ${appointmentTime}
Client: ${clientInfo.name}
Email: ${clientInfo.email}
Phone: ${clientInfo.phone || "Not provided"}
Booking ID: ${bookingId}

Please confirm this booking.
        `,
        )

        const formResponse = await fetch("https://formspree.io/f/mnndklvg", {
          method: "POST",
          body: formData,
        })

        if (formResponse.ok) {
          console.log("✅ Form-encoded Formspree notification sent successfully")
          businessEmailSuccess = true
        } else {
          const formErrorText = await formResponse.text()
          console.error("❌ Form-encoded Formspree failed:", formResponse.status, formErrorText)
        }
      } catch (formError) {
        console.error("❌ Form-encoded Formspree error:", formError)
      }
    }

    // Return success response with detailed logging
    const response = {
      success: true,
      message: "Booking confirmed successfully! You will receive a confirmation email shortly.",
      bookingId: bookingId,
      emailStatus: {
        clientConfirmed: clientEmailSuccess,
        businessNotified: businessEmailSuccess,
        clientMethod: clientEmailSuccess ? "EmailJS" : "Failed",
        businessMethod: businessEmailSuccess ? "Formspree" : "Failed",
      },
      nextSteps: [
        "Check your email for booking confirmation",
        "Add the appointment to your calendar",
        "Prepare any questions or materials for your session",
        "Contact us if you need to make any changes",
      ],
      businessNotification: businessEmailSuccess
        ? "Business notification sent via Formspree to lifewithstyleinfo1@gmail.com"
        : "Business notification failed - please check Formspree configuration",
      debug: {
        formspreeEndpoint: "https://formspree.io/f/mnndklvg",
        businessEmailAttempted: true,
        businessEmailSuccess: businessEmailSuccess,
      },
    }

    console.log("📧 Final response:", JSON.stringify(response, null, 2))
    return NextResponse.json(response)
  } catch (error) {
    console.error("❌ Booking API error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking. Please try again or contact us directly at lifewithstyleinfo1@gmail.com",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
