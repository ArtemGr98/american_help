import "./index.scss";
import validation from "../../module/validation/index";

form_send(".contact-us_form", false);

function form_send(wrapper, modal) {
    let form_wrapper = document.querySelectorAll(wrapper);
    let loader = document.querySelector(".modal_loading__block");

    form_wrapper.forEach((element) => {
        let action = element.getAttribute("action");

        let btn = element.querySelector(".validation_btn");
        if (btn != null) {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                let status = validation(btn);

                if (status == true) {
                    console.log("send!");
                    let elements = element.elements;
                    let obj = {};

                    for (let i = 0; i < elements.length; i++) {
                        let item = elements.item(i);
                        let check_type = ["file", "reset", "submit", "button"].indexOf(item.type);
                        if (check_type > -1) {} else {
                            obj[item.name] = item.value;
                        }
                    }
                    console.log('wrapper: ', wrapper);
                    console.log('іфв: ');

                    if (action != "" || action != undefined) {
                        loader.classList.add("active");
                        console.log('action!!!', action);

                        fetch(action, {
                                method: "POST",
                                body: new URLSearchParams(obj),
                                // body: new URLSearchParams(obj).toString(),
                            })
                            .then((data) => {
                                console.log("data1: ", data);
                                accept_modal(data)
                                return data.json();
                            })
                            .catch((error) => {
                                console.log("error: ", error);
                                bad_modal(error);
                            });
                    }
                } else {
                    console.log("error!");
                }
            });
        } else {
            console.error(`такого модального вікна не існує на цій сторінці - ${wrapper}`);
        }
    });
}

function bad_modal(error_message) {
    let loader = document.querySelector(".modal_loading__block");
    let bad = document.querySelector(".modal_bad__block");

    if (error_message) {
        console.log("error_message: ", error_message);

        bad.innerHTML = `
        <div class="custom_modal_text modal_bad_text bold_title bold_title_2 color_red">
            Error!!!
            <br>
            ${error_message}
        </div
        `;
    }

    setTimeout(() => {
        loader.classList.remove("active");
        bad.classList.add("active");
    }, 500);
    setTimeout(() => {
        bad.classList.remove("active");
    }, 4000);
}

function accept_modal(data) {
    let loader = document.querySelector(".modal_loading__block");
    let accept = document.querySelector(".modal_accept__block");
    let inputs = document.querySelectorAll('.validation_input')

    if (data.ok) {
        setTimeout(() => {
            loader.classList.remove("active");
            accept.classList.add("active");
        }, 0);
        setTimeout(() => {
            accept.classList.remove("active");
        }, 4000);

        inputs.forEach(input => input.value = '')
    }
}

function remove_error() {
    let errors = document.querySelectorAll(".field_error");
    errors.forEach((error) => {
        error.remove();
    });

    let errors_modal = document.querySelectorAll(".custom_modal_text");
    errors_modal.forEach((error) => {
        error.remove();
    });
}