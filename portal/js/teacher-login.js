document
    .getElementById("teacherLoginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const id =
                document
                .getElementById(
                    "teacherId"
                )
                .value
                .trim();


            const password =
                document
                .getElementById(
                    "teacherPassword"
                )
                .value
                .trim();


            const message =
                document
                .getElementById(
                    "teacherLoginMessage"
                );



            // Create AJAX object
            const xhr =
                new XMLHttpRequest();


            // Request teachers.json
            xhr.open(
                "GET",
                "data/teachers.json",
                true
            );


            xhr.onload = function() {

                if (xhr.status === 200) {

                    const teachers =
                        JSON.parse(
                            xhr.responseText
                        );


                    // Find teacher
                    const teacher =
                        teachers.find(
                            function(t) {

                                return (
                                    t.id === id &&
                                    t.password === password
                                );

                            }
                        );


                    if (teacher) {

                        // Store login data
                        localStorage.setItem(
                            "loggedInTeacher",
                            JSON.stringify(teacher)
                        );


                        // Dashboard
                        window.location.href =
                            "teacher-dashboard.html";

                    }

                    else {

                        message.textContent =
                            "Invalid Teacher ID or password.";

                        message.style.color =
                            "#b42318";

                    }

                }

                else {

                    message.textContent =
                        "Could not load teacher data.";

                    message.style.color =
                        "#b42318";

                }

            };


            xhr.onerror = function() {

                message.textContent =
                    "AJAX request failed. Use Live Server.";

                message.style.color =
                    "#b42318";

            };


            xhr.send();

        }
    );