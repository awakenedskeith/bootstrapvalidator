describe('stringLength', function() {
    beforeEach(function() {
        $([
            '<form class="form-horizontal" id="stringLengthForm">',
                '<div class="form-group">',
                    '<input type="text" name="textCharMaxLength" data-bv-stringlength data-bv-stringlength-max="10" />',
                '</div>',
                '<div class="form-group">',
                    '<textarea name="textareaCharMaxLength" data-bv-stringlength data-bv-stringlength-max="10"></textarea>',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="textUTF8BytesMaxLength" data-bv-stringlength data-bv-stringlength-utf8bytes="true" data-bv-stringlength-max="10" />',
                '</div>',
                '<div class="form-group">',
                    '<textarea name="textareaUTF8BytesMaxLength" data-bv-stringlength data-bv-stringlength-utf8bytes="true" data-bv-stringlength-max="10"></textarea>',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="textCharMinLength" data-bv-stringlength data-bv-stringlength-min="5" />',
                '</div>',
                '<div class="form-group">',
                    '<textarea name="textareaCharMinLength" data-bv-stringlength data-bv-stringlength-min="5"></textarea>',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="textUTF8BytesMinLength" data-bv-stringlength data-bv-stringlength-utf8bytes="true" data-bv-stringlength-min="5" />',
                '</div>',
                '<div class="form-group">',
                    '<textarea name="textareaUTF8BytesMinLength" data-bv-stringlength data-bv-stringlength-utf8bytes="true" data-bv-stringlength-min="5"></textarea>',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="textCharMinMaxLength" data-bv-stringlength data-bv-stringlength-min="5" data-bv-stringlength-max="10" />',
                '</div>',
                '<div class="form-group">',
                    '<textarea name="textareaCharMinMaxLength" data-bv-stringlength data-bv-stringlength-min="5" data-bv-stringlength-max="10"></textarea>',
                '</div>',
                '<div class="form-group">',
                    '<input type="text" name="textUTF8BytesMinMaxLength" data-bv-stringlength data-bv-stringlength-utf8bytes="true" data-bv-stringlength-min="5" data-bv-stringlength-max="10" />',
                '</div>',
                '<div class="form-group">',
                    '<textarea name="textareaUTF8BytesMinMaxLength" data-bv-stringlength data-bv-stringlength-utf8bytes="true" data-bv-stringlength-min="5" data-bv-stringlength-max="10"></textarea>',
                '</div>',
            '</form>'
        ].join('\n')).appendTo('body');

        $('#stringLengthForm').bootstrapValidator();

        this.bv                             = $('#stringLengthForm').data('bootstrapValidator');
        this.$textCharMaxLength             = this.bv.getFieldElements('textCharMaxLength');
        this.$textareaCharMaxLength         = this.bv.getFieldElements('textareaCharMaxLength');
        this.$textUTF8BytesMaxLength        = this.bv.getFieldElements('textUTF8BytesMaxLength');
        this.$textareaUTF8BytesMaxLength    = this.bv.getFieldElements('textareaUTF8BytesMaxLength');
        this.$textCharMinLength             = this.bv.getFieldElements('textCharMinLength');
        this.$textareaCharMinLength         = this.bv.getFieldElements('textareaCharMinLength');
        this.$textUTF8BytesMinLength        = this.bv.getFieldElements('textUTF8BytesMinLength');
        this.$textareaUTF8BytesMinLength    = this.bv.getFieldElements('textareaUTF8BytesMinLength');
        this.$textCharMinMaxLength          = this.bv.getFieldElements('textCharMinMaxLength');
        this.$textareaCharMinMaxLength      = this.bv.getFieldElements('textareaCharMinMaxLength');
        this.$textUTF8BytesMinMaxLength     = this.bv.getFieldElements('textUTF8BytesMinMaxLength');
        this.$textareaUTF8BytesMinMaxLength = this.bv.getFieldElements('textareaUTF8BytesMinMaxLength');
    });

    afterEach(function() {
        $('#stringLengthForm').bootstrapValidator('destroy').remove();
    });

    it('Valid Max Lengths', function() {
        this.$textCharMaxLength.val('123456789♥');
        this.$textareaCharMaxLength.val('123456789♥');
        this.$textUTF8BytesMaxLength.val('1234567♥');
        this.$textareaUTF8BytesMaxLength.val('1234567♥');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();
    });

    it('Valid Min Lengths', function() {
        this.$textCharMinLength.val('1234♥');
        this.$textareaCharMinLength.val('1234♥');
        this.$textUTF8BytesMinLength.val('12♥');
        this.$textareaUTF8BytesMinLength.val('12♥');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();
    });

    it('Valid Min and Max Lengths', function() {
        this.$textCharMinMaxLength.val('1234♥');
        this.$textareaCharMinMaxLength.val('1234♥');
        this.$textUTF8BytesMinMaxLength.val('12♥');
        this.$textareaUTF8BytesMinMaxLength.val('12♥');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();

        this.bv.resetForm();
        this.$textCharMinMaxLength.val('123456789♥');
        this.$textareaCharMinMaxLength.val('123456789♥');
        this.$textUTF8BytesMinMaxLength.val('1234567♥');
        this.$textareaUTF8BytesMinMaxLength.val('1234567♥');
        this.bv.validate();
        expect(this.bv.isValid()).toBeTruthy();
    });

    it('Invalid Max Lengths', function() {
        this.$textCharMaxLength.val('1234567890♥');           // 11 chars when max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textareaCharMaxLength.val('1234567890♥');       // 11 chars when max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textUTF8BytesMaxLength.val('12345678♥');        // 11 UTF-8 bytes when max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textareaUTF8BytesMaxLength.val('12345678♥');    // 11 UTF-8 bytes when max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
    });

    it('Invalid Min Lengths', function() {
        this.$textCharMinLength.val('123♥');                  // 4 chars when min is 5
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textareaCharMinLength.val('123♥');              // 4 chars when min is 5
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textUTF8BytesMinLength.val('1♥');               // 4 UTF-8 bytes when min is 5
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textareaUTF8BytesMinLength.val('1♥');           // 4 UTF-8 bytes when min is 5
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
    });

    it('Invalid Min and Max Lengths', function() {
        this.$textCharMinMaxLength.val('123♥');               // 4 chars when min is 5 and max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textareaCharMinMaxLength.val('123♥');           // 4 chars when min is 5 and max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textUTF8BytesMinMaxLength.val('1♥');            // 4 UTF-8 bytes when min is 5 and max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textareaUTF8BytesMinMaxLength.val('1♥');        // 4 UTF-8 bytes when min is 5 and max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textCharMinMaxLength.val('1234567890♥');        // 11 chars when min is 5 and max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textareaCharMinMaxLength.val('1234567890♥');    // 11 chars when min is 5 and max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textUTF8BytesMinMaxLength.val('12345678♥');     // 11 UTF-8 bytes when min is 5 and max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);

        this.bv.resetForm();
        this.$textareaUTF8BytesMinMaxLength.val('12345678♥'); // 11 UTF-8 bytes when min is 5 and max is 10
        this.bv.validate();
        expect(this.bv.isValid()).toEqual(false);
    });

});