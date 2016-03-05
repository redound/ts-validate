/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.Identical", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should fail if the value in data is not identical", () => {

        validation.add(
            'terms',
            new TSValidate.Validators.Identical()
                .accepted('yes')
                .message('Terms and conditions must be accepted')
        );

        var messages = validation.validate({
            terms: "no"
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail if the value isn't part of data", () => {

        validation.add(
            'terms',
            new TSValidate.Validators.Identical()
                .accepted('yes')
                .message('Terms and conditions must be accepted')
        );

        var messages = validation.validate({
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail if the value is null", () => {

        validation.add(
            'terms',
            new TSValidate.Validators.Identical()
                .accepted('yes')
                .message('Terms and conditions must be accepted')
        );

        var messages = validation.validate({
            terms: null
        });

        expect(messages.count()).toBe(1);
    });

    it("should pass if the value is identical", () => {

        validation.add(
            'terms',
            new TSValidate.Validators.Identical()
                .accepted('yes')
                .message('Terms and conditions must be accepted')
        );

        var messages = validation.validate({
            terms: 'yes'
        });

        expect(messages.count()).toBe(0);
    });
});