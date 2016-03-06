describe("TSValidate.Validation", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            var validation = new TSValidate.Validation;
            validation.add('name', new TSValidate.Validators.PresenceOf()
                .message('The name is required'));
            validation.add('email', new TSValidate.Validators.PresenceOf()
                .message('The e-mail is required'));
            validation.add('email', new TSValidate.Validators.Email()
                .message('The e-mail is not valid'));
            validation.add('terms', new TSValidate.Validators.Identical()
                .accepted('yes')
                .message('Terms and conditions must be accepted'));
            var messages = validation.validate({
                name: "Olivier",
                email: "olivierandriessen@gmail.com",
                terms: "yes"
            });
            if (messages.count()) {
                messages.each(function (message) {
                    console.log(message);
                });
            }
            expect(messages.count()).toBe(0);
        });
    });
});
describe("TSValidate.Validators.Between", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should fail if the value exceeds the maximum value", function () {
        validation.add('price', new TSValidate.Validators.Between()
            .minimum(0)
            .maximum(100)
            .message('The price must be between 0 and 100'));
        var messages = validation.validate({
            price: 120
        });
        expect(messages.count()).toBe(1);
    });
    it("should fail if the value is below the minimum value", function () {
        validation.add('price', new TSValidate.Validators.Between()
            .minimum(0)
            .maximum(100)
            .message('The price must be between 0 and 100'));
        var messages = validation.validate({
            price: -10
        });
        expect(messages.count()).toBe(1);
    });
    it("should pass if the value is with the minimum and maximum", function () {
        validation.add('price', new TSValidate.Validators.Between()
            .minimum(0)
            .maximum(100)
            .message('The price must be between 0 and 100'));
        var messages = validation.validate({
            price: 50
        });
        expect(messages.count()).toBe(0);
    });
    it("should pass if the value is the same as the minimum value", function () {
        validation.add('price', new TSValidate.Validators.Between()
            .minimum(0)
            .maximum(100)
            .message('The price must be between 0 and 100'));
        var messages = validation.validate({
            price: 0
        });
        expect(messages.count()).toBe(0);
    });
    it("should pass if the value is the same as the maximum value", function () {
        validation.add('price', new TSValidate.Validators.Between()
            .minimum(0)
            .maximum(100)
            .message('The price must be between 0 and 100'));
        var messages = validation.validate({
            price: 100
        });
        expect(messages.count()).toBe(0);
    });
});
describe("TSValidate.Validators.Confirmation", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should pass if the value and the value tested against are the same", function () {
        validation.add('password', new TSValidate.Validators.Confirmation()
            .against('confirmPassword')
            .message('Password doesn\'t match confirmation'));
        var messages = validation.validate({
            password: "supersecret",
            confirmPassword: "supersecret"
        });
        expect(messages.count()).toBe(0);
    });
    it("should fail if the value and the value tested against are not the same", function () {
        validation.add('password', new TSValidate.Validators.Confirmation()
            .against('confirmPassword')
            .message('Password doesn\'t match confirmation'));
        var messages = validation.validate({
            password: "supersecret",
            confirmPassword: "sup3rs3cr3t"
        });
        expect(messages.count()).toBe(1);
    });
    it("should fail if the value and the value tested against are not the same because of strict case checking", function () {
        validation.add('password', new TSValidate.Validators.Confirmation()
            .against('confirmPassword')
            .message('Password doesn\'t match confirmation'));
        var messages = validation.validate({
            password: "supersecret",
            confirmPassword: "SupersEcret"
        });
        expect(messages.count()).toBe(1);
    });
    it("should pass if the value and the value tested against are the same when regardless if the characters are either lower or uppercase when the ignoreCase option has been set to true", function () {
        validation.add('password', new TSValidate.Validators.Confirmation()
            .against('confirmPassword')
            .message('Password doesn\'t match confirmation')
            .ignoreCase());
        var messages = validation.validate({
            password: "supersecret",
            confirmPassword: "SupersEcret"
        });
        expect(messages.count()).toBe(0);
    });
});
describe("TSValidate.Validators.Email", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should fail if an invalid e-mail has been given", function () {
        validation.add('email', new TSValidate.Validators.Email()
            .message('The e-mail is not valid'));
        var messages = validation.validate({
            email: "test.com"
        });
        expect(messages.count()).toBe(1);
    });
    it("should fail on empty value", function () {
        validation.add('email', new TSValidate.Validators.Email()
            .message('The e-mail is not valid'));
        var messages = validation.validate({
            email: ""
        });
        expect(messages.count()).toBe(1);
    });
    it("should not fail on empty value when allowEmpty is true", function () {
        validation.add('email', new TSValidate.Validators.Email()
            .message('The e-mail is not valid')
            .allowEmpty());
        var messages = validation.validate({
            email: ""
        });
        expect(messages.count()).toBe(0);
    });
    it("should pass on valid given e-mail", function () {
        validation.add('email', new TSValidate.Validators.Email()
            .message('The e-mail is not valid'));
        var messages = validation.validate({
            email: "olivierandriessen@gmail.com"
        });
        expect(messages.count()).toBe(0);
    });
});
describe("TSValidate.Validators.ExclusionIn", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should pass if the value isn't in the domain", function () {
        validation.add('status', new TSValidate.Validators.ExclusionIn()
            .message('The status must not be A or B')
            .domain(['A', 'B']));
        var messages = validation.validate({
            status: "C"
        });
        expect(messages.count()).toBe(0);
    });
    it("should fail if the value is in the domain", function () {
        validation.add('status', new TSValidate.Validators.ExclusionIn()
            .message('The status must not be A or B')
            .domain(['A', 'B']));
        var messages = validation.validate({
            status: "A"
        });
        expect(messages.count()).toBe(1);
    });
    it("should pass if the value isn't in data", function () {
        validation.add('status', new TSValidate.Validators.ExclusionIn()
            .message('The status must not be A or B')
            .domain(['A', 'B']));
        var messages = validation.validate({});
        expect(messages.count()).toBe(0);
    });
});
describe("TSValidate.Validators.Identical", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should fail if the value in data is not identical", function () {
        validation.add('terms', new TSValidate.Validators.Identical()
            .accepted('yes')
            .message('Terms and conditions must be accepted'));
        var messages = validation.validate({
            terms: "no"
        });
        expect(messages.count()).toBe(1);
    });
    it("should fail if the value isn't part of data", function () {
        validation.add('terms', new TSValidate.Validators.Identical()
            .accepted('yes')
            .message('Terms and conditions must be accepted'));
        var messages = validation.validate({});
        expect(messages.count()).toBe(1);
    });
    it("should fail if the value is null", function () {
        validation.add('terms', new TSValidate.Validators.Identical()
            .accepted('yes')
            .message('Terms and conditions must be accepted'));
        var messages = validation.validate({
            terms: null
        });
        expect(messages.count()).toBe(1);
    });
    it("should pass if the value is identical", function () {
        validation.add('terms', new TSValidate.Validators.Identical()
            .accepted('yes')
            .message('Terms and conditions must be accepted'));
        var messages = validation.validate({
            terms: 'yes'
        });
        expect(messages.count()).toBe(0);
    });
});
describe("TSValidate.Validators.InclusionIn", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should fail if the value isn't in the domain", function () {
        validation.add('status', new TSValidate.Validators.InclusionIn()
            .message('The status must not be A or B')
            .domain(['A', 'B']));
        var messages = validation.validate({
            status: "C"
        });
        expect(messages.count()).toBe(1);
    });
    it("should pass if the value is in the domain", function () {
        validation.add('status', new TSValidate.Validators.InclusionIn()
            .message('The status must not be A or B')
            .domain(['A', 'B']));
        var messages = validation.validate({
            status: "A"
        });
        expect(messages.count()).toBe(0);
    });
    it("should fail if the value isn't in data", function () {
        validation.add('status', new TSValidate.Validators.InclusionIn()
            .message('The status must not be A or B')
            .domain(['A', 'B']));
        var messages = validation.validate({});
        expect(messages.count()).toBe(1);
    });
});
describe("TSValidate.Validators.PresenceOf", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should fail on null value", function () {
        validation.add('name', new TSValidate.Validators.PresenceOf()
            .message('The name is required'));
        var messages = validation.validate({
            name: null
        });
        expect(messages.count()).toBe(1);
    });
    it("should fail on empty string value", function () {
        validation.add('name', new TSValidate.Validators.PresenceOf()
            .message('The name is required'));
        var messages = validation.validate({
            name: ""
        });
        expect(messages.count()).toBe(1);
    });
    it("should fail when property isn't part of data", function () {
        validation.add('name', new TSValidate.Validators.PresenceOf()
            .message('The name is required'));
        var messages = validation.validate({});
        expect(messages.count()).toBe(1);
    });
    it("should pass when valid value is given", function () {
        validation.add('name', new TSValidate.Validators.PresenceOf()
            .message('The name is required'));
        var messages = validation.validate({
            name: "Olivier"
        });
        expect(messages.count()).toBe(0);
    });
});
describe("TSValidate.Validators.Regex", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should pass if the value is valid", function () {
        validation.add('created_at', new TSValidate.Validators.Regex()
            .pattern(/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/)
            .message('The creation date is invalid'));
        var messages = validation.validate({
            created_at: "2016/03/05"
        });
        expect(messages.count()).toBe(0);
    });
    it("should fail if the value is invalid", function () {
        validation.add('created_at', new TSValidate.Validators.Regex()
            .pattern(/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/)
            .message('The creation date is invalid'));
        var messages = validation.validate({
            created_at: "20160305"
        });
        expect(messages.count()).toBe(1);
    });
    it("should fail if the value is empty", function () {
        validation.add('created_at', new TSValidate.Validators.Regex()
            .pattern(/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/)
            .message('The creation date is invalid'));
        var messages = validation.validate({});
        expect(messages.count()).toBe(1);
    });
    it("should pass if the value is empty but empty is allowed", function () {
        validation.add('created_at', new TSValidate.Validators.Regex()
            .pattern(/^[0-9]{4}[-\/](0[1-9]|1[12])[-\/](0[1-9]|[12][0-9]|3[01])$/)
            .message('The creation date is invalid')
            .allowEmpty());
        var messages = validation.validate({});
        expect(messages.count()).toBe(0);
    });
});
describe("TSValidate.Validators.StringLength", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should fail if the value length exceeds the max string length", function () {
        validation.add('name_last', new TSValidate.Validators.StringLength()
            .max(50)
            .min(2)
            .messageMaximum('We don\'t like really long names')
            .messageMinimum('We want more than just their initials'));
        var messages = validation.validate({
            name_last: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas architecto odio officiis blanditiis ex repellat itaque eligendi provident. Hic illum explicabo similique adipisci fugiat, ipsam dolores amet soluta cum, a."
        });
        expect(messages.count()).toBe(1);
    });
    it("should fail if the value length is beneath the min string length", function () {
        validation.add('name_last', new TSValidate.Validators.StringLength()
            .max(50)
            .min(2)
            .messageMaximum('We don\'t like really long names')
            .messageMinimum('We want more than just their initials'));
        var messages = validation.validate({
            name_last: "1"
        });
        expect(messages.count()).toBe(1);
    });
    it("should pass if the value is within the min and max string length", function () {
        validation.add('name_last', new TSValidate.Validators.StringLength()
            .max(50)
            .min(2)
            .messageMaximum('We don\'t like really long names')
            .messageMinimum('We want more than just their initials'));
        var messages = validation.validate({
            name_last: "Olivier"
        });
        expect(messages.count()).toBe(0);
    });
    it("should throw an exception if both min and max option have not been set", function () {
        var exception = false;
        try {
            validation.add('name_last', new TSValidate.Validators.StringLength()
                .messageMaximum('We don\'t like really long names')
                .messageMinimum('We want more than just their initials'));
            var messages = validation.validate({
                name_last: "Olivier"
            });
        }
        catch (e) {
            exception = true;
        }
        expect(exception).toBe(true);
    });
});
describe("TSValidate.Validators.Url", function () {
    var validation;
    beforeEach(function () {
        validation = new TSValidate.Validation;
    });
    it("should fail if an invalid url has been given", function () {
        validation.add('url', new TSValidate.Validators.Url()
            .message(':field must be a url'));
        var messages = validation.validate({
            url: "test"
        });
        expect(messages.count()).toBe(1);
    });
    it("should pass if an valid url has been given", function () {
        validation.add('url', new TSValidate.Validators.Url()
            .message(':field must be a url'));
        var messages = validation.validate({
            url: "http://github.com"
        });
        expect(messages.count()).toBe(0);
    });
    it("should pass if no url has been given but allowEmpty is set to true", function () {
        validation.add('url', new TSValidate.Validators.Url()
            .message(':field must be a url')
            .allowEmpty());
        var messages = validation.validate({});
        expect(messages.count()).toBe(0);
    });
});
