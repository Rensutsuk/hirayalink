"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { jsPDF } from "jspdf";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

export default function FullMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/success-stories", label: "Success Stories" },
    { href: "/admin/admin-request-donation", label: "Request Donation" },
    { href: "/admin/manage-donation-request-posts", label: "Manage Donation Request Posts" },
    { href: "/admin/feedbacks-and-comments", label: "Calamity Impact" },
    // Add the Report Generation button here
    { href: "#", label: "Generate Report", isButton: true },
  ];

  const handleReportGeneration = async () => {
    if (!session) {
      alert("You need to be logged in to generate a report.");
      return;
    }

    try {
      const response = await fetch("/api/report");
      if (!response.ok) {
        throw new Error("Failed to fetch report data");
      }

      const reportData = await response.json();

      // Create a new PDF document with specified dimensions
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [612, 936], // 8.5" x 13"
        putOnlyUsedFonts: true,
        floatPrecision: 16,
      });

      // Set margins
      const topMargin = 72; // 1 inch in points
      const bottomMargin = 108; // 1.5 inches in points
      let verticalPosition = topMargin; // Start position for the next section

      // Set the title
      doc.setFontSize(24); // Adjust font size as needed
      doc.setTextColor(0, 128, 0); // Set text color to green
      const title = "HirayaLink Report";
      const titleWidth = doc.getTextWidth(title);
      const xPosition = (doc.internal.pageSize.getWidth() - titleWidth) / 2; // Center the title
      doc.text(title, xPosition, verticalPosition);
      verticalPosition += 30; // Move down for the next line

      // Reset text color to black for the rest of the document
      doc.setTextColor(0, 0, 0);

      doc.setFontSize(12);
      doc.text(`Admin ID: ${reportData.admin.id}`, topMargin, verticalPosition);
      verticalPosition += 20;
      doc.text(`Admin Name: ${reportData.admin.name}`, topMargin, verticalPosition);
      verticalPosition += 20;
      doc.text(`Barangay ID: ${reportData.admin.barangayId}`, topMargin, verticalPosition);
      verticalPosition += 20;
      doc.text(`Barangay Name: ${reportData.admin.barangay.name}`, topMargin, verticalPosition);
      verticalPosition += 30; // Add space after the header

      // Add totals
      doc.setFontSize(14);
      doc.text("Totals:", topMargin, verticalPosition);
      verticalPosition += 20; // Move down for the next line
      doc.setFontSize(12);
      doc.text(`Total Recipient Requests: ${reportData.totals.totalRecipientRequests}`, topMargin, verticalPosition);
      verticalPosition += 15;
      doc.text(`Total Barangay Requests: ${reportData.totals.totalBarangayRequests}`, topMargin, verticalPosition);
      verticalPosition += 15;
      doc.text(`Total Donations: ${reportData.totals.totalDonations}`, topMargin, verticalPosition);
      verticalPosition += 15;
      doc.text(`Total Calamity Impacts: ${reportData.totals.totalCalamityImpacts}`, topMargin, verticalPosition);
      verticalPosition += 15;
      doc.text(`Total Success Stories: ${reportData.totals.totalSuccessStories}`, topMargin, verticalPosition);
      verticalPosition += 30; // Add space after totals

      // Function to add a new page if needed
      const addPageIfNeeded = () => {
        if (verticalPosition > 936 - bottomMargin) { // Adjust for bottom margin
          doc.addPage();
          verticalPosition = topMargin; // Reset position for new page
        }
      };

      // Add sections for each category
      doc.setFontSize(16);
      doc.text("Recipient Request Posts", topMargin, verticalPosition);
      verticalPosition += 20; // Increase position for the next line
      reportData.recipientRequests.forEach((post, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. Name: ${post.completeName}`, topMargin, verticalPosition);
        doc.text(`   Age: ${post.age}`, topMargin, verticalPosition + 15);
        doc.text(`   Area: ${post.area}`, topMargin, verticalPosition + 30);
        doc.text(`   Contact Number: ${post.contactNumber}`, topMargin, verticalPosition + 45);
        doc.text(`   Date: ${new Date(post.dateTime).toLocaleString()}`, topMargin, verticalPosition + 60);
        verticalPosition += 80; // Increase position for the next line
        addPageIfNeeded(); // Check for page break
      });

      // Add space before the next section
      verticalPosition += 20;

      // Add Barangay Request Posts
      doc.setFontSize(16);
      doc.text("Barangay Request Posts", topMargin, verticalPosition);
      verticalPosition += 20; // Increase position for the next line
      reportData.barangayRequests.forEach((post, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. Area: ${post.area}`, topMargin, verticalPosition);
        doc.text(`   Person: ${post.person}`, topMargin, verticalPosition + 15);
        doc.text(`   Type of Calamity: ${post.typeOfCalamity}`, topMargin, verticalPosition + 30);
        doc.text(`   Contact Number: ${post.contactNumber}`, topMargin, verticalPosition + 45);
        doc.text(`   Date: ${new Date(post.dateTime).toLocaleString()}`, topMargin, verticalPosition + 60);
        verticalPosition += 80; // Increase position for the next line
        addPageIfNeeded(); // Check for page break
      });

      // Add space before the next section
      verticalPosition += 20;

      // Add Donations
      doc.setFontSize(16);
      doc.text("Donations", topMargin, verticalPosition);
      verticalPosition += 20; // Increase position for the next line
      reportData.donations.forEach((donation, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. Control Number: ${donation.controlNumber}`, topMargin, verticalPosition);
        doc.text(`   Donor ID: ${donation.donorId}`, topMargin, verticalPosition + 15);
        doc.text(`   Barangay ID: ${donation.barangayId}`, topMargin, verticalPosition + 30);
        doc.text(`   Status: ${donation.donationStatus}`, topMargin, verticalPosition + 45);
        doc.text(`   Date: ${new Date(donation.createdAt).toLocaleString()}`, topMargin, verticalPosition + 60);
        verticalPosition += 80; // Increase position for the next line
        addPageIfNeeded(); // Check for page break

        // Add Donation Items
        doc.setFontSize(14);
        doc.text("Donation Items:", topMargin, verticalPosition);
        verticalPosition += 20; // Increase position for the next line
        donation.donationItems.forEach((item, itemIndex) => {
          doc.setFontSize(12);
          doc.text(`   ${itemIndex + 1}. Item Name: ${item.itemName}`, topMargin, verticalPosition);
          doc.text(`      Quantity: ${item.quantity}`, topMargin, verticalPosition + 15);
          verticalPosition += 30; // Increase position for the next line
          addPageIfNeeded(); // Check for page break
        });

        // Add space before the next section
        verticalPosition += 20;
      });

      // Add space before the next section
      verticalPosition += 20;

      // Add Calamity Impacts
      doc.setFontSize(16);
      doc.text("Calamity Impacts", topMargin, verticalPosition);
      verticalPosition += 20; // Increase position for the next line
      reportData.calamityImpacts.forEach((impact, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. Name of Calamity: ${impact.nameOfCalamity}`, topMargin, verticalPosition);
        doc.text(`   Area: ${impact.area}`, topMargin, verticalPosition + 15);
        doc.text(`   Date: ${new Date(impact.createdAt).toLocaleString()}`, topMargin, verticalPosition + 30);
        verticalPosition += 80; // Increase position for the next line
        addPageIfNeeded(); // Check for page break
      });

      // Add space before the next section
      verticalPosition += 20;

      // Add Success Stories
      doc.setFontSize(16);
      doc.text("Success Stories", topMargin, verticalPosition);
      verticalPosition += 20; // Increase position for the next line
      reportData.successStories.forEach((story, index) => {
        doc.setFontSize(12);
        doc.text(`${index + 1}. Name of Calamity: ${story.nameOfCalamity}`, topMargin, verticalPosition);
        doc.text(`   Story Text: ${story.storyText}`, topMargin, verticalPosition + 15);
        doc.text(`   Date: ${new Date(story.createdAt).toLocaleString()}`, topMargin, verticalPosition + 30);
        verticalPosition += 80; // Increase position for the next line
        addPageIfNeeded(); // Check for page break
      });

      // Save the PDF
      doc.save("barangay_report.pdf");
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    }
  };

  return (
    <nav className="w-72 h-screen bg-gradient-to-b from-green-600 via-green-500 to-green-400 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-10"></div>
      <Link href="/" className="block relative z-10">
        <h1 className="text-3xl font-bold text-white p-6 mb-6 hover:text-green-100 transition-colors duration-300">
          HIRAYALINK
        </h1>
      </Link>
      <ul className="flex-grow relative z-10">
        {menuItems.map((item) => (
          <li key={item.label} className="relative group">
            {item.isButton ? (
              <button
                onClick={handleReportGeneration}
                className={`block text-white py-3 px-6 transition-all duration-300 ease-in-out flex items-center justify-between`}
              >
                <span>{item.label}</span>
                <FontAwesomeIcon icon={faPrint} className="ml-2" />
              </button>
            ) : (
              <Link href={item.href}>
                <span className={`block text-white py-3 px-6 transition-all duration-300 ease-in-out
                                  ${pathname === item.href ? "font-bold" : "font-normal"}
                                  group-hover:bg-white group-hover:bg-opacity-10`}>
                  {item.label}
                </span>
              </Link>
            )}
            {pathname === item.href && (
              <span className="absolute left-0 top-0 w-1 h-full bg-white"></span>
            )}
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out origin-left group-hover:scale-x-100"></span>
          </li>
        ))}
      </ul>
      <style jsx>{`
        .group:hover {
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </nav>
  );
}
