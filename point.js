/* =========================================================
   POINTERS BLOG - point.js
   Interactive JavaScript for the Pointers learning webpage
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. NAVBAR - Smooth scrolling
       ===================================================== */

    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    /* =====================================================
       2. COPY CODE BUTTONS
       ===================================================== */

    const codeBlocks = document.querySelectorAll("pre");

    codeBlocks.forEach((block) => {

        if (block.querySelector(".copy-btn")) return;

        const button = document.createElement("button");

        button.className = "copy-btn";
        button.textContent = "Copy";

        button.addEventListener("click", async () => {

            const code = block.querySelector("code");

            if (!code) return;

            try {
                await navigator.clipboard.writeText(code.innerText);

                button.textContent = "Copied!";

                setTimeout(() => {
                    button.textContent = "Copy";
                }, 1500);

            } catch (error) {

                button.textContent = "Failed";

                setTimeout(() => {
                    button.textContent = "Copy";
                }, 1500);
            }
        });

        block.style.position = "relative";
        block.appendChild(button);
    });


    /* =====================================================
       3. POINTER VALUE DEMO
       ===================================================== */

    const pointerDemo = document.getElementById("pointerDemo");

    if (pointerDemo) {

        const numberInput = document.getElementById("numberInput");
        const addressOutput = document.getElementById("addressOutput");
        const valueOutput = document.getElementById("valueOutput");

        if (numberInput) {

            numberInput.addEventListener("input", () => {

                const value = numberInput.value;

                if (value === "") {
                    if (valueOutput) valueOutput.textContent = "-";
                    if (addressOutput) addressOutput.textContent = "-";
                    return;
                }

                if (valueOutput) {
                    valueOutput.textContent = value;
                }

                /*
                 * JavaScript does not expose real memory addresses
                 * like C does.
                 *
                 * So this is only a visual simulation.
                 */

                if (addressOutput) {

                    const fakeAddress =
                        "0x" +
                        Math.floor(Math.random() * 0xFFFFFF)
                            .toString(16)
                            .toUpperCase();

                    addressOutput.textContent = fakeAddress;
                }
            });
        }
    }


    /* =====================================================
       4. QUIZ SYSTEM
       ===================================================== */

    const quizButton = document.getElementById("check-quiz");
    const quizResult = document.getElementById("quiz-result");

    if (quizButton && quizResult) {

        const correctAnswers = {
            q1: "B",
            q2: "B",
            q3: "B",
            q4: "C",
            q5: "B",
            q6: "C",
            q7: "B",
            q8: "B",
            q9: "A",
            q10: "D"
        };

        quizButton.addEventListener("click", () => {

            let score = 0;
            let answered = 0;

            Object.entries(correctAnswers).forEach(([question, correct]) => {

                const selected = document.querySelector(
                    `input[name="${question}"]:checked`
                );

                if (selected) {

                    answered++;

                    if (selected.value === correct) {
                        score++;
                    }
                }
            });


            if (answered === 0) {

                quizResult.textContent =
                    "Please answer at least one question.";

                quizResult.className =
                    "quiz-result warning";

                return;
            }


            const percentage =
                Math.round((score / 10) * 100);


            quizResult.textContent =
                `You scored ${score}/10 (${percentage}%). ` +
                `${answered < 10
                    ? `You answered ${answered}/10 questions. `
                    : ""}` +
                (
                    score === 10
                        ? "Perfect score! 🎯"
                        : score >= 7
                            ? "Great job! 🗺️"
                            : score >= 5
                                ? "Good start! Review the pointer concepts and try again."
                                : "Keep practicing! Revisit the pointer sections and try again."
                );


            quizResult.className =
                score >= 7
                    ? "quiz-result correct"
                    : "quiz-result incorrect";


            quizResult.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        });
    }


    /* =====================================================
       5. SHOW / HIDE ANSWERS
       ===================================================== */

    const answerButtons =
        document.querySelectorAll(".show-answer");

    answerButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const answerId =
                button.dataset.target;

            const answer =
                document.getElementById(answerId);

            if (!answer) return;

            const isHidden =
                answer.hidden ||
                answer.style.display === "none";

            if (isHidden) {

                answer.hidden = false;
                answer.style.display = "block";
                button.textContent = "Hide Answer";

            } else {

                answer.hidden = true;
                answer.style.display = "none";
                button.textContent = "Show Answer";
            }

        });

    });


    /* =====================================================
       6. POINTER CONCEPT CARDS
       ===================================================== */

    const conceptCards =
        document.querySelectorAll(".concept-card");

    conceptCards.forEach((card) => {

        card.addEventListener("click", () => {

            card.classList.toggle("active");

        });

    });


    /* =====================================================
       7. BACK TO TOP BUTTON
       ===================================================== */

    let backToTop =
        document.getElementById("back-to-top");

    if (!backToTop) {

        backToTop = document.createElement("button");

        backToTop.id = "back-to-top";
        backToTop.textContent = "↑";

        document.body.appendChild(backToTop);
    }

    backToTop.style.display = "none";


    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            backToTop.style.display = "block";

        } else {

            backToTop.style.display = "none";
        }

    });


    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =====================================================
       8. SCROLL PROGRESS BAR
       ===================================================== */

    let progressBar =
        document.getElementById("scrollProgress");

    if (!progressBar) {

        progressBar =
            document.createElement("div");

        progressBar.id = "scrollProgress";

        document.body.prepend(progressBar);
    }


    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percentage =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;

        progressBar.style.width =
            percentage + "%";

    });


    /* =====================================================
       9. C POINTER OUTPUT DEMO
       ===================================================== */

    const runButtons =
        document.querySelectorAll(".run-code");

    runButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const outputId =
                button.dataset.output;

            const output =
                document.getElementById(outputId);

            if (!output) return;

            output.textContent =
                "Program executed successfully!";

            output.classList.add("show");

        });

    });


    /* =====================================================
       10. POINTER QUIZ - SIMPLE ALERT
       ===================================================== */

    const pointerQuizButton =
        document.getElementById("pointerQuizButton");

    if (pointerQuizButton) {

        pointerQuizButton.addEventListener("click", () => {

            const answer =
                prompt(
                    "What does the * operator do when used with a pointer?"
                );

            if (answer === null) return;

            const normalized =
                answer.toLowerCase().trim();

            if (
                normalized.includes("dereference") ||
                normalized.includes("value") ||
                normalized.includes("access")
            ) {

                alert(
                    "Correct! * is used to dereference a pointer and access the value stored at the address."
                );

            } else {

                alert(
                    "Not quite. The * operator can dereference a pointer to access the value stored at its address."
                );
            }

        });

    }


    /* =====================================================
       11. MEMORY DIAGRAM INTERACTION
       ===================================================== */

    const memoryCells =
        document.querySelectorAll(".memory-cell");

    memoryCells.forEach((cell) => {

        cell.addEventListener("click", () => {

            memoryCells.forEach((otherCell) => {
                otherCell.classList.remove("selected");
            });

            cell.classList.add("selected");

        });

    });


    /* =====================================================
       12. CURRENT SECTION HIGHLIGHTING
       ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        navLinks.forEach((link) => {
                            link.classList.remove("active");
                        });

                        const activeLink =
                            document.querySelector(
                                `nav a[href="#${entry.target.id}"]`
                            );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }
                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach((section) => {
        sectionObserver.observe(section);
    });


    /* =====================================================
       13. SIMPLE DARK MODE
       ===================================================== */

    const themeButton =
        document.getElementById("themeToggle");

    if (themeButton) {

        themeButton.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            if (
                document.body.classList.contains("dark-mode")
            ) {

                themeButton.textContent =
                    "☀ Light Mode";

            } else {

                themeButton.textContent =
                    "🌙 Dark Mode";
            }

        });

    }


    /* =====================================================
       14. WELCOME MESSAGE
       ===================================================== */

    console.log(
        "%cPointers Blog Loaded Successfully!",
        "font-size: 18px; font-weight: bold;"
    );

    console.log(
        "Explore pointers, addresses, dereferencing and memory."
    );

});
