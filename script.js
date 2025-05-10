document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("userInput");

    input.focus();

    document.addEventListener("click", function () {
        input.focus();
    });

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") { // Detect 'Enter' key press
            event.preventDefault(); // Prevent form submission (if any)
            handleCommand(input.value.trim()); // Process the command
            input.value = ""; // Clear input field after execution
        }
    });

    let currentMode = null; // Track user state

    function handleCommand(command) {
        command = command.toLowerCase().trim();

        if (currentMode === "selectingProject") {
            switch (command) {
                case "1":
                    const animeEDA = `
                        <div class="about-section">
                            <h1 class="p-title">Top 500 Anime TV Shows - Exploratory Data Analysis</h1>
                            <h3>Published: 10th May, 2025</h3>
                            <h2>Overview:</h2>
                            <p class="p-content">This project is an exploratory data analysis on the Top 500 Anime TV Shows listed on MyAnimeList.<br> The goal of this project is to pull data from the MyAnimeList API into a dataset via GET request. This dataset is then to be used as the foundation for the analysis.<br></p>
                            <h2>Objective of Analysis:</h2>
                            <ul><li>What genre of Anime receives the highest ratings?</li>
                            <li>What studios consistently produce the highest rated shows?</li>
                            <li>During which season are the highest rated anime released? (spring, summer, etc.)</li>
                            <li><strong>Main objective:</strong> Produce a clean and analysed dataset to be later used in a prediction model.</li></ul>
                            <iframe src="https://nbviewer.org/url/raw.githubusercontent.com/jamesmosey/top500anime_eda/main/top500anime_eda.ipynb"
                            width="100%" height="780" frameborder="0" style="border: none;">
                            </iframe>
                        </div>
                    `;
                    displayContent(animeEDA);
                    displayOutput("Project 1 loaded.");
                    currentMode = null;
                    break;

                // Add cases 2–5 here...

                default:
                    displayOutput("Please enter a valid project number (1–5).");
            }
            return;
        }

        // Main command logic
        switch (command) {
            case "help":
                displayOutput("Available commands:\nhelp\nhello\nwhois\ncontact\nprojects\neducation\nclear");
                break;

            case "hello":
                displayOutput("Hello, user! How can I assist you?");
                break;

            case "projects":
                displayOutput("Please select a project to view (1-5):\n1. Top 500 Anime EDA\n2. ...");
                currentMode = "selectingProject";
                break;

            case "clear":
                clearOutput();
                break;

            default:
                displayOutput(`Command not recognized: ${command}`);
        }
    }


    const outputContainer = document.querySelector(".output-container");

    function displayContent(html) {
        const rightBox = document.querySelector('.right-box');
        rightBox.innerHTML = html;
    }

    function displayOutput(message, type = "default") {
        const newLine = document.createElement("div");
        newLine.classList.add("terminal-output");
        newLine.textContent = message;
        outputContainer.appendChild(newLine);

        // Scroll to the bottom
        const scrollWrapper = document.querySelector('.output-scroll-wrapper');
        scrollWrapper.scrollTop = scrollWrapper.scrollHeight;

        // Make sure you pass `newLine` as element to `typewriterDOM`
        typewriterDOM(message, newLine, 50);
    }



    function clearOutput() {
        const outputs = document.querySelectorAll(".terminal-output");
        outputs.forEach(output => output.remove()); // Remove only command outputs
    }

});

function typewriterNormal(message, elementSelector, speed) {
    let textPosition = 0;

    function type() {
        let displayedText = message.substring(0, textPosition);

        displayedText = displayedText.replace(/help/g, '<span class="highlight">help</span>');

        document.querySelector(elementSelector).innerHTML =
            displayedText + (textPosition < message.length ? "<span>|</span>" : "");

        if (textPosition++ < message.length) {
            setTimeout(type, speed);
        }
    }

    type();
}

function typewriterDOM(message, element, speed) {
    let textPosition = 0;

    function type() {
        let displayedText = message.substring(0, textPosition);

        displayedText = displayedText.replace(/help/g, '<span class="highlight">help</span>');
        element.innerHTML = displayedText + (textPosition < message.length ? "<span>|</span>" : "");

        if (textPosition++ < message.length) {
            setTimeout(type, speed);
        }
    }

    type();
}



// Example Usage:
window.addEventListener("load", function () {
    typewriterNormal("Welcome to the terminal of", ".top-text", 50);

    setTimeout(() => {
        typewriterNormal("Type 'help' to see available commands.", ".btm-text", 50);
    }, 2000);
});
