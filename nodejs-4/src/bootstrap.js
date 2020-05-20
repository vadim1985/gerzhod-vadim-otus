const userRepo = require('./service/user')
const courseRepo = require('./service/courses')

userRepo.create({
  name: "kobe",
  password: "123"
})

userRepo.create({
  name: "john",
  password: "321"
})

userRepo.create({
  name: "michael",
  password: "111"
})

const courseCreate = async () => {
  const course = await courseRepo.createCourse({
    name: "Learn Ruby on Rails Essentials",
    description: "description_3",
    userAccess: []
  })
  await courseRepo.addLesson(course._id, {name: 'Ruby_on_Rails_test_1', comment: []})
  await courseRepo.addLesson(course._id, {name: 'Ruby_on_Rails_test_2', comment: []})
  await courseRepo.addLesson(course._id, {name: 'Ruby_on_Rails_test_3', comment: []})
  await courseRepo.addLesson(course._id, {name: 'Ruby_on_Rails_test_4', comment: []})
}

courseCreate()
