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
});
    