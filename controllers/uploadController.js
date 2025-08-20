import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { summarizeCvWithGemini } from '../services/geminiService.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const standardFontDataUrl = path.join(__dirname, '../../node_modules/pdfjs-dist/standard_fonts/');


export const getUploadPage = (req, res) => {
    
    res.render('upload', { 
        title: 'Upload CV for Summary',
        success: req.query.success || null,
        error: req.query.error || null,
    });
};


const extractTextFromPdf = async (filePath) => {
    const data = new Uint8Array(fs.readFileSync(filePath));
    
    const pdf = await pdfjsLib.getDocument({ data, standardFontDataUrl }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
    }
    return text;
};


export const handleUploadAndSummarize = async (req, res) => {
    try {
        if (!req.file) {
            return res.redirect('/upload?error=No file selected!');
        }

        const filePath = req.file.path;
        let rawText = '';

        
        if (req.file.mimetype === 'application/pdf') {
            rawText = await extractTextFromPdf(filePath);
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ path: filePath });
            rawText = result.value;
        } else {
            fs.unlinkSync(filePath);
            return res.redirect('/upload?error=Unsupported file type. Please upload a PDF or DOCX.');
        }

        fs.unlinkSync(filePath);

        if (!rawText.trim()) {
            return res.redirect('/upload?error=Could not extract any text from the document.');
        }

        
        const cvData = await summarizeCvWithGemini(rawText);

        if (!cvData.isValidCv) {
            return res.render('invalid-cv', {
                title: 'Invalid Document',
            });
        }

        res.render('summary', {
            title: 'CV Summary',
            summary: cvData.summary || 'No summary available.',
            experience: cvData.experience || [],
            projects: cvData.projects || [],
            education: cvData.education || [],
            techStack: cvData.techStack || [],
        });

    } catch (error) {
        console.error("Error during CV processing:", error);
        res.status(500).render('error', {
            title: 'Error',
            message: 'An unexpected error occurred while processing your CV.',
            error: error.message,
        });
    }
};
