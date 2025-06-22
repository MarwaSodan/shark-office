<?php
$php_main_email = "officeshark93@gmail.com";

// Receive data
$php_name = $_POST['ajax_name'] ?? 'No Name';
$php_email = $_POST['ajax_email'] ?? '';
$php_message = $_POST['ajax_message'] ?? '';

// Email filtering and verification
$php_email = filter_var($php_email, FILTER_SANITIZE_EMAIL);

if (filter_var($php_email, FILTER_VALIDATE_EMAIL)) {
    $php_subject = "Message from Shark Office Website";

    $php_headers = 'MIME-Version: 1.0' . "\r\n";
    $php_headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
    $php_headers .= 'From:' . $php_email . "\r\n";
    $php_headers .= 'Cc:' . $php_email . "\r\n";

    $php_template = "
        <div style='padding:20px; font-family:Arial;'>
            <h2>Contact Request</h2>
            <p><strong>Name:</strong> {$php_name}</p>
            <p><strong>Email:</strong> {$php_email}</p>
            <p><strong>Message:</strong><br>{$php_message}</p>
        </div>
    ";

    $php_sendmessage = wordwrap($php_template, 70);

    mail($php_main_email, $php_subject, $php_sendmessage, $php_headers);
    echo "Message sent successfully";
} else {
    echo "Invalid email address";
}
?>
