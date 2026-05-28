document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const formData = {
        firstName: params.get("firstName") || "N/A",
        lastName: params.get("lastName") || "N/A",
        jobTitle: params.get("jobTitle") || "N/A",
        email: params.get("email") || "N/A",
        phone: params.get("phoneNumber") || "N/A",
        businessName: params.get("businessName") || "N/A",
        membershipLevel: params.get("membershipLevel") || "N/A",
        timestamp: params.get("submission-timestamp") || new Date().toLocaleString()
    };

    const confirmationCardContainer = document.querySelector("#confirmation-card-hook");

    confirmationCardContainer.innerHTML = `
        <div class="thankyou-card">
            <h1 class="heading-lg">Application Received!</h1>
            <p class="welcome-message">Thank you, <strong>${formData.firstName} ${formData.lastName}</strong>, for submitting your membership application.</p>     

            <div class="card-details-grid">
                <h2 class="heading-md">Submission Summary</h2>
                <p><strong class="upper-spaced">Organization:</strong> ${formData.businessName}</p>
                <p><strong class="upper-spaced">Email Address:</strong> ${formData.email}</p>
                <p><strong class="upper-spaced">Contact Number:</strong> ${formData.phone}</p>
                <p class="timestamp-string"><strong class="upper-spaced">Submitted On:</strong> ${formData.timestamp}</p>
            </div>
            
            <a href="index.html" class="return-home-btn button heading-sm">Return to Homepage</a>
        </div>
    `;
})