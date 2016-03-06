/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.Between", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should fail if the value exceeds the maximum value", () => {

        validation.add(
            'price',
            new TSValidate.Validators.Between()
                .minimum(0)
                .maximum(100)
                .message('The price must be between 0 and 100')
        );

        var messages = validation.validate({
            price: 120
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail if the value is below the minimum value", () => {

        validation.add(
            'price',
            new TSValidate.Validators.Between()
                .minimum(0)
                .maximum(100)
                .message('The price must be between 0 and 100')
        );

        var messages = validation.validate({
            price: -10
        });

        expect(messages.count()).toBe(1);
    });

    it("should pass if the value is with the minimum and maximum", () => {

        validation.add(
            'price',
            new TSValidate.Validators.Between()
                .minimum(0)
                .maximum(100)
                .message('The price must be between 0 and 100')
        );

        var messages = validation.validate({
            price: 50
        });

        expect(messages.count()).toBe(0);
    });

    it("should pass if the value is the same as the minimum value", () => {

        validation.add(
            'price',
            new TSValidate.Validators.Between()
                .minimum(0)
                .maximum(100)
                .message('The price must be between 0 and 100')
        );

        var messages = validation.validate({
            price: 0
        });

        expect(messages.count()).toBe(0);
    });

    it("should pass if the value is the same as the maximum value", () => {

        validation.add(
            'price',
            new TSValidate.Validators.Between()
                .minimum(0)
                .maximum(100)
                .message('The price must be between 0 and 100')
        );

        var messages = validation.validate({
            price: 100
        });

        expect(messages.count()).toBe(0);
    });
});