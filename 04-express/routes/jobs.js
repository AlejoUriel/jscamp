import { Router } from "express"
import { JobController } from "../controllers/jobs.js"
import { validatePartialJob } from "../schemas/jobs.js"

export const jobsRouter = Router()

function validateCreate (req, res, next) {
  const result = validateJob(req.body)
  
  if (!result.success) {
    return res.status(400).json({ errors: 'Invalid request', details: result.error.errors })
  }
  return next()
}

function validateUpdate (req, res, next) {
  const result = validatePartialJob(req.body)

  if (!result.success) {
    return res.status(400).json({ errors: 'Invalid request', details: result.error.errors })
  }

  return next()
}

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getId)

jobsRouter.post('/', validateCreate, JobController.create)
jobsRouter.patch('/:id', validateUpdate, JobController.partialUpdate)

jobsRouter.put('/:id', JobController.update)
jobsRouter.delete('/:id', JobController.delete)