// Store volunteer data
let volunteers = [];

function addVolunteer() {
    const name = document.getElementById('volunteerName').value;
    const date = document.getElementById('eventDate').value;
    const contact = document.getElementById('contactInfo').value;
    const hours = document.getElementById('hoursServed').value;
    const serviceType = document.getElementById('serviceType').value;
    
    if (!name || !date) {
        alert('Please enter at least a name and date');
        return;
    }
    
    const volunteer = {
        id: Date.now(), // Simple unique ID
        name,
        date,
        contact,
        hours,
        serviceType,
        timestamp: new Date().toISOString()
    };
    
    volunteers.push(volunteer);
    updateVolunteerTable();
    clearForm();
}

function updateVolunteerTable() {
    const tableBody = document.querySelector('#volunteerTable tbody');
    tableBody.innerHTML = '';
    
    const selectedDate = document.getElementById('eventDate').value;
    const todaysVolunteers = volunteers.filter(v => v.date === selectedDate);
    
    todaysVolunteers.forEach(volunteer => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${volunteer.name}</td>
            <td>${volunteer.contact || 'N/A'}</td>
            <td>${volunteer.hours}</td>
            <td>${volunteer.serviceType}</td>
            <td>
                <button onclick="editVolunteer(${volunteer.id})">Edit</button>
                <button onclick="deleteVolunteer(${volunteer.id})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('volunteerName').value = '';
    document.getElementById('contactInfo').value = '';
    document.getElementById('hoursServed').value = '1';
}

function deleteVolunteer(id) {
    if (confirm('Are you sure you want to delete this volunteer record?')) {
        volunteers = volunteers.filter(v => v.id !== id);
        updateVolunteerTable();
    }
}

function editVolunteer(id) {
    const volunteer = volunteers.find(v => v.id === id);
    if (volunteer) {
        document.getElementById('volunteerName').value = volunteer.name;
        document.getElementById('eventDate').value = volunteer.date;
        document.getElementById('contactInfo').value = volunteer.contact;
        document.getElementById('hoursServed').value = volunteer.hours;
        document.getElementById('serviceType').value = volunteer.serviceType;
        
        // Remove the old entry
        volunteers = volunteers.filter(v => v.id !== id);
    }
}



// Modify addVolunteer and deleteVolunteer to call saveVolunteers()
// Add this to the script initialization
window.addEventListener('DOMContentLoaded', () => {
    loadVolunteers();
});

    // Initialize with today's date
    document.getElementById('eventDate').valueAsDate = new Date();
function generateReport() {
    const selectedDate = document.getElementById('eventDate').value;
    const todaysVolunteers = volunteers.filter(v => v.date === selectedDate);
    
    if (todaysVolunteers.length === 0) {
        alert('No volunteers recorded for this date');
        return;
    }
    
    let report = `Volunteer Report for ${selectedDate}\n\n`;
    report += `Total Volunteers: ${todaysVolunteers.length}\n`;
    report += `Total Hours: ${todaysVolunteers.reduce((sum, v) => sum + parseFloat(v.hours), 0)}\n\n`;
    
    todaysVolunteers.forEach((v, i) => {
        report += `${i+1}. ${v.name} - ${v.hours} hours (${v.serviceType})\n`;
    });
    
    // For a real app, you might want to create a downloadable file
    console.log(report);
    alert(report);
}

// Add this button to your HTML:
// <button onclick="generateReport()">Generate Report</button>
