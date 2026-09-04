// ============================================
// CHECK TEACHER LOGIN
// ============================================

const teacherData = localStorage.getItem("loggedInTeacher");


// If teacher is not logged in
if (!teacherData) {

    window.location.href = "teacher-login.html";

} else {

    const teacher = JSON.parse(teacherData);


    // Display teacher name
    const teacherName =
        document.getElementById("teacherName");

    if (teacherName) {
        teacherName.textContent = teacher.name;
    }


    // Display teacher ID
    const teacherId =
        document.getElementById("teacherIdDisplay");

    if (teacherId) {
        teacherId.textContent = teacher.id;
    }


    // Load courses
    loadTeacherCourses();


    // Load notices
    loadTeacherNotices();

}



// ============================================
// LOAD TEACHER COURSES USING AJAX + JSON
// ============================================

function loadTeacherCourses() {

    const xhr = new XMLHttpRequest();

    xhr.open(
        "GET",
        "data/courses.json",
        true
    );


    xhr.onload = function () {

        if (xhr.status === 200) {

            const courses =
                JSON.parse(xhr.responseText);


            const teacher =
                JSON.parse(
                    localStorage.getItem(
                        "loggedInTeacher"
                    )
                );


            // Find teacher's courses
            const myCourses =
                courses.filter(function (course) {

                    return course.teacher === teacher.name;

                });


            const list =
                document.getElementById(
                    "teacherCourseList"
                );


            if (!list) {
                return;
            }


            list.innerHTML = "";


            if (myCourses.length === 0) {

                list.innerHTML = `
                    <div class="course-item">

                        <strong>
                            No courses assigned.
                        </strong>

                    </div>
                `;

                return;
            }


            myCourses.forEach(function (course) {

                list.innerHTML += `

                    <div class="course-item">

                        <strong>
                            ${course.code}
                            —
                            ${course.name}
                        </strong>

                        <span>
                            ${course.credits}
                            Credits

                            •

                            ${course.students}
                            Students
                        </span>

                    </div>

                `;

            });

        }

    };


    xhr.onerror = function () {

        console.log(
            "Unable to load courses."
        );

    };


    xhr.send();

}



// ============================================
// LOAD NOTICES USING AJAX + XML
// ============================================

function loadTeacherNotices() {

    const xhr =
        new XMLHttpRequest();


    xhr.open(
        "GET",
        "data/notices.xml",
        true
    );


    xhr.onload = function () {

        if (xhr.status === 200) {

            const xml =
                xhr.responseXML;


            const notices =
                xml.getElementsByTagName(
                    "notice"
                );


            const noticeCount =
                document.getElementById(
                    "teacherNoticeCount"
                );


            if (noticeCount) {

                noticeCount.textContent =
                    notices.length;

            }


            const noticeContainer =
                document.getElementById(
                    "teacherNotices"
                );


            if (!noticeContainer) {
                return;
            }


            let html = "";


            for (
                let i = 0;
                i < Math.min(
                    3,
                    notices.length
                );
                i++
            ) {

                const title =
                    notices[i]
                    .getElementsByTagName(
                        "title"
                    )[0]
                    .textContent;


                const date =
                    notices[i]
                    .getElementsByTagName(
                        "date"
                    )[0]
                    .textContent;


                html += `

                    <div class="small-notice">

                        <strong>
                            ${title}
                        </strong>

                        <p>
                            ${date}
                        </p>

                    </div>

                `;

            }


            noticeContainer.innerHTML =
                html;

        }

    };


    xhr.onerror = function () {

        console.log(
            "Unable to load notices."
        );

    };


    xhr.send();

}



// ============================================
// LOGOUT
// ============================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const logoutButton =
            document.getElementById(
                "logoutBtn"
            );


        if (!logoutButton) {

            console.log(
                "Logout button not found."
            );

            return;

        }


        logoutButton.addEventListener(
            "click",
            function () {

                console.log(
                    "Logout button clicked"
                );


                // Remove teacher login
                localStorage.removeItem(
                    "loggedInTeacher"
                );


                // Double-check
                console.log(
                    "Teacher session removed"
                );


                // Go to login page
                window.location.href =
                    "teacher-login.html";

            }
        );

    }
);