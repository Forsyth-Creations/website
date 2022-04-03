---
layout: page
title: Contact Me
show_sidebar: false
---

## Use the form below to contact me! Or reach out to me here: contact@forsythcreations.com

<hr>

<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

input[type=text], select, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #04AA6D;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

</style>


<form
  action="https://formspree.io/f/mayvdalk"
  method="POST"
>
<label for="fname">First Name</label>
    <input type="text" id="fname" name="firstname" placeholder="Your name..">

    <label for="lname">Last Name</label>
    <input type="text" id="lname" name="lastname" placeholder="Your last name..">

    <label for="Type">What are you contacting about?</label>
    <select id="selector" name="selector">
        <option value="" disabled selected>Select one of the following...</option>
      <option value="help">General Help</option>
      <option value="consultation">Scheduling a Consultation</option>
      <option value="general">General Inquiry</option>
    </select>

    <label for="subject">Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
    <input type="submit" value="Submit">
</form>


