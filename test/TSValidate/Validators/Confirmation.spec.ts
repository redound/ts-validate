/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.Confirmation", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should pass if the value and the value tested against are the same", () => {

        validation.add(
            'password',
            new TSValidate.Validators.Confirmation()
                .against('confirmPassword')
                .message('Password doesn\'t match confirmation')
        );

        var messages = validation.validate({
            password: "supersecret",
            confirmPassword: "supersecret"
        });

        expect(messages.count()).toBe(0);
    });

    it("should fail if the value and the value tested against are not the same", () => {

        validation.add(
            'password',
            new TSValidate.Validators.Confirmation()
                .against('confirmPassword')
                .message('Password doesn\'t match confirmation')
        );

        var messages = validation.validate({
            password: "supersecret",
            confirmPassword: "sup3rs3cr3t"
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail if the value and the value tested against are not the same because of strict case checking", () => {

        validation.add(
            'password',
            new TSValidate.Validators.Confirmation()
                .against('confirmPassword')
                .message('Password doesn\'t match confirmation')
        );

        var messages = validation.validate({
            password: "supersecret",
            confirmPassword: "SupersEcret"
        });

        expect(messages.count()).toBe(1);
    });

    it("should pass if the value and the value tested against are the same when regardless if the characters are either lower or uppercase when the ignoreCase option has been set to true", () => {

        validation.add(
            'password',
            new TSValidate.Validators.Confirmation()
                .against('confirmPassword')
                .message('Password doesn\'t match confirmation')
                .ignoreCase()
        );

        var messages = validation.validate({
            password: "supersecret",
            confirmPassword: "SupersEcret"
        });

        expect(messages.count()).toBe(0);
    });
});