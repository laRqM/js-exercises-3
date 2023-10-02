function HTMLLoader() {
    document.addEventListener("DOMContentLoaded", () => {
        const btnLoadHome = document.getElementById("linkHome"); // We obtain the HTML element and assign it to a variable.
        const btnLoadBlog = document.getElementById("linkBlog"); // We obtain the HTML element and assign it to a variable.
        const btnLoadVideos = document.getElementById("linkVideos"); // We obtain the HTML element and assign it to a variable.
        const btnLoadContact = document.getElementById("linkContact"); // We obtain the HTML element and assign it to a variable.
        const content = document.getElementById("content"); // We obtain the HTML element and assign it to a variable.
        const originalContent = content.innerHTML; // We store the original content of the index.html.

        function loadContent(url) { // Function to load the content of a file into the "div with ID content".
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    content.innerHTML = data;
                });
            // Fetch will send an HTTP GET request to the url and will return a promise.
            // .then(response => response.text()) will assign a function ".then" once the request is completed. This function will take the request function
            // as an argument and will then call .text() in the response.
            // .text() converts the content of the response into text format.
            // .then(data => { content.innerHTML = data; }); Another function then() will take result of the last step as an argument.
            // Then, this function will assign that text content to the innerHTML attribute of the HTML element in content.
        }

        function restoreOriginalContent() { // Function to restore the original content of the div with ID "content".
            content.innerHTML = originalContent; // We set the inner HTML of the div.
        }

        btnLoadHome.addEventListener("click", () => { // We add an EventListener of the type "click" to the constant btnLoadHome.
            restoreOriginalContent(); // When the link with ID "linkHome" is clicked, we execute the function.
        });

        btnLoadBlog.addEventListener("click", () => { // We add an EventListener of the type "click" to the constant btnLoadBlog.
            loadContent("blog.html"); // When the link with ID "linkBlog" is clicked, we execute the function, and we pass the HTML file to load.
        });

        btnLoadVideos.addEventListener("click", () => { // We add an EventListener of the type "click" to the constant btnLoadVideos.
            loadContent("videos.html"); // When the link with ID "linkVideos" is clicked, we execute the function, and we pass the HTML file to load.
        });

        btnLoadContact.addEventListener("click", () => { // We add an EventListener of the type "click" to the constant btnLoadContact.
            loadContent("contact.html"); // When the link with ID "linkContact" is clicked, we execute the function, and we pass the HTML file to load.
        });
    });
}

function markdownLoader() {
    document.addEventListener("DOMContentLoaded", () => { // We add an EventListener of the type "DOMContentLoaded" to the document.
        const markdownContent = document.getElementById("markdownContent"); // We obtain the HTML element and assign it to a variable.
        const markdownFile = "assets/md/test.md"; // We get the markdown file.

        function loadAndRenderMarkdown() { // Function to load and convert the markdown file to HTML.
            fetch(markdownFile)
                .then((response) => response.text())
                .then((markdownText) => {
                    const converter = new showdown.Converter();
                    markdownContent.innerHTML = converter.makeHtml(markdownText);
                })
                .catch((error) => {
                    console.error("An error occurred loading the Markdown file:", error);
                });
            // fetch(markdownFile) This initiate an HTTP GET request to the specified resource by the constant "markdownFile".
            // .then((response) => response.text()) Once the request is completed successfully, the result is passed to this function "then".
            // The request response is passed as an argument called "response".
            // Inside this function "then", "response.text()" is called to get the content of the response as text. This converts the markdown file to text.
            // .then((markdownText) => { ... }) Once the content has been obtained from the markdown file as text, it is then passed to the function "then".
            // We store the content of the markdown file in the constant "markdownText". Here, we use the library showdown to convert the Markdown text into HTML.
            // converter.makeHtml(markdownText) converts the Markdown text into HTML, and then we send the result to the HTML.
        }

        loadAndRenderMarkdown(); // We call the function to load and render the Markdown content.
    });
}

function fileUploader() {
    document.addEventListener("DOMContentLoaded", () => {
        const fileInput = document.getElementById("formFile"); // We obtain the HTML element and assign it to a variable.
        const uploadForm = document.querySelector("form"); // We obtain the HTML element and assign it to a variable.
        const uploadUrl = "upload.php"; // Upload folder.

        function showToast(message, isSuccess) { // Function to show Bootstrap 5 toast.
            const toastElement = document.createElement("div"); // We create a HTML element.
            toastElement.classList.add("toast", "position-fixed", "bottom-0", "end-0"); // We assign the classes to the HTML element.

            if (isSuccess) { // If true...
                toastElement.classList.add("bg-success", "text-white"); // We apply a background-color success (green).
            } else { // If false...
                toastElement.classList.add("bg-danger", "text-white"); // We apply a background-color danger (red).
            }

            toastElement.innerHTML = `
                <div class="toast-header">
                    <strong class="me-auto">${isSuccess ? "Success" : "Error"}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            `; // The toast. If isSuccess is true, we print "Success". Otherwise, we print Error.
            document.body.appendChild(toastElement); // We append the element.

            const toast = new bootstrap.Toast(toastElement); // We create the constant to the Boostrap 5 toast.
            toast.show(); // We show the toast.
        }

        function clearFileInput() { // Function to clear the input file.
            fileInput.value = "";
        }

        uploadForm.addEventListener("submit", (e) => { // We add an EventListener of the type submit to the upload form.
            e.preventDefault(); // We prevent the default page refresh.

            if (fileInput.files.length === 0) { // We verify if a file has been selected.
                console.error("No file has been selected.");
                return; // We kill the function.
            }

            const formData = new FormData(); // We create an FormData object to send the file.
            formData.append("file", fileInput.files[0]); // We append the file.

            fetch(uploadUrl, {
                method: "POST",
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        return response.text().then((data) => { // If the upload was completed successfully...
                            console.log("Upload successful:", data);
                            showToast("Upload successful", true);
                            clearFileInput();
                        });
                    } else {
                        throw new Error("An error has occurred uploading the file."); // There was an error in the upload.
                    }
                })
                .catch((error) => {
                    console.error("Upload error:", error.message);
                    showToast("Upload error", false);
                    clearFileInput();
                });
        });
    });
}

HTMLLoader();
markdownLoader();
fileUploader();
