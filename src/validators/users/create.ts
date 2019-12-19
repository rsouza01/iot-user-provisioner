import { Request } from 'express';
import Ajv from 'ajv';

import profileSchema from '../../schema/users/profile.json';
import createUserSchema from '../../schema/users/create.json';
import ValidationError from '../validator-error';
import generateValidationErrorMessage from '../errors/messages';

function validate(req: Request) {
  const ajvValidate = new Ajv()
    .addFormat('email', /^[\w.+]+@\w+\.\w+$/)
    .addSchema([profileSchema, createUserSchema])
    .compile(createUserSchema);

  const valid = ajvValidate(req.body);

  if (!valid) {
    return new ValidationError(
      generateValidationErrorMessage(ajvValidate.errors),
    );
  }
  return true;
}
export default validate;
