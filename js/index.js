console.log("Hellow World");

// 1. Views & Page Views (Bar Chart)
const viewsPageViewsCtx = document
    .getElementById("viewsPageViewsChart")
    .getContext("2d");

// Create gradients for the datasets
const visitsGradient = viewsPageViewsCtx.createLinearGradient(0, 0, 0, 400);
visitsGradient.addColorStop(0, "#ff0000"); // Start color
visitsGradient.addColorStop(1, "#320102"); // End color

const pageViewsGradient = viewsPageViewsCtx.createLinearGradient(0, 0, 0, 400);
pageViewsGradient.addColorStop(0, "#FFA600");
pageViewsGradient.addColorStop(1, "#C93400");

const trafficSourceGradient = viewsPageViewsCtx.createLinearGradient(
    0,
    0,
    0,
    400
);
trafficSourceGradient.addColorStop(0, "#FFBC75");
trafficSourceGradient.addColorStop(1, "#FFCC00");

const deviceSourceGradient = viewsPageViewsCtx.createLinearGradient(
    0,
    0,
    0,
    400
);
deviceSourceGradient.addColorStop(0, "#000000");
deviceSourceGradient.addColorStop(1, "#670000");

new Chart(viewsPageViewsCtx, {
    type: "bar",
    data: {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Visits",
                data: [12, 19, 3, 5, 2, 3, 10, 8, 15, 11, 18, 20],
                backgroundColor: visitsGradient,
                borderColor: "transparent",
                borderWidth: 1,
            },
            {
                label: "Page Views",
                data: [15, 10, 13, 6, 9, 7, 14, 12, 20, 16, 25, 22],
                backgroundColor: pageViewsGradient,
                borderColor: "transparent",
                borderWidth: 1,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: true, 
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// 2. Average Time Spent (Line Chart)
const avgTimeSpentCtx = document
    .getElementById("avgTimeSpentChart")
    .getContext("2d");
new Chart(avgTimeSpentCtx, {
    type: "line",
    data: {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "Avg Time Spent (seconds)",
                data: [50, 40, 55, 80, 40, 20, 10, 45, 65, 70, 95, 50],
                borderColor: "#F90101",
                backgroundColor: "transparent",
                fill: true,
                tension: 0.4,
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: (context) => {
                        // Highlight specific grid lines (red for 0, 10, 20, etc.)
                        return context.tick.value % 10 === 0 ? "red" : "rgba(0, 0, 0, 0.1)";
                    },
                    lineWidth: (context) => {
                        // Thicker lines for specific grid lines
                        return context.tick.value % 10 === 0 ? 2 : 1;
                    },
                },
                ticks: {
                    stepSize: 10, // Adjust interval between tick marks
                },
            },
        },
    },
});



// TRAFFIC SOURCE
const ctx = document.getElementById('trafficSourcesChart').getContext('2d');
// Set custom width and height for the Traffic Source Chart
// const trafficSourcesChartCanvas = document.getElementById('trafficSourcesChart');
// trafficSourcesChartCanvas.width = 560;  // Custom width
// trafficSourcesChartCanvas.height = 400; // Custom height

// Chart Data for Traffic Source
const data = {
    labels: ['Social', 'Organic', 'Direct', 'Referral'],
    datasets: [{
        data: [161.78, 115.61, 145.81, 107.07],
        backgroundColor: [visitsGradient, deviceSourceGradient, trafficSourceGradient, pageViewsGradient],
        hoverOffset: 4,
    }]
};

// Chart Options for Traffic Source
const options = {
    responsive: true,
    maintainAspectRatio:true,
    plugins: {
        legend: {
            display: false, // Hide the default legend
        },
        tooltip: {
            enabled: false, // Disable tooltips
        },
    },
    layout: {
        padding: {
            top: 0,      // Top padding
            right: 120,  // Right padding
            bottom: 20, // Bottom padding
            left: 120,   // Left padding
        },
    },
    
    cutout: '63%', // Adjusts the doughnut hole size
};

// Custom Plugin for Traffic Source Chart
const customPlugin = {
    id: 'customPlugin',
    beforeDraw(chart) {
        const ctx = chart.ctx;
        const chartArea = chart.chartArea;
        const meta = chart.getDatasetMeta(0);
        const dataset = chart.data.datasets[0];
        const total = dataset.data.reduce((sum, value) => sum + value, 0);
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;

        // Draw the central value
        ctx.save();
        ctx.font = 'bold 60px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('540', centerX, centerY); // Central value
        ctx.restore();

        const horizontalOffset = 95; // Adjust this to make the horizontal line longer

        meta.data.forEach((slice, index) => {
            const angle = (slice.startAngle + slice.endAngle) / 2;
            const x1 = centerX + (slice.outerRadius * Math.cos(angle));
            const y1 = centerY + (slice.outerRadius * Math.sin(angle));
            const x2 = centerX + ((slice.outerRadius + 30) * Math.cos(angle));
            const y2 = centerY + ((slice.outerRadius + 30) * Math.sin(angle));

            // Define horizontal line position with a single offset
            const horizontalLineX = x2 + (x2 > centerX ? horizontalOffset : -horizontalOffset);
            const horizontalLineY = y2;

            // Draw connector lines
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(horizontalLineX, horizontalLineY);
            ctx.strokeStyle = slice.options.backgroundColor;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();

            // Draw the label text
            const value = dataset.data[index];
            const percentage = ((value / total) * 100).toFixed(2);
            ctx.save();

            // Adjust font size for the label text (larger font for the label)
            ctx.font = 'bold 2vw Arial'; // Larger font size for the label
            ctx.fillStyle = '#000'; // Color for the label text
            ctx.textAlign = x2 > centerX ? 'right' : 'left'; // Left or right based on position
            ctx.textBaseline = 'middle';
            const textX = horizontalLineX + (x2 > centerX ? 3.2 : 0);
            const textY = horizontalLineY - 15;

            // Draw the label (name of the slice)
            ctx.fillText(`${chart.data.labels[index]} `, textX, textY);

            // Adjust font size back for value and percentage (smaller font size)
            ctx.font = '1.2vw Arial'; // Smaller font size for value and percentage
            ctx.fillStyle = slice.options.backgroundColor; // Color for value and percentage

            // Draw value and percentage in slice color, with the same alignment as the label
            ctx.fillText(`${value}`, textX, textY + 25);
            ctx.fillText(`${percentage}%`, textX, textY + 40);

            ctx.restore();
        });
    }
};

// Initialize Traffic Source Chart
const customDoughnutChart = new Chart(ctx, {
    type: 'doughnut',
    data,
    options,
    plugins: [customPlugin],
});

// DEVICE VISIT

const visitByDeviceCtx = document.getElementById('visitsByDeviceChart').getContext('2d');
// Set custom width and height for the Device Visit Chart
// const visitsByDeviceChartCanvas = document.getElementById('visitsByDeviceChart');
// visitsByDeviceChartCanvas.width = 560;  // Custom width
// visitsByDeviceChartCanvas.height = 400; // Custom height
// Chart Data for Device Visit
const Vdata = {
    labels: ['Mobile', 'Desktop'],
    datasets: [{
        data: [183.98, 133.09],
        backgroundColor: [visitsGradient, trafficSourceGradient],
        hoverOffset: 4,
    }]
};

// Chart Options for Device Visit
const Voptions = {
    responsive: true, // Disable responsiveness
    maintainAspectRatio: true, // Disable aspect ratio maintenance
    plugins: {
        legend: {
            display: false, // Hide the default legend
        },
        tooltip: {
            enabled: false, // Disable tooltips
        },
    },
    layout: {
        padding: {
            top: 0,      // Top padding
            right: 122,  // Right padding
            bottom: 0, // Bottom padding
            left: 120,   // Left padding
        },
    },
    
    cutout: '63%', // Adjusts the doughnut hole size
};

// Initialize Device Visit Chart
const vcustomDoughnutChart = new Chart(visitByDeviceCtx, {
    type: 'doughnut',
    data: Vdata,
    options: Voptions,
    plugins: [customPlugin], // Use the same custom plugin
});










