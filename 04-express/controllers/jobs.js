import { JobModel } from "../models/job.js"
import { DEFAULTS } from "../config.js"

export class JobController {
  static async getAll(req, res, next) {
    try {
      const { text, technology, location, level, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = req.query

      const paginatedJobs = await JobModel.getAll({ text, technology, location, level, limit, offset })

      return res.json({ total: paginatedJobs.length, limit, offset, data: paginatedJobs })
    } catch (error) {
      return next(error)
    }
  }

  static async getId(req, res, next) {
    try {
      const { id } = req.params

      const job = await JobModel.getId(id)

      if (!job) {
        return res.status(404).json({ error: 'Job not found' })
      }

      return res.json(job)
    } catch (error) {
      return next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const { titulo, empresa, ubicacion, descripcion, data } = req.body

      const newJob = await JobModel.create({ titulo, empresa, ubicacion, descripcion, data })

      return res.status(201).json(newJob)
    } catch (error) {
      return next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params
      const { titulo, empresa, ubicacion, descripcion, data } = req.body

      const updatedJob = await JobModel.update(id, { titulo, empresa, ubicacion, descripcion, data })

      if (!updatedJob) {
        return res.status(404).json({ error: 'Job not found' })
      }

      return res.json(updatedJob)
    } catch (error) {
      return next(error)
    }
  }

  static async partialUpdate(req, res, next) {
    try {
      const { id } = req.params
      const { titulo, empresa, ubicacion, descripcion, data } = req.body

      const updatedJob = await JobModel.partialUpdate(id, { titulo, empresa, ubicacion, descripcion, data })

      if (!updatedJob) {
        return res.status(404).json({ error: 'Job not found' })
      }

      return res.status(200).json(updatedJob)
    } catch (error) {
      return next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { id } = req.params

      const deletedJob = await JobModel.delete(id)

      if (!deletedJob) {
        return res.status(404).json({ error: 'Job not found' })
      }

      return res.status(204).end()
    } catch (error) {
      return next(error)
    }
  }
}