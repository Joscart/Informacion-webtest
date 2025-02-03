document.addEventListener('DOMContentLoaded', function() {
    console.log('Teamers page loaded');
    
    // Function to update clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        
        document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Update the clock display every second
    setInterval(updateClock, 1000);
    updateClock(); // Initial call to display clock immediately

    // Tab switching functionality
    const tabs = document.querySelectorAll('nav a');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            tabContents.forEach(content => content.classList.remove('active'));
            target.classList.add('active');

            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Activate the first tab by default
    tabs[0].click();
});

