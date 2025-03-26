document.addEventListener("DOMContentLoaded", function () {
    console.log("This is a web application - Contact Manager using JS, HTML, CSS, Bootstrap.. \nwhich stores the result in localStorage..");

    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");
    const navSearchInput = document.getElementById("navSearch");
    document.getElementById("navSearch").addEventListener("input", searchContacts);


    function loadContacts() {
        contactList.innerHTML = "";
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.forEach((contact, index) => {
            const li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            li.innerHTML = `${contact.name} - ${contact.contact} 
                <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Delete</button>`;
            contactList.appendChild(li);
        });
    }

    function searchContacts() {
        let searchText = document.getElementById("navSearch").value.toLowerCase(); // Get search input value
        let contacts = JSON.parse(localStorage.getItem("contacts")) || []; // Get contacts from localStorage
        let contactList = document.getElementById("contactList"); // Get contact list container
    
        contactList.innerHTML = ""; // Clear current list
    
        // Filter contacts and display only matching ones
        contacts.forEach((contact, index) => {
            if (contact.name.toLowerCase().includes(searchText) || contact.contact.includes(searchText)) {
                const li = document.createElement("li");
                li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
                li.innerHTML = `${contact.name} - ${contact.contact} 
                    <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Delete</button>`;
                contactList.appendChild(li);
            }
        });
    }
    

    function saveContact(event) {
        event.preventDefault();
        let name = document.getElementById("name").value;
        let contact = document.getElementById("contact").value;

        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push({ name, contact });
        localStorage.setItem("contacts", JSON.stringify(contacts));
        contactForm.reset();
        loadContacts();
        // Show success message
        let successMessage = document.getElementById("successMessage");
        successMessage.classList.remove("d-none");

        // Hide message after 3 seconds
        setTimeout(() => {
            successMessage.classList.add("d-none");
        }, 3000);
    }

    window.deleteContact = function(index) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        loadContacts();
    };

    // Attach an event listener to update search results dynamically
    navSearchInput.addEventListener("input", searchContacts);

    contactForm.addEventListener("submit", saveContact);
    loadContacts();
});
