import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { Resume } from '../types/resume';

export async function exportAsPDF(resumeElement: HTMLElement) {
  try {
    const canvas = await html2canvas(resumeElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4',
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw error;
  }
}

export async function exportAsDocx(resume: Resume) {
  try {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: resume.personalInfo.fullName,
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: '\n' })],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Professional Summary',
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            children: [new TextRun({ text: resume.summary })],
          }),
          // Add experience, education, and skills sections similarly
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'resume.docx');
  } catch (error) {
    console.error('Error exporting DOCX:', error);
    throw error;
  }
}

export function exportAsTxt(resume: Resume) {
  try {
    const content = `
${resume.personalInfo.fullName}
${resume.personalInfo.email} | ${resume.personalInfo.phone} | ${resume.personalInfo.location}

PROFESSIONAL SUMMARY
${resume.summary}

EXPERIENCE
${resume.experience.map(exp => `
${exp.company}
${exp.position}
${exp.startDate} - ${exp.endDate}
${exp.description}
`).join('\n')}

EDUCATION
${resume.education.map(edu => `
${edu.school}
${edu.degree}
${edu.graduationDate}
`).join('\n')}

SKILLS
${resume.skills.join(', ')}
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'resume.txt');
  } catch (error) {
    console.error('Error exporting TXT:', error);
    throw error;
  }
}