const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer")
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z
        .number()
        .describe("how much the resume matches with job from 0 to 100"),

    technicalQuestions: z
        .array(
            z.object({
                question: z.string(),
                intention: z.string(),
                answer: z.string(),
            })
        ),

    behaviouralQuestions: z
        .array(
            z.object({
                question: z.string(),
                intention: z.string(),
                answer: z.string(),
            })
        ),

    skillGaps: z.array(
        z.object({
            skill: z.string(),
            severity: z.enum(["low", "med", "high"]),
        })
    ),

    preparationPlan: z.array(
        z.object({
            day: z.number(),
            focus: z.string(),
            tasks: z.array(z.string()),
        })
    ),
    title:z.string().describe("The title of the job")
});

async function generateInterviewReport({
    resume,
    selfDescription,
    jobDescription,
}) {
    const prompt = `
    Generate an interview Report for a Candidate with the following details:

    Resume: ${resume}

    Self-Description: ${selfDescription}

    Job-Description: ${jobDescription}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(interviewReportSchema),
        },
    });
    

    return JSON.parse(response.text());
}
async function generateResumePdf({resume,selfDescription,jobDescription}){
    const resumePdfSchema = z.object({
        html: z.string().describe("the html content of the resume which can be converted to pdf using a browser")
    })
    const prompt = `Generate a resume for a candidate with the following details :
    Resume:${resume}
    Self Description:${selfDescription}
    Job Description :${jobDescription}
    response should be a json with a single field "html"`
    const response = await ai.models.generateContent({
    model:"gemini-2.5-flash",
    contents: prompt,
    config:{
        responseMimeType:"application/json",
        responseSchema: zodToJsonSchema(resumePdfSchema),
    }

})
const jsonContent = JSON.parse(response.text())
return generatePdfFromHtml(jsonContent.html)

}
async function generatePdfFromHtml(htmlContent){
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent,{waitUntil:"networkidle0"})
    const pdfBuffer = await page.pdf({format:"A4"})
    await browser.close()
    return pdfBuffer
}


module.exports = { generateInterviewReport, generateResumePdf };