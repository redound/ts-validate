/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.PresenceOf", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should fail on null value", () => {

        validation.add(
            'name',
            new TSValidate.Validators.PresenceOf()
                .message('The name is required')
        );

        var messages = validation.validate({
            name: null
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail on empty string value", () => {

        validation.add(
            'name',
            new TSValidate.Validators.PresenceOf()
                .message('The name is required')
        );

        var messages = validation.validate({
            name: ""
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail when property isn't part of data", () => {

        validation.add(
            'name',
            new TSValidate.Validators.PresenceOf()
                .message('The name is required')
        );

        var messages = validation.validate({});

        expect(messages.count()).toBe(1);
    });


    it("should pass when valid value is given", () => {

        validation.add(
            'name',
            new TSValidate.Validators.PresenceOf()
                .message('The name is required')
        );

        var messages = validation.validate({
            name: "Olivier"
        });

        expect(messages.count()).toBe(0);
    });
});