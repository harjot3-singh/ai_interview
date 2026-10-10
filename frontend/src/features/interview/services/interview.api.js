import axios from "axios"
const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials: true,
})
export const generateInterviewReport = async ({jobDescription , selfDescription , resume})=>{
    const formData = new FormData()
    // frontend file
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resumeFile)

    const response = await api.post("/api/interview",formData,{
        headers:{
            "content-Type":"multipart/form-data"
        }
    })
return response.data

}
export const getInterviewReportById =async (interviewId)=>{
    const response = await ap.get(`/api/interview/report/${interviewId}`)
    return response.data
}
export const getAllInterviewReports = async (userId)=>{
    const response = await api.get("/api/interview")
    return response.data
}
