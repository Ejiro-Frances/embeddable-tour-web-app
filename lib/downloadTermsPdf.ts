import jsPDF from "jspdf";
import { sections } from "@/lib/terms-data";

export function downloadTermsPDF() {
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let y = 20;

  // Title
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("Tourify - Terms of Service", pageWidth / 2, y, {
    align: "center",
  });

  y += 15;
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.text("Last Updated: December 8, 2025", margin, y);
  y += 12;

  // Terms Content
  sections.forEach((section) => {
    if (y > pageHeight - 30) {
      pdf.addPage();
      y = 20;
    }

    // Section title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);
    pdf.text(section.title, margin, y);
    y += 7;

    // Section body
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    const lines = pdf.splitTextToSize(
      section.content,
      pageWidth - margin * 2
    );

    lines.forEach((line: string) => {
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(line, margin, y);
      y += 6;
    });

    y += 8;
  });

  // Footer
  const pageCount = pdf.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.text(
      `Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  pdf.save("Tourify-Terms.pdf");
}
