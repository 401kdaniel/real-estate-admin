import { databases } from "@/lib/appwrite";
import { ID, Query } from "appwrite";

export const createInquiry = async (inquiry: {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  location: string;
}) => {
  try {
    const newInquiry = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_INQUIRIES_COLLECTION_ID!,
      ID.unique(),
      {
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        propertyType: inquiry.propertyType,
        budget: inquiry.budget,
        location: inquiry.location,
        status: "new",
        createdAt: new Date().toISOString(),
      }
    );

    return newInquiry;
  } catch (error) {
    console.error("Error creating inquiry:", error);
    throw error;
  }
};

export const getRecentInquiryList = async () => {
  try {
    const inquiries = await databases.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_INQUIRIES_COLLECTION_ID!,
      [Query.orderDesc("createdAt")]
    );

    const newCount = inquiries.documents.filter(
      (doc) => doc.status === "new"
    ).length;
    const inProgressCount = inquiries.documents.filter(
      (doc) => doc.status === "inProgress"
    ).length;
    const completedCount = inquiries.documents.filter(
      (doc) => doc.status === "completed"
    ).length;

    return {
      documents: inquiries.documents,
      newCount,
      inProgressCount,
      completedCount,
    };
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    throw error;
  }
}; 