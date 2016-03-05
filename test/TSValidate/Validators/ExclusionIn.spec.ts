/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.ExclusionIn", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should pass if the value isn't in the domain", () => {

        validation.add(
            'status',
            new TSValidate.Validators.ExclusionIn()
                .message('The status must not be A or B')
                .domain(['A', 'B'])
        );

        var messages = validation.validate({
            status: "C"
        });

        expect(messages.count()).toBe(0);
    });

    it("should fail if the value is in the domain", () => {

        validation.add(
            'status',
            new TSValidate.Validators.ExclusionIn()
                .message('The status must not be A or B')
                .domain(['A', 'B'])
        );

        var messages = validation.validate({
            status: "A"
        });

        expect(messages.count()).toBe(1);
    });

    it("should pass if the value isn't in data", () => {

        validation.add(
            'status',
            new TSValidate.Validators.ExclusionIn()
                .message('The status must not be A or B')
                .domain(['A', 'B'])
        );

        var messages = validation.validate({
        });

        expect(messages.count()).toBe(0);
    });
});