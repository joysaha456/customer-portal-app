/**
 * @Script js for (Template/Project Name)
 *
 * @project     - Project Name
 * @author      - 
 * @created_by  - 
 * @created_at  - 
 * @modified_by -
 */


/**
 * ========================================================
 * this function execute when window properly loaded
 * ===========================================================
 */

$(window).on('load', function () {

    // code should be execute here

});



/**
 * ========================================================
 * this function execute when DOM element ready 
 * ===========================================================
 */

$(document).ready(function () {


    // sidebar toggle
    $(function () {
        if ($('.btn-sidebar-toggle').length) {
            $('.btn-sidebar-toggle').on('click', function (e) {
                e.preventDefault();
                $(this).toggleClass('active');
                $(this).find('svg.svg-menu-bar').toggleClass('active');
                $('body , #navigation-sidebar').toggleClass('sidebar-collapsed');
            })
        }
    });



    // gantt-chart-on-init
    $(function () {
        if ($('#gantt-target').length) {
            $('.gantt-chart-on-init').on('click', function (e) {
                e.preventDefault();
                setTimeout(() => {
                    let tasks = [
                        {
                            start: '2021-04-07',
                            end: '2021-04-18',
                            name: 'Redesign website',
                            id: "Task 0",
                            progress: 91,
                            custom_class: 'task-0-color',
                        },
                        {
                            start: '2021-04-10',
                            end: '2021-04-15',
                            name: 'Write new content',
                            id: "Task 1",
                            progress: 10,
                            dependencies: 'Task 0',
                            custom_class: 'task-1-color',
                        },
                        {
                            start: '2021-04-13',
                            end: '2021-04-17',
                            name: 'Apply new styles',
                            id: "Task 2",
                            progress: 20,
                            custom_class: 'task-2-color',
                            dependencies: 'Task 1'
                        },
                        {
                            start: '2021-04-17',
                            end: '2021-04-19',
                            name: 'Review',
                            id: "Task 3",
                            progress: 20,
                            custom_class: 'task-3-color',
                            dependencies: 'Task 2'
                        },
                        {
                            start: '2021-04-19',
                            end: '2021-04-22',
                            name: 'Deploy',
                            id: "Task 4",
                            progress: 30,
                            custom_class: 'task-4-color',
                            dependencies: 'Task 2'
                        },
                        {
                            start: '2021-04-23',
                            end: '2021-04-24',
                            name: 'Go Live!',
                            id: "Task 5",
                            progress: 10,
                            custom_class: 'task-5-color',
                            dependencies: 'Task 4',
                            custom_class: 'bar-milestone'
                        },
                    ]

                    let gantt_chart = new Gantt("#gantt-target", tasks, {
                        on_click: function (task) {
                            console.log(task);
                        },
                        on_date_change: function (task, start, end) {
                            console.log(task, start, end);
                        },
                        on_progress_change: function (task, progress) {
                            console.log(task, progress);
                        },
                        on_view_change: function (mode) {
                            console.log(mode);
                        },
                        header_height: 50,
                        column_width: 30,
                        step: 24,
                        view_modes: ['Quarter Day', 'Half Day', 'Day', 'Week', 'Month'],
                        bar_height: 30,
                        bar_corner_radius: 0,
                        arrow_curve: 5,
                        padding: 30,
                        view_mode: 'Day',
                        date_format: 'YYYY-MM-DD',
                        custom_popup_html: null
                    });
                }, 200)
            });
        }
    });




    // demo todo item
    // for add team member
    $(function () {

        // add team member img upload preview
        // for teams tab
        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#uploaded-img-preview').attr('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]); // convert to base64 string
            }
        }
        if ($("#img-upload").length) {
            $("#img-upload").change(function () {
                readURL(this);
            });
        }

        if ($('#team-widgets').length) {

            /**
             * @initial appendTodoItems
             * @append todoItems
             */
            let todoItems = ''
            function appendTodoItems(item) {
                todoItems +=
                    `<div class="new team-grid-widget col-xl-4 col-xxl-3">
                        <div class="team-member-widget is-radius bg-white px-4 py-4 mb-4">
                            <img src="${item.imgSrc}" alt="parson" class="person-img img-fluid rounded-circle mb-4" />
                            <h4 class="person-name mb-3 fs-6 text-dark">${item.firstName + item.lastName}</h4>
                            <span class="person-designation mb-2 text-muted d-block">${item.designation}</span>
                            <a href="tel:(303) 555-0105" class="person-number text-decoration-none text-muted d-block mb-2">
                                <img class="img-fluid mb-2 me-2" src="assets/img/call.svg" alt=""> ${item.phnNumber}
                            </a>
                            <a href="mailto:charolette20@gmail.com" class="person-email text-decoration-none text-muted d-block mb-2">
                                <img class="img-fluid mb-2 me-2" src="assets/img/msg.svg" alt=""> ${item.emailAddress}
                            </a>
                            <div class="dropdown spill-down-action">
                                <button class="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <ul class="dropdown-menu px-0 py-3">
                                    <li>
                                        <a class="dropdown-item d-flex align-items-center" href="#">
                                            <i class="bi bi-pen fs-6 me-2"></i>
                                            Edit
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item d-flex align-items-center" href="#">
                                            <i class="bi bi-person-x fs-6 me-2"></i>
                                            Remove Member
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> \n`;
                $('#team-widgets .team-grid-widget:first').before(todoItems);
            }


            /**
             * @submit todoSubmitForm
             * @store data
             */
            $(document).on('click', '#save-team-member', function (e) {
                e.preventDefault();
                var data = {
                    imgSrc: $('#uploaded-img-preview').attr('src'),
                    firstName: $('#fname').val(),
                    lastName: $('#lname').val(),
                    designation: $('#designation').val() || 'Designation',
                    phnNumber: $('#phnNumber').val(),
                    emailAddress: $('#emailAddress').val(),
                }

                if (data.imgSrc === '' || data.firstName === '' || data.lastName === '' || data.designation === '' || data.phnNumber === '' || data.emailAddress === '') {
                    return alert('Please enter all of required data !!');
                } else {
                    if (/^\d*$/.test(data.phnNumber)) {
                        if (data.emailAddress.indexOf('@') == -1 || data.emailAddress.indexOf('.') == -1) {
                            return alert('Please fill up email address using @ and write after some words like : example@email.com !')
                        }
                        appendTodoItems(data);
                        $('#fname').val('');
                        $('#lname').val('');
                        $('#phnNumber').val('');
                        $('#emailAddress').val('');
                        todoItems = '';
                        $('#add-member-modal').modal('hide');
                    } else {
                        return alert('Phone number only allowed the numeric !!');
                    }
                }
            });
        }
    });


    // init btnFadeToggle event handler
    // for files tab
    $(function () {
        if ($(".showAllFiles").length) {
            $(".showAllFiles").on('click', function (e) {
                e.preventDefault();
                $(".fileElements").toggle();
            });
        }
    });



    // init btnFadeToggle event handler
    // for files tab
    $(function () {
        if ($(window).width() < 992) {
            $('.chatbot-left-part').css('display', 'none');
            if ($(".btn-chatbot-toggle").length) {
                $(".btn-chatbot-toggle").on('click', function (e) {
                    e.preventDefault();
                    $(".chatbot-element-toggle").toggle();
                });
            }
        }
    });



    // for phases date picker
    $(function () {
        if ($(".datePicker").length) {
            $(".datePicker").datepicker();
        }
    });


    // for phases date picker
    $(function () {
        if ($(".select2-init").length) {
            $(".select2-init").select2({
                width: 'resolve' // need to override the changed default
            });
        }
    });


    // for range bar
    // JS for Price Range slider
    $(function () {
        if ($("#slider-range").length) {
            let min = $('#slider-range').data('min');
            let max = $('#slider-range').data('max');
            $("#slider-range").slider({
                range: true,
                min: min,
                max: max,
                values: [0, 2250],
                slide: function (event, ui) {
                    $("#amount").val("" + ui.values[0] + " - " + ui.values[1]);
                    $("#min-value").text(ui.values[0]);
                    $("#max-value").text(ui.values[1]);
                }
            });
            $("#min-value").text($("#slider-range").slider("values", 0));
            $("#max-value").text($("#slider-range").slider("values", 1));
            $("#amount").val("" + $("#slider-range").slider("values", 0) + " - " + $("#slider-range").slider("values", 1));
        }
    });

});
