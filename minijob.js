// Sample job data
const jobs = [
    { title: "Frontend Developer", company: "Tech Solutions", location: "Remote" },
    { title: "Backend Developer", company: "Innovate Labs", location: "San Francisco, CA" },
    { title: "Full-Stack Developer", company: "WebCorp", location: "Austin, TX" },
    { title: "UI/UX Designer", company: "DesignHub", location: "New York, NY" },
    { title: "Data Scientist", company: "DataTech", location: "Chicago, IL" },
    { title: "DevOps Engineer", company: "Cloudify", location: "Seattle, WA" },
    { title: "Product Manager", company: "Innovate Labs", location: "San Francisco, CA" },
    { title: "Mobile Developer", company: "AppWorld", location: "Los Angeles, CA" },
    { title: "System Architect", company: "Tech Solutions", location: "Remote" },
    { title: "System Developer", company: "delta Solutions", location: "Remote" },
    { title: "Saleforce Architect", company: "Reshap pvt ltd", location: "Remote" },
    { title: "Software Developer", company: "Tech Solutions", location: "Remote" },
    { title: "System Architect", company: "Reshap pvt ltd", location: "Remote" },

    // Additional jobs for pagination
];

const itemsPerPage = 6;
let currentPage = 1;
let filteredJobs = jobs;

// Render job listings
function renderJobs() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const jobCardsContainer = document.getElementById("job-cards-container");

    jobCardsContainer.innerHTML = "";

    filteredJobs.slice(startIndex, endIndex).forEach(job => {
        const jobCard = document.createElement("div");
        jobCard.classList.add("job-card");
        jobCard.innerHTML = `
            <h3>${job.title}</h3>
            <p>Company: ${job.company}</p>
            <p>Location: ${job.location}</p>
            <button class="apply-button">Apply Now</button>
        `;
        jobCardsContainer.appendChild(jobCard);
    });

    document.getElementById("page-info").textContent = `Page ${currentPage} of ${Math.ceil(filteredJobs.length / itemsPerPage)}`;
}

// Update pagination
function updatePagination() {
    document.getElementById("prev-page").disabled = currentPage === 1;
    document.getElementById("next-page").disabled = currentPage === Math.ceil(filteredJobs.length / itemsPerPage);
}

// Search functionality
function searchJobs() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) || 
        job.company.toLowerCase().includes(searchTerm) || 
        job.location.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // Reset to first page of results
    renderJobs();
    updatePagination();
}

// Event listeners
document.getElementById("search-button").addEventListener("click", searchJobs);
document.getElementById("prev-page").addEventListener("click", () => {
    currentPage--;
    renderJobs();
    updatePagination();
});
document.getElementById("next-page").addEventListener("click", () => {
    currentPage++;
    renderJobs();
    updatePagination();
});

// Initial render
renderJobs();
updatePagination();

document.addEventListener("DOMContentLoaded", function() {
    // Event listeners for opening modals
    document.getElementById("signin-btn").addEventListener("click", function(event) {
        event.preventDefault();
        openModal("signin-modal");
    });

    document.getElementById("register-btn").addEventListener("click", function(event) {
        event.preventDefault();
        openModal("register-modal");
    });

    // Event listener for "Apply Now" buttons
    document.querySelectorAll(".apply-button").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            openModal("apply-modal");
        });
    });

    // Form submissions (dummy submissions for now)
    document.getElementById("apply-form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Application submitted!");
        closeModal("apply-modal");
    });

    document.getElementById("signin-form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Signed in successfully!");
        closeModal("signin-modal");
    });

    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault();
        alert("Registered successfully!");
        closeModal("register-modal");
    });
});

// Function to open a modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Function to close a modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

// Close modal when clicking outside content
window.onclick = function(event) {
    const modals = ["apply-modal", "signin-modal", "register-modal"];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
};
