# Student Enrollment Form using JsonPowerDB

## Table of Contents
- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Scope of Functionalities](#scope-of-functionalities)
- [Release History](#release-history)
- [Tech Stack](#tech-stack)
- [Sources](#sources)

---

## Description
A web-based **Student Enrollment Form** built as a micro-project using **JsonPowerDB (JPDB)**, HTML5, Bootstrap, jQuery, and JavaScript. The application stores, retrieves, and updates student records in the `STUDENT-TABLE` relation inside the `SCHOOL-DB` database using `Roll-No` as the Primary Key.

### Database Schema (`SCHOOL-DB` -> `STUDENT-TABLE`)
- **Roll-No** *(Primary Key)*
- **Full-Name**
- **Class**
- **Birth-Date**
- **Address**
- **Enrollment-Date**

---

## Benefits of using JsonPowerDB
- **Proprietary JPDB Engine:** High-performance, lightweight, real-time, and serverless database engine.
- **Schema-Free & Multi-Mode:** Supports document, key-value, and relational-style data modeling without rigid schema overhead.
- **Simple REST APIs (`jpdb-commons.js`):** Built-in JavaScript helper methods (`GET_BY_KEY`, `PUT`, `UPDATE`) minimize backend boilerplate and development time.
- **Zero Server-Side Coding:** Direct browser-to-database communication eliminates the need for complex middleware or ORM setup.
- **Built-in Web Dashboard:** Easy data visualization, debugging, and record management through the JPDB browser interface.

---

## Scope of Functionalities
- **Initial State & Reset:** On page load or clicking **Reset**, all fields are cleared, only the **Roll No** primary key input is active and focused, and all other fields and buttons (**Save**, **Update**, **Reset**) remain disabled.
- **New Record Entry (Save):** Entering a non-existent `Roll-No` unlocks the remaining fields, enables **Save** and **Reset**, validates against empty fields, and inserts the new record into `SCHOOL-DB`.
- **Existing Record Modification (Update):** Entering an existing `Roll-No` automatically populates the form with stored data, keeps `Roll-No` locked, enables **Update** and **Reset**, and saves modified values back to the database.

---

## Release History
- **v1.0.0 (November 2026):**
  - Initial release of the Student Enrollment Form (`index.html` and `index.js`) on GitHub.
  - Integrated JsonPowerDB `GET_BY_KEY`, `PUT`, and `UPDATE` operations with form validation and state controls.

---

## Tech Stack
- **Frontend:** HTML5, Bootstrap 3, JavaScript, jQuery
- **Database:** JsonPowerDB (JPDB)

---

## Sources
- [JsonPowerDB Official Documentation](https://login2explore.com/jpdb/docs.html)
- [Login2Explore JPDB Course & Tutorials](https://careers.login2explore.com/)
