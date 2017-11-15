const router = require('express').Router()
const Git = require('nodegit')

module.exports = router

router.get('/', (req, res, next) => {
  Git.Clone("https://github.com/echjordan/gitgui", "./tmp")
    .then((repo) => {
      console.log('THIS IS THE REPO', repo)
      res.sendStatus(200)

    })
    .catch(next)
})
