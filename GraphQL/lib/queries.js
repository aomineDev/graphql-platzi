'use strict'

const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  getCourses: async () => {
    let db
    let courses = []
    try {
      db = await connectDB()
      courses = await db.collection(`courses`).find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return courses
  },
  getCourse: async (root, { id }) => {
    let db
    let course
    try {
      db = await connectDB()
      course = await db.collection(`courses`).findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  getPeople: async () => {
    let db
    let students = []
    try {
      db = await connectDB()
      students = await db.collection(`students`).find().toArray()
    } catch (error) {
      errorHandler(error)
    }

    return students
  },
  getPerson: async (root, { id }) => {
    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection(`students`).findOne({ _id: ObjectID(id) })
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  searchData: async (root, { keyword }) => {
    let db
    let data
    let courses
    let people

    try {
      db = await connectDB()
      courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray()
      people = await db.collection('students').find({ $text: { $search: keyword } }).toArray()
      data = [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }
    return data
  }
}