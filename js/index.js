
const strings = [
    "Flexible Office Spaces",
    "Virtual Offices",
    "Professional Meeting Rooms",
    "Administrative Support Services"
    // أو بدلهم جمل بالعربي لو حابة
];

let i = 0;
let j = 0;
let currentString = "";
let isDeleting = false;

function type() {
    const typewriter = document.getElementById("typewriter");

    if (i < strings.length) {
        currentString = strings[i];

        if (isDeleting) {
            typewriter.textContent = currentString.substring(0, j--);
        } else {
            typewriter.textContent = currentString.substring(0, j++);
        }

        if (!isDeleting && j === currentString.length + 1) {
            isDeleting = true;
            setTimeout(type, 1500); // انتظار قبل الحذف
            return;
        }

        if (isDeleting && j === 0) {
            isDeleting = false;
            i = (i + 1) % strings.length;
        }

        setTimeout(type, isDeleting ? 50 : 100);
    }
}

document.addEventListener("DOMContentLoaded", type);

