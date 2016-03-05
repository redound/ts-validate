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
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
describe("TSValidate.Validators.Confirmation", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
describe("TSValidate.Validators.Email", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
describe("TSValidate.Validators.ExclusionIn", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
describe("TSValidate.Validators.InclusionIn", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
describe("TSValidate.Validators.PresenceOf", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
describe("TSValidate.Validators.Regex", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
describe("TSValidate.Validators.StringLength", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
describe("TSValidate.Validators.Url", function () {
    beforeEach(function () {
    });
    describe("constructor()", function () {
        it("true be true", function () {
            expect(true).toBe(true);
        });
    });
});
