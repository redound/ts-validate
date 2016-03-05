/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.Email", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should fail if an invalid e-mail has been given", () => {

        validation.add(
            'email',
            new TSValidate.Validators.Email()
                .message('The e-mail is not valid')
        );

        var messages = validation.validate({
            email: "test.com"
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail on empty value", () => {

        validation.add(
            'email',
            new TSValidate.Validators.Email()
                .message('The e-mail is not valid')
        );

        var messages = validation.validate({
            email: ""
        });

        expect(messages.count()).toBe(1);
    });

    it("should not fail on empty value when allowEmpty is true", () => {

        validation.add(
            'email',
            new TSValidate.Validators.Email()
                .message('The e-mail is not valid')
                .allowEmpty()
        );

        var messages = validation.validate({
            email: ""
        });

        expect(messages.count()).toBe(0);
    });

    it("should pass on valid given e-mail", () => {

        validation.add(
            'email',
            new TSValidate.Validators.Email()
                .message('The e-mail is not valid')
        );

        var messages = validation.validate({
            email: "olivierandriessen@gmail.com"
        });

        expect(messages.count()).toBe(0);
    });
});