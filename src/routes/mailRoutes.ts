import express from 'express'
import { serndEmailServiceCandidate, serndEmailServiceOffice } from '../controllers/sendeEmail';


const mailRoutes = express.Router();

mailRoutes.post('/sent/office', serndEmailServiceOffice)
mailRoutes.post('/sent/candidate', serndEmailServiceCandidate)

export default mailRoutes;