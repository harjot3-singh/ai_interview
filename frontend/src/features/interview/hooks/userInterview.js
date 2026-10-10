import{generateInterviewReport,getInterviewReportById,getAllInterviewReports} from"../services/interview.api"
import{usecontext} from "react"
import {InterviewContext} from "../interview.context"
import { get } from "mongoose"
export const useInterview = ()=>{
    const context = useContext(InterviewContext)
    if(!context)
        throw new Error ("useInterview must")
    const {loading,setLoading, report, setReport, reports,setReports}= context

    const generateReport = async({jobDescription, selfDesciption, resumeFile})=>{
        setLoading(true)
        try{
            const response = await generateInterviewReport({jobDescription, selfDescription,resume})
                setReport(response.interviewReport)

            }
        
        catch(err)
        {
            console.log(err)

        }

    }
    const getInterviewReportById= async (interviewId)=>{
        setLoading(true)
        try{
            const response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }
    const getReports = async()=>{
        try{
            const response = await getAllInterviewReports()
            return response.interviewReports
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }



    return {Loading, report, reports, generateReport,getReportById,getReports}

}