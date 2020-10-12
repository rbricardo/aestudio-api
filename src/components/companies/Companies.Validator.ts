import { celebrate, Joi, Segments } from 'celebrate'
import { Service } from 'typedi'
import { RequestHandler } from 'express'

@Service()
export default class CategoriesValidator {
  public list(): RequestHandler {
    return celebrate({
      [Segments.PARAMS]: {
        page: Joi.number(),
      },
    })
  }
}
