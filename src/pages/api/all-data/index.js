import connectDB from "@backend/index";
import ArticlePaper from "@backend/models/articlePaperModel";
import Blog from "@backend/models/blogModel";
import Book from "@backend/models/bookModel";
import Company from "@backend/models/companyModel";
import Course from "@backend/models/courseModel";
import Event from "@backend/models/eventModel";
import Grant from "@backend/models/grantModel";
import Patents from "@backend/models/patentModel";
import Project from "@backend/models/projectModel";
import SimulationTool from "@backend/models/simulationToolModel";
import Software from "@backend/models/softwareModel";
import YoutubeContent from "@backend/models/youtubeContentModel";

export default async function handler(req, res) {
    try {
        await connectDB();
        if (req.method === 'GET') {
            const promises = [
                ArticlePaper.find({}),
                Blog.find({}),
                Book.find({}),
                Company.find({}),
                Course.find({}),
                Event.find({}),
                Grant.find({}),
                Patents.find({}),
                Project.find({}),
                SimulationTool.find({}),
                Software.find({}),
                YoutubeContent.find({})
            ];

            const [
                articlePapers,
                blogs,
                books,
                companies,
                courses,
                events,
                grants,
                patents,
                projects,
                simulationTools,
                softwares,
                youtubeContents
            ] = await Promise.all(promises);

            const data = {
                articlePapers,
                blogs,
                books,
                companies,
                courses,
                events,
                grants,
                patents,
                projects,
                simulationTools,
                softwares,
                youtubeContents
            };

            res.status(200).json(data);

        } else {
            res.status(422).json({ message: 'Method not supported' });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: e.message });
    }
}