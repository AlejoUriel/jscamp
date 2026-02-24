import jobs from "../data/jobs.json" with { type: 'json' }
import { DEFAULTS } from "../config.js"
import { randomUUID } from "node:crypto"

export class JobModel {
  static async getAll({text, technology, location, level, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET}) {

    let filteredJobs = jobs

    if (text) {
      const searchText = text.toLowerCase()

      filteredJobs = filteredJobs.filter(job => 
        job.titulo.toLowerCase().includes(searchText) || job.descripcion.toLowerCase().includes(searchText)
      )
    }

    if (technology) {
      filteredJobs = filteredJobs.filter(job => {
        const tech = job.data?.tecnologia
        return Array.isArray(tech) ? tech.includes(technology) : tech === technology
      })
    }

    if (location) {
      filteredJobs = filteredJobs.filter(job => job.ubicacion.toLowerCase().includes(location.toLowerCase()))
    }

    if (level) {
      filteredJobs = filteredJobs.filter(job => job.data?.nivel === level)
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)
  
    return paginatedJobs
  }

  static async getId(id) {
    const job = jobs.find(job => job.id === id)

    return job
  }

  static async create({ titulo, empresa, ubicacion, descripcion, data }) {
    const newJob = {
      id: randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data
    }

    jobs.push(newJob)

    return newJob
  }

  static async update(id, { titulo, empresa, ubicacion, descripcion, data }) {
    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) {
      return null
    }

    const updatedJob = {
      id,
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data
    }

    jobs[jobIndex] = updatedJob

    return updatedJob
  }

  static async partialUpdate(id, { titulo, empresa, ubicacion, descripcion, data }) {
    
    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) {
      return null
    }

    const updatedJob = {
      ...jobs[jobIndex],
      titulo: titulo || jobs[jobIndex].titulo,
      empresa: empresa || jobs[jobIndex].empresa,
      ubicacion: ubicacion || jobs[jobIndex].ubicacion,
      descripcion: descripcion || jobs[jobIndex].descripcion,
      data: data || jobs[jobIndex].data
    }

    jobs[jobIndex] = updatedJob

    return updatedJob
  }

  static async delete(id) {
    const jobIndex = jobs.findIndex(job => job.id === id)
    
    if (jobIndex === -1) {
      return null
    }

    jobs.splice(jobIndex, 1)

    return true
  }
}
  