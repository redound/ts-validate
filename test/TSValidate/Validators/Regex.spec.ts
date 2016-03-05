/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.Regex", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should pass if the value is valid", () => {

        validation.add(
            'created_at',
            new TSValidate.Validators.Regex()
                .pattern(/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/)
                .message('The creation date is invalid')
        );

        var messages = validation.validate({
            created_at: "2016/03/05"
        });

        expect(messages.count()).toBe(0);
    });

    it("should fail if the value is invalid", () => {

        validation.add(
            'created_at',
            new TSValidate.Validators.Regex()
                .pattern(/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/)
                .message('The creation date is invalid')
        );

        var messages = validation.validate({
            created_at: "20160305"
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail if the value is empty", () => {

        validation.add(
            'created_at',
            new TSValidate.Validators.Regex()
                .pattern(/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/)
                .message('The creation date is invalid')
        );

        var messages = validation.validate({
        });

        expect(messages.count()).toBe(1);
    });

    it("should pass if the value is empty but empty is allowed", () => {

        validation.add(
            'created_at',
            new TSValidate.Validators.Regex()
                .pattern(/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/)
                .message('The creation date is invalid')
                .allowEmpty()
        );

        var messages = validation.validate({
        });

        expect(messages.count()).toBe(0);
    });

});