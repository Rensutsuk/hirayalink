import { jsPDF } from "jspdf";

export const generateReport = async (reportData: any) => {
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
  doc.text(
    `Barangay ID: ${reportData.admin.barangayId}`,
    topMargin,
    verticalPosition
  );
  verticalPosition += 20;
  doc.text(
    `Barangay Name: ${reportData.admin.barangay.name}`,
    topMargin,
    verticalPosition
  );
  verticalPosition += 30; // Add space after the header

  // Add totals
  doc.setFontSize(14);
  doc.text("Totals:", topMargin, verticalPosition);
  verticalPosition += 20; // Move down for the next line
  doc.setFontSize(12);
  doc.text(
    `Total Recipient Requests: ${reportData.totals.totalRecipientRequests}`,
    topMargin,
    verticalPosition
  );
  verticalPosition += 15;
  doc.text(
    `Total Barangay Requests: ${reportData.totals.totalBarangayRequests}`,
    topMargin,
    verticalPosition
  );
  verticalPosition += 15;
  doc.text(
    `Total Donations: ${reportData.totals.totalDonations}`,
    topMargin,
    verticalPosition
  );
  verticalPosition += 15;
  doc.text(
    `Total Calamity Impacts: ${reportData.totals.totalCalamityImpacts}`,
    topMargin,
    verticalPosition
  );
  verticalPosition += 15;
  doc.text(
    `Total Success Stories: ${reportData.totals.totalSuccessStories}`,
    topMargin,
    verticalPosition
  );
  verticalPosition += 30; // Add space after totals

  // Function to add a new page if needed
  const addPageIfNeeded = () => {
    if (verticalPosition > 936 - bottomMargin) {
      // Adjust for bottom margin
      doc.addPage();
      verticalPosition = topMargin; // Reset position for new page
    }
  };

  // Add sections for each category
  doc.setFontSize(16);
  doc.text("Recipient Request Posts", topMargin, verticalPosition);
  verticalPosition += 20; // Increase position for the next line
  reportData.recipientRequests.forEach((post: any, index: number) => {
    doc.setFontSize(12);
    doc.text(
      `${index + 1}. Name: ${post.completeName}`,
      topMargin,
      verticalPosition
    );
    doc.text(`   Age: ${post.age}`, topMargin, verticalPosition + 15);
    doc.text(`   Area: ${post.area}`, topMargin, verticalPosition + 30);
    doc.text(
      `   Contact Number: ${post.contactNumber}`,
      topMargin,
      verticalPosition + 45
    );
    doc.text(
      `   Date: ${new Date(post.dateTime).toLocaleString()}`,
      topMargin,
      verticalPosition + 60
    );
    verticalPosition += 80; // Increase position for the next line
    addPageIfNeeded(); // Check for page break
  });

  // Add space before the next section
  verticalPosition += 20;

  // Add Barangay Request Posts
  doc.setFontSize(16);
  doc.text("Barangay Request Posts", topMargin, verticalPosition);
  verticalPosition += 20; // Increase position for the next line
  reportData.barangayRequests.forEach((post: any, index: number) => {
    doc.setFontSize(12);
    doc.text(`${index + 1}. Area: ${post.area}`, topMargin, verticalPosition);
    doc.text(`   Person: ${post.person}`, topMargin, verticalPosition + 15);
    doc.text(
      `   Type of Calamity: ${post.typeOfCalamity}`,
      topMargin,
      verticalPosition + 30
    );
    doc.text(
      `   Contact Number: ${post.contactNumber}`,
      topMargin,
      verticalPosition + 45
    );
    doc.text(
      `   Date: ${new Date(post.dateTime).toLocaleString()}`,
      topMargin,
      verticalPosition + 60
    );
    verticalPosition += 80; // Increase position for the next line
    addPageIfNeeded(); // Check for page break
  });

  // Add space before the next section
  verticalPosition += 20;

  // Add Donations
  doc.setFontSize(16);
  doc.text("Donations", topMargin, verticalPosition);
  verticalPosition += 20; // Increase position for the next line
  reportData.donations.forEach((donation: any, index: number) => {
    doc.setFontSize(12);
    doc.text(
      `${index + 1}. Control Number: ${donation.controlNumber}`,
      topMargin,
      verticalPosition
    );
    doc.text(
      `   Donor ID: ${donation.donorId}`,
      topMargin,
      verticalPosition + 15
    );
    doc.text(
      `   Barangay ID: ${donation.barangayId}`,
      topMargin,
      verticalPosition + 30
    );
    doc.text(
      `   Status: ${donation.donationStatus}`,
      topMargin,
      verticalPosition + 45
    );
    doc.text(
      `   Date: ${new Date(donation.createdAt).toLocaleString()}`,
      topMargin,
      verticalPosition + 60
    );
    verticalPosition += 80; // Increase position for the next line
    addPageIfNeeded(); // Check for page break

    // Add Donation Items
    doc.setFontSize(14);
    doc.text("Donation Items:", topMargin, verticalPosition);
    verticalPosition += 20; // Increase position for the next line
    donation.donationItems.forEach((item: any, itemIndex: number) => {
      doc.setFontSize(12);
      doc.text(
        `   ${itemIndex + 1}. Item Name: ${item.itemName}`,
        topMargin,
        verticalPosition
      );
      doc.text(
        `      Quantity: ${item.quantity}`,
        topMargin,
        verticalPosition + 15
      );
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
  reportData.calamityImpacts.forEach((impact: any, index: number) => {
    doc.setFontSize(12);
    doc.text(
      `${index + 1}. Name of Calamity: ${impact.nameOfCalamity}`,
      topMargin,
      verticalPosition
    );
    doc.text(`   Area: ${impact.area}`, topMargin, verticalPosition + 15);
    doc.text(
      `   Date: ${new Date(impact.createdAt).toLocaleString()}`,
      topMargin,
      verticalPosition + 30
    );
    verticalPosition += 80; // Increase position for the next line
    addPageIfNeeded(); // Check for page break
  });

  // Add space before the next section
  verticalPosition += 20;

  // Add Success Stories
  doc.setFontSize(16);
  doc.text("Success Stories", topMargin, verticalPosition);
  verticalPosition += 20; // Increase position for the next line
  reportData.successStories.forEach((story: any, index: number) => {
    doc.setFontSize(12);
    doc.text(
      `${index + 1}. Name of Calamity: ${story.nameOfCalamity}`,
      topMargin,
      verticalPosition
    );
    doc.text(
      `   Story Text: ${story.storyText}`,
      topMargin,
      verticalPosition + 15
    );
    doc.text(
      `   Date: ${new Date(story.createdAt).toLocaleString()}`,
      topMargin,
      verticalPosition + 30
    );
    verticalPosition += 80; // Increase position for the next line
    addPageIfNeeded(); // Check for page break
  });

  // Save the PDF
  doc.save("barangay_report.pdf");
};
