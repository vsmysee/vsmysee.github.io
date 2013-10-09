    $(function () {
        $("#arrow_panel").bind("click", function () {
            $("#head_section").slideToggle();
            $(this).toggleClass("hover");
        });
    })
