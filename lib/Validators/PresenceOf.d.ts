import Validator from "../Validator";
import Validation from "../Validation";
export default class PresenceOf extends Validator {
    validate(validation: Validation, field: string): boolean;
}
