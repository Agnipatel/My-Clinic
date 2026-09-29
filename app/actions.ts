"use server"

export async function submitToGHL(formData: FormData) {
  const name = formData.get("name") as string
  const clinicType = formData.get("clinicType") as string
  const phone = formData.get("phone") as string
  const email = formData.get("email") as string

  if (!name || !phone) {
    return { success: false, message: "Name and phone are required." }
  }

  try {
    const response = await fetch("https://services.leadconnectorhq.com/contacts/", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GHL_API_KEY}`,
        "Version": "2021-07-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        name: name,
        email: email,
        phone: phone,
        tags: ["cliniclp", clinicType].filter(Boolean),
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error("GHL Error:", errorData)
      return { success: false, message: "Failed to submit. Please try again later." }
    }

    return { success: true, message: "Successfully booked your strategy call!" }
  } catch (error) {
    console.error("Error submitting to GHL:", error)
    return { success: false, message: "An unexpected error occurred." }
  }
}
