const editor = CodeMirror(document.getElementById("editor"), {
    mode: "python",
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    theme: "default",
});

// Display sections based on button clicks
const btnFrontend = document.getElementById("frontend");
const btnPython = document.getElementById("python");
const firstSection = document.querySelector(".first");
const secondSection = document.querySelector(".second");


btnPython.addEventListener("click", () => {
    firstSection.style.display = "none";
    secondSection.style.display = "block";
    btnPython.classList.add("active");
    btnFrontend.classList.remove("active");
});

// Run Python code using Skulpt
function runCode() {
    const code = editor.getValue(); // Get the code from CodeMirror editor
    const outputElement = document.getElementById("output");
    outputElement.textContent = ""; // Clear previous output

    Sk.configure({
        output: (text) => (outputElement.textContent += text),
        read: (filename) => {
            if (!Sk.builtinFiles || !Sk.builtinFiles["files"][filename]) {
                throw new Error("File not found: " + filename);
            }
            return Sk.builtinFiles["files"][filename];
        },
    });

    Sk.misceval
        .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code))
        .catch((error) => {
            outputElement.textContent = "Error: " + error.message;
        });
}
document.addEventListener('DOMContentLoaded', function() {
    const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html'), {
        mode: 'htmlmixed',
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'default'
    });

    const cssEditor = CodeMirror.fromTextArea(document.getElementById('css'), {
        mode: 'css',
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'default'
    });

    const jsEditor = CodeMirror.fromTextArea(document.getElementById('js'), {
        mode: 'javascript',
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'default'
    });

    const outputFrame = document.getElementById('output2');

    function updateOutput() {
        const htmlCode = htmlEditor.getValue();
        const cssCode = `<style>${cssEditor.getValue()}</style>`;
        const jsCode = `<script>${jsEditor.getValue()}</script>`;
        const output = outputFrame.contentDocument;

        output.open();
        output.write(htmlCode + cssCode + jsCode);
        output.close();

        // Save code to localStorage
        localStorage.setItem('htmlCode', htmlCode);
        localStorage.setItem('cssCode', cssEditor.getValue());
        localStorage.setItem('jsCode', jsEditor.getValue());
    }

    function loadCode() {
        const savedHtmlCode = localStorage.getItem('htmlCode');
        const savedCssCode = localStorage.getItem('cssCode');
        const savedJsCode = localStorage.getItem('jsCode');

        if (savedHtmlCode) htmlEditor.setValue(savedHtmlCode);
        if (savedCssCode) cssEditor.setValue(savedCssCode);
        if (savedJsCode) jsEditor.setValue(savedJsCode);

        updateOutput();
    }

    loadCode();

    htmlEditor.on('change', updateOutput);
    cssEditor.on('change', updateOutput);
    jsEditor.on('change', updateOutput);
});

// choose option

let btn1 = document.querySelector("#frontend");
let btn2 = document.querySelector("#python");
let backbtn = document.querySelectorAll(".backtoHome");
let third= document.querySelector(".third");
let first = document.querySelector(".first");
let second = document.querySelector(".second");

btn1.addEventListener("click",()=>{
    let third= document.querySelector(".third");

    third.style.visibility = "visible";

    let first = document.querySelector(".first");
    first.style.display = "none";
})

btn2.addEventListener("click",()=>{
    let third= document.querySelector(".third");
    third.style.visibility = "hidden";
    let second = document.querySelector(".second");
    second.style.display = "block";
    let first = document.querySelector(".first");
    first.style.display = "none";
})

document.addEventListener("DOMContentLoaded" , ()=>{
    backbtn.addEventListener("click",()=>{
        location.reload();
        alert("clicked");
    })
})











