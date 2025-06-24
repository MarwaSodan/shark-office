let i = 0;
let j = 0;
let currentString = "";
let isDeleting = false;
let currentLang = localStorage.getItem("lang") || "en";

function type() {
    const strings = translations[currentLang].typewriter;
    const typewriter = document.getElementById("typewriter");

    if (!strings || strings.length === 0 || !typewriter) return;

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

// ✅ تشغيل التايب رايتر بناء على اللغة
function startTypewriter(lang) {
    currentLang = lang;
    i = 0;
    j = 0;
    isDeleting = false;
    type();
}

document.addEventListener("DOMContentLoaded", () => {
    const lang = localStorage.getItem("lang") || "en";
    startTypewriter(lang);
});







// Contact Form Submission
document.getElementById("send_message").addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    if (name === "" || email === "" || message === "") {
        document.querySelector(".empty_notice").style.display = "block";
        return;
    }

    fetch("contact.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
            `ajax_name=${name}&ajax_email=${email}&ajax_message=Phone: ${phone}, Subject: ${subject}, Message: ${message}`,
    }).then(() => {
        document.querySelector(".returnmessage").style.display = "block";
        document.querySelector(".empty_notice").style.display = "none";
        document.getElementById("contact_form").reset();
    });
});

// Subscribe Form Submission
document.querySelector(".shark_tm_subscribe input[type='submit']").addEventListener("click", function (e) {
    e.preventDefault();
    const email = document.querySelector(".shark_tm_subscribe input[type='text']").value;

    if (email === "") return;

    fetch("contact.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
            `ajax_name=Subscriber&ajax_email=${email}&ajax_message=Subscription request.`,
    });
    alert("Thank you! We will contact you soon.");
    document.querySelector(".shark_tm_subscribe input[type='text']").value = "";
});

