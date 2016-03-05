/// <reference path="TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validation", () => {

    beforeEach(() => {

    });

    describe("constructor()", () => {

        it("true be true", () => {

            var validation = new TSValidate.Validation;

            validation.add(
                'name',
                new TSValidate.Validators.PresenceOf()
                    .message('The name is required')
            );

            validation.add(
                'email',
                new TSValidate.Validators.PresenceOf()
                    .message('The e-mail is required')
            );

            validation.add(
                'email',
                new TSValidate.Validators.Email()
                    .message('The e-mail is not valid')
            );

            validation.add(
                'terms',
                new TSValidate.Validators.Identical()
                    .accepted('yes')
                    .message('Terms and conditions must be accepted')
            );

            var messages = validation.validate({
                name: "Olivier",
                email: "olivierandriessen@gmail.com",
                terms: "yes"
            });

            if (messages.count()) {
                messages.each(message => {
                    console.log(message);
                });
            }

            expect(messages.count()).toBe(0);
        });
    });
});