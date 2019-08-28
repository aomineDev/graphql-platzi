'use strict'

const connectDb = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: 'Teacher',
      topic: 'programación'
    }
    const newCourse = Object.assign(defaults, input)
    let db
    let course
    try {
      db = await connectDb()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse
  },
  editCourse: async (root, { _id,  input }) => {
    let db
    let course
    try {
      db = await connectDb()
      await db.collection('courses').updateOne({ _id: ObjectID(_id) }, { $set: input })
      course = await db.collection('courses').findOne({ _id: ObjectID(_id ) })
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  removeCourse: async (root, { _id }) => {
    let db
    let status
    let msg
    try {
      db = await connectDb()
      status = await db.collection('courses').deleteOne({_id: ObjectID(_id)})
      msg = status.deletedCount ? 'Curso eliminado con exito' : `El curso con id ${_id} no existe en la base de datos`
    } catch (error) {
      errorHandler(error)
    }

    return msg
  },
  registerStudent: async (root, { input }) => {
    let db
    let student
    try {
      db = await connectDb()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },
  editStudent: async (root, { _id,  input }) => {
    let db
    let student
    try {
      db = await connectDb()
      await db.collection('students').updateOne({ _id: ObjectID(_id) }, { $set: input })
      student = await db.collection('students').findOne({ _id: ObjectID(_id ) })
    } catch (error) {
      errorHandler(error)
    }

    return student
  },
  removeStudent: async (root, { _id }) => {
    let db
    let status
    let msg
    try {
      db = await connectDb()
      status = await db.collection('students').deleteOne({_id: ObjectID(_id)})
      msg = status.deletedCount ? 'Estudiante eliminado con exito' : `El estudiante con id ${_id} no existe en la base de datos`
    } catch (error) {
      errorHandler(error)
    }

    return msg
  },
  addPeople: async (root, { courseID, personID }) => {
    let db
    let course
    let person

    try {
      db = await connectDb()
      course = await db.collection('courses').findOne({ _id: ObjectID(courseID) })
      person = await db.collection(`students`).findOne({ _id: ObjectID(personID) })
      if(!course || !person) throw new Error('La persona o el curso no existe')
      await db.collection('courses').updateOne(
        { _id: ObjectID(courseID) },
        { $addToSet: { people: ObjectID(personID) } }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course
  }
}