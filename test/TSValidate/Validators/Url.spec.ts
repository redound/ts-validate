/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.Url", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should fail if an invalid url has been given", () => {

        validation.add(
            'url',
            new TSValidate.Validators.Url()
                .message(':field must be a url')
        );

        var messages = validation.validate({
            url: "test"
        });

        expect(messages.count()).toBe(1);
    });

    it("should pass if an valid url has been given", () => {

        validation.add(
            'url',
            new TSValidate.Validators.Url()
                .message(':field must be a url')
        );

        var messages = validation.validate({
            url: "http://github.com"
        });

        expect(messages.count()).toBe(0);
    });

    it("should pass if no url has been given but allowEmpty is set to true", () => {

        validation.add(
            'url',
            new TSValidate.Validators.Url()
                .message(':field must be a url')
                .allowEmpty()
        );

        var messages = validation.validate({
        });

        expect(messages.count()).toBe(0);
    });
});