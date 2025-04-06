import { addForm } from 'controllers/form/addForm.controller'
import { getForm } from 'controllers/form/getForm.controller'
import { Router } from 'express'
import { checkDuplicateProblem } from 'middleware/checkDuplicateProblem.middleware'

export const routeFormPost = Router()
export const routeFormGet = Router()

routeFormPost.post('/', checkDuplicateProblem, addForm)
routeFormGet.get('/', getForm)
