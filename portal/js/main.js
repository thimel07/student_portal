function loadNotices() {

    // Create AJAX object
    const xhr = new XMLHttpRequest();


    // Request XML file
    xhr.open(
        "GET",
        "data/notices.xml",
        true
    );


    // When server responds
    xhr.onload = function () {

        const list =
            document.getElementById(
                "noticeList"
            );


        if (xhr.status === 200) {

            // Get XML document
            const xml =
                xhr.responseXML;


            // Get all notice elements
            const notices =
                xml.getElementsByTagName(
                    "notice"
                );


            // Display number of notices
            document.getElementById(
                "noticeCount"
            ).textContent =
                notices.length;


            list.innerHTML = "";


            // Loop through notices
            for (
                let i = 0;
                i < notices.length;
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


                const description =
                    notices[i]
                    .getElementsByTagName(
                        "description"
                    )[0]
                    .textContent;


                list.innerHTML += `

                    <article
                        class="notice-card">

                        <div class="date">
                            ${date}
                        </div>

                        <h3>
                            ${title}
                        </h3>

                        <p>
                            ${description}
                        </p>

                    </article>

                `;
            }

        }

        else {

            list.innerHTML = `

                <div class="error">

                    Unable to load notices.

                    Please run the project
                    using Live Server.

                </div>

            `;

        }

    };


    // AJAX error
    xhr.onerror = function () {

        document.getElementById(
            "noticeList"
        ).innerHTML = `

            <div class="error">

                AJAX request failed.

                Please use Live Server.

            </div>

        `;

    };


    // Send request
    xhr.send();

}



// Load notices when page starts
document.addEventListener(
    "DOMContentLoaded",
    loadNotices
);



// Refresh button
document
    .getElementById("reloadNotices")
    ?.addEventListener(
        "click",
        loadNotices
    );