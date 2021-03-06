$(document).ready(function(){

    function copyTextToClipboard(text){
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute("id", "dummy_id");
        document.getElementById("dummy_id").value=text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    $('.copy').click(function(event){
        event.stopPropagation();
        event.stopImmediatePropagation();

        let item = event.target;
        let correctItem = item.classList.contains('copy') ? item : $(item).parents('.copy')[0];

        let attributes = correctItem.attributes;
        if(attributes){
            let copyContentAttribute = attributes['data-copy-content'];
            if(copyContentAttribute){
                copyTextToClipboard(copyContentAttribute.value);
            }

            // add a small animation class on the button to confirm text has been copied
            let buttonIdAttr = attributes['data-copy-button-id'];
            if(buttonIdAttr){
                let button = $('#' + buttonIdAttr.value);
                if(button) {
                    button.removeClass('btn-primary');
                    button.addClass('button-ok btn-success');
                    button.text ("Copié ✅");
                }
            }
        }
    });

    $('body').on(
        'webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function() {
            $('.button-ok').each(function(){
                $(this).removeClass('button-ok btn-success');
                $(this).addClass('btn-primary');
                $(this).text("Copier l'IP");
            });
        }
    );

    // activate the firefly effect on the intro div
    $.firefly({
        color: '#fff',
        minPixel: 1,
        maxPixel: 3,
        total : 100,
        on: '#intro'
    });

    $.ajax({
        url: 'assets/misc/splashes.json',
        cache: true
    }).done(function(data) {
        let pun = (Math.random() > 0.5);
        let splashContent = 'Version ' + data.version;
        if(pun) {
            splashContent = data.puns[Math.floor(Math.random() * data.puns.length)];
        }

        $('#splash').text(splashContent);
        $('#version').text('Minecraft ' + data.version);
    });
});