function readURL(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = function(e) {
            $('.preview').attr('src', e.target.result);
        }
        
        reader.readAsDataURL(input.files[0]);
    }
}

$('.image-input').change(function() {
    readURL(this);
});
$('.checkbox-row').change(function () {
    let input = this;
    let container = $(this).parents('.noti-item');
    if ($(this).is(':checked')) {
        container.addClass('picked-row');
    } else {
        container.removeClass('picked-row');
    }

    let container2 = $(this).parents('.account-item');
    if ($(this).is(':checked')) {
        container2.addClass('picked-row');
    } else {
        container2.removeClass('picked-row');
    }

});
$('.nav-toggle').click(function () {
    $('.sidebar').toggleClass('active');
});

$(document).ready(function () {
    if ($('.mn-content>.mn-content-main-content').children('.tab-pane').length > 0) {
        $('.mn-content').css('overflow', 'hidden');

        $('.mn-content>.mn-content-main-content').css('height', '100%');

        $('.mn-content>.mn-content-main-content .tab-pane').each(function(index) {
            $(this).css('height', '100%');
            $(this).css('overflow', 'auto');
        });
    }
});
