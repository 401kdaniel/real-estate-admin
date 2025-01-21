import emailjs from '@emailjs/browser';

export const createInquiry = async (inquiry: {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  location: string;
}) => {
  try {
    console.log("Sending inquiry:", inquiry);

    const templateParams = {
      from_name: inquiry.name,
      from_email: inquiry.email,
      phone: inquiry.phone,
      property_type: inquiry.propertyType,
      budget: inquiry.budget,
      location: inquiry.location,
      message: `New property inquiry from ${inquiry.name}`,
    };

    const response = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    // Store in localStorage
    const newInquiry = {
      ...inquiry,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    const storedInquiries = localStorage.getItem('inquiries');
    const inquiries = storedInquiries ? JSON.parse(storedInquiries) : [];
    inquiries.push(newInquiry);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));

    console.log("Email sent successfully:", response);
    return response;
  } catch (error: any) {
    console.error("Error sending inquiry:", error);
    throw error;
  }
}; 