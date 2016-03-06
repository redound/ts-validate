/// <reference path="../TSValidate.spec.ts" />

declare var describe, it, expect, jasmine, beforeEach;

describe("TSValidate.Validators.StringLength", () => {

    var validation;

    beforeEach(() => {

        validation = new TSValidate.Validation;
    });

    it("should fail if the value length exceeds the max string length", () => {

        validation.add(
            'name_last',
            new TSValidate.Validators.StringLength()
                .max(50)
                .min(2)
                .messageMaximum('We don\'t like really long names')
                .messageMinimum('We want more than just their initials')
        );

        var messages = validation.validate({
            name_last: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas architecto odio officiis blanditiis ex repellat itaque eligendi provident. Hic illum explicabo similique adipisci fugiat, ipsam dolores amet soluta cum, a."
        });

        expect(messages.count()).toBe(1);
    });

    it("should fail if the value length is beneath the min string length", () => {

        validation.add(
            'name_last',
            new TSValidate.Validators.StringLength()
                .max(50)
                .min(2)
                .messageMaximum('We don\'t like really long names')
                .messageMinimum('We want more than just their initials')
        );

        var messages = validation.validate({
            name_last: "1"
        });

        expect(messages.count()).toBe(1);
    });

    it("should pass if the value is within the min and max string length", () => {

        validation.add(
            'name_last',
            new TSValidate.Validators.StringLength()
                .max(50)
                .min(2)
                .messageMaximum('We don\'t like really long names')
                .messageMinimum('We want more than just their initials')
        );

        var messages = validation.validate({
            name_last: "Olivier"
        });

        expect(messages.count()).toBe(0);
    });

    it("should throw an exception if both min and max option have not been set", () => {

        var exception = false;

        try {

            validation.add(
                'name_last',
                new TSValidate.Validators.StringLength()
                    .messageMaximum('We don\'t like really long names')
                    .messageMinimum('We want more than just their initials')
            );

            var messages = validation.validate({
                name_last: "Olivier"
            });

        } catch (e) {
            exception = true;
        }
        expect(exception).toBe(true);
    });
});