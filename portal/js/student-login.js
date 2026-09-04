document
    .getElementById("studentLoginForm")
    .addEventListener(
        "submit",
        function(event) {

            // Stop page refresh
            event.preventDefault();


            const id =
                document
                .getElementById(
                    "studentId"
                )
                .value
                .trim();


            const password =
                document
                .getElementById(
                    "studentPassword"
                )
                .value
                .trim();


            const message =
                document
                .getElementById(
                    "studentLoginMessage"
                );



            // Create AJAX request
            const xhr =
                new XMLHttpRequest();


            // Request students.json
            xhr.open(
                "GET",
                "data/students.json",
                true
            );


            xhr.onload = function() {

                if (xhr.status === 200) {

                    // Convert JSON text
                    // into JavaScript object
                    const students =
                        JSON.parse(
                            xhr.responseText
                        );


                    // Search student
                    const student =
                        students.find(
                            function(s) {

                                return (
                                    s.id === id &&
                                    s.password === password
                                );

                            }
                        );


                    if (student) {

                        // Save logged-in user
                        localStorage.setItem(
                            "loggedInStudent",
                            JSON.stringify(student)
                        );


                        // Go dashboard
                        window.location.href =
                            "student-dashboard.html";

                    }

                    else {

                        message.textContent =
                            "Invalid Student ID or password.";

                        message.style.color =
                            "#b42318";

                    }

                }

                else {

                    message.textContent =
                        "Could not load student data.";

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