
function google(stateWrapper, ready) {
    window.open("https://google.com");
    ready();
}
function bing(stateWrapper, ready) {
    window.open("https://bing.com");
    ready();
}
var rollbackTo = false;
var originalState = false;
function storeState(stateWrapper, ready) {
    rollbackTo = stateWrapper.current;
    console.log("storeState called: ", rollbackTo);
    ready();
}
function rollback(stateWrapper, ready) {
    console.log("rollback called: ", rollbackTo, originalState);
    console.log("answers at the time of user input: ", stateWrapper.answers);
    if (rollbackTo != false) {
        if (originalState == false) {
            originalState = stateWrapper.current.next;
            console.log('stored original state');
        }
        stateWrapper.current.next = rollbackTo;
        console.log('changed current.next to rollbackTo');
    }
    ready();
}
function restore(stateWrapper, ready) {
    if (originalState != false) {
        stateWrapper.current.next = originalState;
        console.log('changed current.next to originalState');
    }
    ready();
}

$(function () {
    convForm = $('#chat').convform({ selectInputStyle: 'disable' });
    //console.log(convForm);
});

$(function ($) {
    const chatbotInputFiles = `
            <div class="chatbot-file-send form-group d-flex align-items-center px-1 px-sm-4 border-end">
                <label class="me-4" for="input-gallery-img">
                    <input id="input-gallery-img" type="file" class="d-none" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path
                                d="M12.6667 0H3.33333C2.4496 0.00105857 1.60237 0.352588 0.97748 0.97748C0.352588 1.60237 0.00105857 2.4496 0 3.33333L0 12.6667C0.00105857 13.5504 0.352588 14.3976 0.97748 15.0225C1.60237 15.6474 2.4496 15.9989 3.33333 16H12.6667C13.5504 15.9989 14.3976 15.6474 15.0225 15.0225C15.6474 14.3976 15.9989 13.5504 16 12.6667V3.33333C15.9989 2.4496 15.6474 1.60237 15.0225 0.97748C14.3976 0.352588 13.5504 0.00105857 12.6667 0V0ZM3.33333 1.33333H12.6667C13.1971 1.33333 13.7058 1.54405 14.0809 1.91912C14.456 2.29419 14.6667 2.8029 14.6667 3.33333V12.6667C14.6655 12.9637 14.5971 13.2565 14.4667 13.5233L8.358 7.41467C8.04846 7.10504 7.68096 6.85944 7.27648 6.69186C6.87201 6.52429 6.43848 6.43805 6.00067 6.43805C5.56285 6.43805 5.12933 6.52429 4.72485 6.69186C4.32038 6.85944 3.95287 7.10504 3.64333 7.41467L1.33333 9.724V3.33333C1.33333 2.8029 1.54405 2.29419 1.91912 1.91912C2.29419 1.54405 2.8029 1.33333 3.33333 1.33333ZM3.33333 14.6667C2.8029 14.6667 2.29419 14.456 1.91912 14.0809C1.54405 13.7058 1.33333 13.1971 1.33333 12.6667V11.6093L4.58533 8.35733C4.77107 8.17148 4.9916 8.02405 5.23434 7.92346C5.47707 7.82287 5.73725 7.77109 6 7.77109C6.26275 7.77109 6.52293 7.82287 6.76566 7.92346C7.0084 8.02405 7.22893 8.17148 7.41467 8.35733L13.5233 14.4667C13.2565 14.5971 12.9637 14.6655 12.6667 14.6667H3.33333Z"
                                fill="#A5A5C4" />
                            <path
                                d="M10.6668 7C11.1283 7 11.5794 6.86315 11.9632 6.60676C12.3469 6.35037 12.6459 5.98596 12.8225 5.55959C12.9992 5.13323 13.0454 4.66408 12.9553 4.21146C12.8653 3.75883 12.6431 3.34307 12.3167 3.01675C11.9904 2.69043 11.5747 2.4682 11.122 2.37817C10.6694 2.28814 10.2003 2.33434 9.7739 2.51095C9.34754 2.68755 8.98312 2.98662 8.72673 3.37034C8.47034 3.75405 8.3335 4.20518 8.3335 4.66667C8.3335 5.28551 8.57933 5.879 9.01691 6.31658C9.4545 6.75417 10.048 7 10.6668 7ZM10.6668 3.66667C10.8646 3.66667 11.058 3.72532 11.2224 3.8352C11.3868 3.94508 11.515 4.10126 11.5907 4.28398C11.6664 4.46671 11.6862 4.66778 11.6476 4.86176C11.609 5.05574 11.5138 5.23392 11.3739 5.37377C11.2341 5.51363 11.0559 5.60887 10.8619 5.64745C10.6679 5.68604 10.4669 5.66623 10.2841 5.59055C10.1014 5.51486 9.94524 5.38669 9.83536 5.22224C9.72548 5.05779 9.66683 4.86445 9.66683 4.66667C9.66683 4.40145 9.77219 4.1471 9.95972 3.95956C10.1473 3.77202 10.4016 3.66667 10.6668 3.66667Z"
                                fill="#A5A5C4" />
                        </g>
                    </svg>
                </label>
                <label class="me-4" for="input-any-file">
                    <input id="input-any-file" type="file" class="d-none" />
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path
                                d="M15.3 6.4C15.175 6.27502 15.0055 6.20481 14.8287 6.20481C14.6519 6.20481 14.4824 6.27502 14.3573 6.4L7.09602 13.6927C6.78649 14.0022 6.41902 14.2478 6.01459 14.4154C5.61016 14.5829 5.17668 14.6692 4.73892 14.6692C3.85481 14.6693 3.00689 14.3181 2.38168 13.693C1.75648 13.0679 1.40521 12.22 1.40515 11.3359C1.40508 10.4518 1.75623 9.60387 2.38135 8.97867L9.41402 1.91733C9.79008 1.54726 10.2971 1.34078 10.8247 1.34286C11.3523 1.34495 11.8578 1.55544 12.2309 1.92847C12.604 2.3015 12.8146 2.80686 12.8168 3.33447C12.819 3.86208 12.6127 4.36918 12.2427 4.74533L5.21002 11.8067C5.08318 11.9282 4.91432 11.996 4.73868 11.996C4.56304 11.996 4.39418 11.9282 4.26735 11.8067C4.14237 11.6816 4.07216 11.5121 4.07216 11.3353C4.07216 11.1586 4.14237 10.989 4.26735 10.864L10.5287 4.574C10.6501 4.44826 10.7173 4.27986 10.7158 4.10506C10.7143 3.93027 10.6442 3.76306 10.5206 3.63945C10.397 3.51585 10.2297 3.44574 10.0549 3.44422C9.88015 3.4427 9.71175 3.50989 9.58602 3.63133L3.32468 9.92133C3.13893 10.1071 2.99158 10.3275 2.89105 10.5702C2.79052 10.8129 2.73878 11.073 2.73878 11.3357C2.73878 11.5983 2.79052 11.8584 2.89105 12.1011C2.99158 12.3438 3.13893 12.5643 3.32468 12.75C3.70576 13.1136 4.21227 13.3165 4.73902 13.3165C5.26576 13.3165 5.77227 13.1136 6.15335 12.75L13.1853 5.688C13.7973 5.0602 14.1374 4.21657 14.1317 3.33985C14.1261 2.46313 13.7753 1.62392 13.1553 1.00401C12.5353 0.384111 11.6961 0.033429 10.8194 0.0279357C9.94265 0.0224424 9.09906 0.36258 8.47135 0.974666L1.43868 8.036C0.563468 8.91121 0.0717773 10.0983 0.0717773 11.336C0.0717774 12.5737 0.563468 13.7608 1.43868 14.636C2.3139 15.5112 3.50094 16.0029 4.73868 16.0029C5.97642 16.0029 7.16347 15.5112 8.03868 14.636L15.3 7.34533C15.3623 7.28338 15.4117 7.20973 15.4455 7.12861C15.4792 7.0475 15.4965 6.96051 15.4965 6.87266C15.4965 6.78482 15.4792 6.69783 15.4455 6.61672C15.4117 6.5356 15.3623 6.46195 15.3 6.4Z"
                                fill="#A5A5C4" />
                        </g>
                    </svg>
                </label>
                <label for="">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path
                                d="M7.99984 13.3333C9.41384 13.3317 10.7695 12.7693 11.7693 11.7695C12.7692 10.7696 13.3316 9.414 13.3332 8V5.33333C13.3332 3.91884 12.7713 2.56229 11.7711 1.56209C10.7709 0.561899 9.41433 -3.8147e-06 7.99984 -3.8147e-06C6.58535 -3.8147e-06 5.2288 0.561899 4.2286 1.56209C3.22841 2.56229 2.6665 3.91884 2.6665 5.33333V8C2.66809 9.414 3.23051 10.7696 4.23036 11.7695C5.23021 12.7693 6.58584 13.3317 7.99984 13.3333ZM7.99984 1.33333C8.94421 1.33508 9.85756 1.67057 10.5785 2.28053C11.2995 2.89048 11.7817 3.73564 11.9398 4.66666H9.99984C9.82303 4.66666 9.65346 4.7369 9.52843 4.86192C9.40341 4.98695 9.33317 5.15652 9.33317 5.33333C9.33317 5.51014 9.40341 5.67971 9.52843 5.80473C9.65346 5.92976 9.82303 6 9.99984 6H11.9998V7.33333H9.99984C9.82303 7.33333 9.65346 7.40357 9.52843 7.52859C9.40341 7.65362 9.33317 7.82318 9.33317 8C9.33317 8.17681 9.40341 8.34638 9.52843 8.4714C9.65346 8.59642 9.82303 8.66666 9.99984 8.66666H11.9398C11.7831 9.59832 11.3014 10.4443 10.5801 11.0544C9.85876 11.6646 8.94458 11.9994 7.99984 11.9994C7.05509 11.9994 6.14091 11.6646 5.4196 11.0544C4.69829 10.4443 4.21653 9.59832 4.05984 8.66666H5.99984C6.17665 8.66666 6.34622 8.59642 6.47124 8.4714C6.59627 8.34638 6.6665 8.17681 6.6665 8C6.6665 7.82318 6.59627 7.65362 6.47124 7.52859C6.34622 7.40357 6.17665 7.33333 5.99984 7.33333H3.99984V6H5.99984C6.17665 6 6.34622 5.92976 6.47124 5.80473C6.59627 5.67971 6.6665 5.51014 6.6665 5.33333C6.6665 5.15652 6.59627 4.98695 6.47124 4.86192C6.34622 4.7369 6.17665 4.66666 5.99984 4.66666H4.05984C4.21802 3.73564 4.70019 2.89048 5.42115 2.28053C6.14212 1.67057 7.05547 1.33508 7.99984 1.33333Z"
                                fill="#A5A5C4" />
                            <path
                                d="M15.3333 8C15.1565 8 14.987 8.07024 14.8619 8.19526C14.7369 8.32029 14.6667 8.48986 14.6667 8.66667C14.6649 10.2574 14.0322 11.7825 12.9074 12.9074C11.7825 14.0322 10.2574 14.6649 8.66667 14.6667H7.33333C5.74263 14.6647 4.21763 14.032 3.09284 12.9072C1.96804 11.7824 1.33527 10.2574 1.33333 8.66667C1.33333 8.48986 1.2631 8.32029 1.13807 8.19526C1.01305 8.07024 0.843478 8 0.666667 8C0.489856 8 0.320286 8.07024 0.195262 8.19526C0.0702379 8.32029 0 8.48986 0 8.66667C0.00229365 10.6109 0.775647 12.4748 2.15042 13.8496C3.52519 15.2244 5.38912 15.9977 7.33333 16H8.66667C10.6109 15.9977 12.4748 15.2244 13.8496 13.8496C15.2244 12.4748 15.9977 10.6109 16 8.66667C16 8.48986 15.9298 8.32029 15.8047 8.19526C15.6797 8.07024 15.5101 8 15.3333 8Z"
                                fill="#A5A5C4" />
                        </g>
                    </svg>
                </label>
            </div>`;
    $('#convForm').append(chatbotInputFiles);
});