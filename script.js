// ===== Theme Toggle Functionality =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update charts with new theme colors
    updateChartColors();
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// ===== Get Theme Colors =====
function getThemeColors() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    return {
        textPrimary: isDark ? '#F1F5F9' : '#1F2937',
        textSecondary: isDark ? '#94A3B8' : '#6B7280',
        borderColor: isDark ? '#334155' : '#E4E9F0',
        gridColor: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(228, 233, 240, 0.5)',
        blue: '#4A90E2'
    };
}

// ===== Main Trend Chart =====
const trendCtx = document.getElementById('trendChart').getContext('2d');
let trendChart;

function createTrendChart() {
    const colors = getThemeColors();
    
    // Generate sample data for 12-hour trend
    const labels = [];
    const data = [];
    const baseValue = 100;
    
    for (let i = 0; i <= 12; i++) {
        labels.push(i === 0 ? '8' : i === 3 ? '11' : i === 6 ? '14-3m' : i === 9 ? '17-25' : i === 12 ? '12 am' : '');
        // Generate smooth wave pattern
        data.push(baseValue + Math.sin(i * 0.5) * 15 + Math.random() * 5);
    }
    
    if (trendChart) {
        trendChart.destroy();
    }
    
    trendChart = new Chart(trendCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Trend',
                data: data,
                borderColor: colors.blue,
                backgroundColor: 'rgba(74, 144, 226, 0.08)',
                borderWidth: 2.5,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: colors.blue,
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: colors.gridColor,
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        color: colors.textSecondary,
                        font: {
                            size: 10,
                            weight: '500'
                        },
                        padding: 8
                    }
                },
                y: {
                    min: 80,
                    max: 125,
                    grid: {
                        display: true,
                        color: colors.gridColor,
                        drawBorder: false,
                        lineWidth: 1
                    },
                    ticks: {
                        color: colors.textSecondary,
                        font: {
                            size: 10,
                            weight: '500'
                        },
                        stepSize: 10,
                        padding: 8
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

// ===== Mini Chart =====
const miniCtx = document.getElementById('miniChart').getContext('2d');
let miniChart;

function createMiniChart() {
    const colors = getThemeColors();
    
    // Generate sample data
    const labels = Array.from({length: 12}, (_, i) => '');
    const data = Array.from({length: 12}, () => 3 + Math.random() * 3);
    
    if (miniChart) {
        miniChart.destroy();
    }
    
    miniChart = new Chart(miniCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderColor: colors.blue,
                backgroundColor: 'rgba(74, 144, 226, 0.08)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false,
                    min: 0,
                    max: 8
                }
            }
        }
    });
}

// ===== Update Chart Colors on Theme Change =====
function updateChartColors() {
    createTrendChart();
    createMiniChart();
}

// ===== Initialize Charts =====
createTrendChart();
createMiniChart();

// ===== Gauge Animations =====
function animateGauges() {
    const gauges = document.querySelectorAll('.gauge-needle');
    
    gauges.forEach((needle, index) => {
        // Different rotation angles for each gauge based on their values
        const rotations = [45, 75, 95, 135, 95]; // Degrees for each gauge
        setTimeout(() => {
            needle.style.transform = `rotate(${rotations[index]}deg)`;
        }, 100 * index);
    });
}

// Animate gauges on page load
window.addEventListener('load', () => {
    animateGauges();
});

// ===== Smooth Scroll for View All Button =====
const viewAllBtn = document.querySelector('.view-all-btn');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
        // Placeholder for view all functionality
        console.log('View all insights clicked');
    });
}

// ===== Action Button Handlers =====
const confirmBtn = document.querySelector('.action-btn.confirm');
const callBtn = document.querySelector('.action-btn.call');
const dismissBtn = document.querySelector('.action-btn.dismiss');
const primaryActionBtn = document.querySelector('.action-btn.primary');

if (primaryActionBtn) {
    primaryActionBtn.addEventListener('click', () => {
        showNotification('Initiating Surface Blowdown...', 'info');
        primaryActionBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        primaryActionBtn.disabled = true;
        
        setTimeout(() => {
            primaryActionBtn.innerHTML = '<i class="fas fa-check"></i> Blowdown Initiated';
            primaryActionBtn.style.background = '#27AE60';
            showNotification('Surface blowdown successfully initiated!', 'success');
        }, 2000);
    });
}

if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
        showNotification('Action confirmed! Monitoring system activated.', 'success');
        confirmBtn.innerHTML = '<i class="fas fa-check"></i> Confirmed';
        confirmBtn.disabled = true;
    });
}

if (callBtn) {
    callBtn.addEventListener('click', () => {
        showNotification('Calling engineer... Please wait.', 'info');
        callBtn.innerHTML = '<i class="fas fa-phone fa-shake"></i> Calling...';
        
        setTimeout(() => {
            showNotification('Engineer notified successfully!', 'success');
            callBtn.innerHTML = '<i class="fas fa-check"></i> Called';
        }, 2000);
    });
}

if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
        const alertBox = document.querySelector('.alert-box');
        if (alertBox) {
            showNotification('Alert dismissed', 'info');
            alertBox.style.transition = 'all 0.3s ease';
            alertBox.style.opacity = '0';
            alertBox.style.transform = 'scale(0.95)';
            setTimeout(() => {
                alertBox.style.display = 'none';
            }, 300);
        }
    });
}

// ===== Notification System =====
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotif = document.querySelector('.custom-notification');
    if (existingNotif) {
        existingNotif.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Download PDF Button =====
const downloadBtns = document.querySelectorAll('.download-btn');
downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const btnText = btn.textContent.trim();
        const originalHTML = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Generated!';
            showNotification(btnText.includes('PDF') ? 'PDF report downloaded successfully!' : 'Report generated successfully!', 'success');
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
});

// ===== Plant Selector =====
const plantSelector = document.querySelector('.plant-selector');
const plants = [
    'Boiler 1 - Textile Plant',
    'Boiler 2 - Textile Plant',
    'Boiler 3 - Chemical Plant',
    'Boiler 4 - Food Processing'
];

if (plantSelector) {
    plantSelector.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remove existing dropdown
        const existingDropdown = document.querySelector('.plant-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }
        
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'plant-dropdown';
        
        plants.forEach(plant => {
            const option = document.createElement('div');
            option.className = 'plant-option';
            option.innerHTML = `<i class="fas fa-industry"></i> ${plant}`;
            option.addEventListener('click', () => {
                plantSelector.querySelector('span').textContent = plant;
                dropdown.remove();
                showNotification(`Switched to ${plant}`, 'success');
            });
            dropdown.appendChild(option);
        });
        
        plantSelector.appendChild(dropdown);
        
        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown() {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            });
        }, 10);
    });
}

// ===== User Profile =====
const userProfile = document.querySelector('.user-profile');
if (userProfile) {
    userProfile.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remove existing dropdown
        const existingDropdown = document.querySelector('.profile-dropdown');
        if (existingDropdown) {
            existingDropdown.remove();
            return;
        }
        
        // Create dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'profile-dropdown';
        dropdown.innerHTML = `
            <div class="profile-dropdown-header">
                <img src="https://ui-avatars.com/api/?name=Amit+Sharma&background=2F80ED&color=fff" alt="User">
                <div>
                    <div class="profile-name">Amit Sharma</div>
                    <div class="profile-role">Plant Manager</div>
                </div>
            </div>
            <div class="profile-divider"></div>
            <div class="profile-option"><i class="fas fa-user"></i> My Profile</div>
            <div class="profile-option"><i class="fas fa-cog"></i> Settings</div>
            <div class="profile-option"><i class="fas fa-bell"></i> Notifications</div>
            <div class="profile-option"><i class="fas fa-question-circle"></i> Help & Support</div>
            <div class="profile-divider"></div>
            <div class="profile-option logout"><i class="fas fa-sign-out-alt"></i> Logout</div>
        `;
        
        userProfile.style.position = 'relative';
        userProfile.appendChild(dropdown);
        
        // Add click handlers to options
        dropdown.querySelectorAll('.profile-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const text = option.textContent.trim();
                showNotification(`${text} clicked`, 'info');
                dropdown.remove();
            });
        });
        
        // Close dropdown when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeDropdown() {
                dropdown.remove();
                document.removeEventListener('click', closeDropdown);
            });
        }, 10);
    });
}

// ===== Notification Button =====
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Remove existing panel
        const existingPanel = document.querySelector('.notification-panel');
        if (existingPanel) {
            existingPanel.remove();
            return;
        }
        
        // Create notification panel
        const panel = document.createElement('div');
        panel.className = 'notification-panel';
        panel.innerHTML = `
            <div class="notification-panel-header">
                <h3>Notifications</h3>
                <span class="notification-count">2 New</span>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon warning">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">Foaming Risk Detected</div>
                    <div class="notification-text">TDS increased by 18% in 2 hours</div>
                    <div class="notification-time">5 minutes ago</div>
                </div>
            </div>
            <div class="notification-item unread">
                <div class="notification-icon info">
                    <i class="fas fa-info-circle"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">Maintenance Reminder</div>
                    <div class="notification-text">Scheduled maintenance in 2 days</div>
                    <div class="notification-time">1 hour ago</div>
                </div>
            </div>
            <div class="notification-item">
                <div class="notification-icon success">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">System Optimized</div>
                    <div class="notification-text">Efficiency improved to 91.2%</div>
                    <div class="notification-time">3 hours ago</div>
                </div>
            </div>
            <div class="notification-panel-footer">
                <button class="view-all-notif">View All Notifications</button>
            </div>
        `;
        
        notificationBtn.style.position = 'relative';
        notificationBtn.appendChild(panel);
        
        // Mark as read when clicked
        panel.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.remove('unread');
                showNotification('Notification marked as read', 'info');
            });
        });
        
        // Close panel when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closePanel() {
                panel.remove();
                document.removeEventListener('click', closePanel);
            });
        }, 10);
    });
}

// ===== Real-time Data Simulation =====
let dataUpdateInterval;
let chartUpdateInterval;

// Boiler data state
const boilerData = {
    efficiency: 91.2,
    riskIndex: 'Low',
    blowdownRate: 14,
    savingsToday: 5430,
    pH: 8.9,
    tds: 953,
    turbidity: 58,
    temperature: 184,
    pressure: 5.2,
    healthScore: 86
};

// Update KPI values with animation
function updateKPIValues() {
    // Efficiency (90-95%)
    boilerData.efficiency += (Math.random() - 0.5) * 0.3;
    boilerData.efficiency = Math.max(90, Math.min(95, boilerData.efficiency));
    
    // Blowdown Rate (12-16%)
    boilerData.blowdownRate += (Math.random() - 0.5) * 0.2;
    boilerData.blowdownRate = Math.max(12, Math.min(16, boilerData.blowdownRate));
    
    // Savings (fluctuate ±200)
    boilerData.savingsToday += Math.floor((Math.random() - 0.5) * 400);
    boilerData.savingsToday = Math.max(4000, Math.min(7000, boilerData.savingsToday));
    
    // Update DOM
    const efficiencyEl = document.querySelector('.kpi-card:nth-child(1) .kpi-value');
    if (efficiencyEl) {
        efficiencyEl.innerHTML = `${boilerData.efficiency.toFixed(1)}<span class="kpi-unit">%</span>`;
    }
    
    const blowdownEl = document.querySelector('.kpi-card:nth-child(3) .kpi-value');
    if (blowdownEl) {
        blowdownEl.innerHTML = `${boilerData.blowdownRate.toFixed(0)}<span class="kpi-unit">%</span>`;
    }
    
    const savingsEl = document.querySelector('.kpi-card:nth-child(4) .kpi-value');
    if (savingsEl) {
        savingsEl.textContent = `₹ ${boilerData.savingsToday.toLocaleString('en-IN')}`;
    }
}

// Update gauge values and needles
function updateGaugeValues() {
    // pH (8.5-9.5)
    boilerData.pH += (Math.random() - 0.5) * 0.1;
    boilerData.pH = Math.max(8.5, Math.min(9.5, boilerData.pH));
    
    // TDS (900-1000)
    boilerData.tds += (Math.random() - 0.5) * 10;
    boilerData.tds = Math.max(900, Math.min(1000, boilerData.tds));
    
    // Turbidity (50-70)
    boilerData.turbidity += (Math.random() - 0.5) * 2;
    boilerData.turbidity = Math.max(50, Math.min(70, boilerData.turbidity));
    
    // Temperature (180-190)
    boilerData.temperature += (Math.random() - 0.5) * 1;
    boilerData.temperature = Math.max(180, Math.min(190, boilerData.temperature));
    
    // Pressure (5.0-5.5)
    boilerData.pressure += (Math.random() - 0.5) * 0.05;
    boilerData.pressure = Math.max(5.0, Math.min(5.5, boilerData.pressure));
    
    // Update gauge displays
    const gaugeValues = document.querySelectorAll('.gauge-value');
    if (gaugeValues[0]) gaugeValues[0].textContent = boilerData.pH.toFixed(1);
    if (gaugeValues[1]) gaugeValues[1].textContent = Math.round(boilerData.tds);
    if (gaugeValues[2]) gaugeValues[2].textContent = Math.round(boilerData.turbidity);
    if (gaugeValues[3]) gaugeValues[3].innerHTML = `${Math.round(boilerData.temperature)}°`;
    if (gaugeValues[4]) gaugeValues[4].innerHTML = `${boilerData.pressure.toFixed(1)}<span style="font-size: 14px;">bar</span>`;
    
    // Update gauge needles
    updateGaugeNeedles();
}

// Update gauge needle positions based on values
function updateGaugeNeedles() {
    const needles = document.querySelectorAll('.gauge-needle');
    
    // pH: 0-14 scale, value ~8.9, show at ~45 degrees
    const pHAngle = ((boilerData.pH - 0) / 14) * 180 - 90;
    if (needles[0]) needles[0].style.transform = `rotate(${pHAngle}deg)`;
    
    // TDS: 100-2000 scale, value ~953
    const tdsAngle = ((boilerData.tds - 100) / 1900) * 180 - 90;
    if (needles[1]) needles[1].style.transform = `rotate(${tdsAngle}deg)`;
    
    // Turbidity: 0-100 scale, value ~58
    const turbidityAngle = (boilerData.turbidity / 100) * 180 - 90;
    if (needles[2]) needles[2].style.transform = `rotate(${turbidityAngle}deg)`;
    
    // Temperature: 100-200 scale, value ~184
    const tempAngle = ((boilerData.temperature - 100) / 100) * 180 - 90;
    if (needles[3]) needles[3].style.transform = `rotate(${tempAngle}deg)`;
    
    // Pressure: 0-8 scale, value ~5.2
    const pressureAngle = (boilerData.pressure / 8) * 180 - 90;
    if (needles[4]) needles[4].style.transform = `rotate(${pressureAngle}deg)`;
}

// Update health score
function updateHealthScore() {
    boilerData.healthScore += (Math.random() - 0.5) * 2;
    boilerData.healthScore = Math.max(80, Math.min(95, boilerData.healthScore));
    
    const scoreNumber = document.querySelector('.score-number');
    if (scoreNumber) {
        scoreNumber.textContent = Math.round(boilerData.healthScore);
    }
    
    // Update circle progress
    const healthCircle = document.querySelector('.health-circle circle:last-child');
    if (healthCircle) {
        const circumference = 534;
        const offset = circumference - (boilerData.healthScore / 100) * circumference;
        healthCircle.style.strokeDashoffset = offset;
    }
}

// Add new data point to chart
function updateChartData() {
    if (!trendChart) return;
    
    const newValue = 100 + Math.sin(Date.now() / 10000) * 15 + Math.random() * 5;
    
    // Add new data point
    trendChart.data.datasets[0].data.push(newValue);
    trendChart.data.labels.push('');
    
    // Remove old data if more than 13 points
    if (trendChart.data.datasets[0].data.length > 13) {
        trendChart.data.datasets[0].data.shift();
        trendChart.data.labels.shift();
    }
    
    trendChart.update('none'); // Update without animation for smooth real-time feel
}

// Start all real-time updates
function startRealTimeUpdates() {
    // Update KPIs every 3 seconds
    dataUpdateInterval = setInterval(() => {
        updateKPIValues();
        updateGaugeValues();
        updateHealthScore();
    }, 3000);
    
    // Update chart every 2 seconds
    chartUpdateInterval = setInterval(() => {
        updateChartData();
    }, 2000);
}

// Stop real-time updates
function stopRealTimeUpdates() {
    if (dataUpdateInterval) clearInterval(dataUpdateInterval);
    if (chartUpdateInterval) clearInterval(chartUpdateInterval);
}

// Start real-time simulation
startRealTimeUpdates();

// ===== Responsive Chart Resize =====
window.addEventListener('resize', () => {
    if (trendChart) {
        trendChart.resize();
    }
    if (miniChart) {
        miniChart.resize();
    }
});

// ===== Add Hover Effects to Cards =====
const cards = document.querySelectorAll('.kpi-card, .gauge-card, .info-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ===== Console Welcome Message =====
console.log('%c BoilerGuard IoT Dashboard ', 'background: linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%); color: white; font-size: 16px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
console.log('%c Predictive Boiler Health Monitoring System ', 'color: #2F80ED; font-size: 12px; font-weight: 600;');


// ===== Control Panel for Real-time Updates =====
function createControlPanel() {
    const controlPanel = document.createElement('div');
    controlPanel.className = 'control-panel';
    controlPanel.innerHTML = `
        <button class="control-btn" id="pauseBtn" title="Pause real-time updates">
            <i class="fas fa-pause"></i>
        </button>
        <button class="control-btn" id="refreshBtn" title="Refresh data">
            <i class="fas fa-sync-alt"></i>
        </button>
        <div class="live-indicator">
            <span class="live-dot"></span>
            <span class="live-text">LIVE</span>
        </div>
    `;
    
    document.body.appendChild(controlPanel);
    
    let isPaused = false;
    const pauseBtn = document.getElementById('pauseBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const liveIndicator = controlPanel.querySelector('.live-indicator');
    
    pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        
        if (isPaused) {
            stopRealTimeUpdates();
            pauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            pauseBtn.title = 'Resume real-time updates';
            liveIndicator.classList.add('paused');
            liveIndicator.querySelector('.live-text').textContent = 'PAUSED';
            showNotification('Real-time updates paused', 'info');
        } else {
            startRealTimeUpdates();
            pauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            pauseBtn.title = 'Pause real-time updates';
            liveIndicator.classList.remove('paused');
            liveIndicator.querySelector('.live-text').textContent = 'LIVE';
            showNotification('Real-time updates resumed', 'success');
        }
    });
    
    refreshBtn.addEventListener('click', () => {
        refreshBtn.classList.add('spinning');
        updateKPIValues();
        updateGaugeValues();
        updateHealthScore();
        showNotification('Data refreshed successfully', 'success');
        
        setTimeout(() => {
            refreshBtn.classList.remove('spinning');
        }, 1000);
    });
}

// Create control panel on load
createControlPanel();

// ===== Add Click Handlers to Gauge Cards =====
document.querySelectorAll('.gauge-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const labels = ['pH', 'TDS', 'Turbidity', 'Temperature', 'Pressure'];
        const values = [
            boilerData.pH.toFixed(1),
            Math.round(boilerData.tds),
            Math.round(boilerData.turbidity),
            Math.round(boilerData.temperature) + '°C',
            boilerData.pressure.toFixed(1) + ' bar'
        ];
        
        showDetailModal(labels[index], values[index]);
    });
});

// ===== Detail Modal =====
function showDetailModal(label, value) {
    // Remove existing modal
    const existingModal = document.querySelector('.detail-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'detail-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${label} Details</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="modal-value">${value}</div>
                <div class="modal-info">
                    <div class="info-row">
                        <span>Status:</span>
                        <span class="status-ok">Normal</span>
                    </div>
                    <div class="info-row">
                        <span>Last Updated:</span>
                        <span>${new Date().toLocaleTimeString()}</span>
                    </div>
                    <div class="info-row">
                        <span>Trend:</span>
                        <span class="trend-stable"><i class="fas fa-arrow-right"></i> Stable</span>
                    </div>
                </div>
                <div class="modal-chart">
                    <canvas id="modalChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.add('closing');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('closing');
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    // Animate in
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Create mini trend chart
    const modalCtx = document.getElementById('modalChart').getContext('2d');
    const modalChartData = Array.from({length: 10}, () => Math.random() * 20 + 80);
    
    new Chart(modalCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 10}, (_, i) => `${i}h`),
            datasets: [{
                label: label,
                data: modalChartData,
                borderColor: '#2F80ED',
                backgroundColor: 'rgba(47, 128, 237, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    grid: { display: false }
                },
                y: {
                    grid: { color: 'rgba(0,0,0,0.05)' }
                }
            }
        }
    });
}

// ===== Add Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.detail-modal');
        if (modal) {
            modal.classList.add('closing');
            setTimeout(() => modal.remove(), 300);
        }
    }
});

// ===== Add Tooltips =====
document.querySelectorAll('[title]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const title = this.getAttribute('title');
        if (!title) return;
        
        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = title;
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        
        this._tooltip = tooltip;
    });
    
    element.addEventListener('mouseleave', function() {
        if (this._tooltip) {
            this._tooltip.remove();
            this._tooltip = null;
        }
    });
});

console.log('%c Dashboard is now fully interactive! ', 'background: #27AE60; color: white; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 6px;');
console.log('%c Keyboard Shortcuts: Ctrl/Cmd + K (Toggle Theme) | ESC (Close Modals) ', 'color: #2F80ED; font-size: 11px; font-weight: 600;');


// ===== Make KPI Cards Interactive =====
document.querySelectorAll('.kpi-card').forEach((card, index) => {
    card.style.cursor = 'pointer';
    
    card.addEventListener('click', () => {
        const labels = ['Efficiency', 'Risk Index', 'Blowdown Rate', 'Savings Today'];
        const descriptions = [
            'Overall boiler efficiency percentage',
            'Current risk assessment level',
            'Water blowdown rate percentage',
            'Cost savings achieved today'
        ];
        
        showKPIDetailModal(labels[index], descriptions[index], index);
    });
});

function showKPIDetailModal(label, description, index) {
    const existingModal = document.querySelector('.detail-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'detail-modal';
    
    let currentValue, unit, trend;
    switch(index) {
        case 0:
            currentValue = boilerData.efficiency.toFixed(1);
            unit = '%';
            trend = 'Increasing';
            break;
        case 1:
            currentValue = boilerData.riskIndex;
            unit = '';
            trend = 'Stable';
            break;
        case 2:
            currentValue = boilerData.blowdownRate.toFixed(0);
            unit = '%';
            trend = 'Optimized';
            break;
        case 3:
            currentValue = '₹' + boilerData.savingsToday.toLocaleString('en-IN');
            unit = '';
            trend = 'Growing';
            break;
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${label}</h3>
                <button class="modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body">
                <div class="modal-value">${currentValue}${unit}</div>
                <p style="text-align: center; color: var(--text-secondary); margin-bottom: 20px;">${description}</p>
                <div class="modal-info">
                    <div class="info-row">
                        <span>Current Status:</span>
                        <span class="status-ok">${trend}</span>
                    </div>
                    <div class="info-row">
                        <span>Last Updated:</span>
                        <span>${new Date().toLocaleTimeString()}</span>
                    </div>
                    <div class="info-row">
                        <span>Update Frequency:</span>
                        <span>Every 3 seconds</span>
                    </div>
                </div>
                <div class="modal-chart">
                    <canvas id="kpiModalChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.add('closing');
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('closing');
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    setTimeout(() => modal.classList.add('show'), 10);
    
    // Create trend chart
    const ctx = document.getElementById('kpiModalChart').getContext('2d');
    const chartData = Array.from({length: 24}, (_, i) => {
        const base = index === 0 ? 91 : index === 2 ? 14 : index === 3 ? 5000 : 50;
        return base + Math.sin(i * 0.3) * (index === 3 ? 500 : 2) + Math.random() * (index === 3 ? 200 : 1);
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [{
                label: label,
                data: chartData,
                borderColor: '#2F80ED',
                backgroundColor: 'rgba(47, 128, 237, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        maxTicksLimit: 8,
                        color: getThemeColors().textSecondary
                    }
                },
                y: {
                    grid: { color: getThemeColors().gridColor },
                    ticks: { color: getThemeColors().textSecondary }
                }
            }
        }
    });
}

// ===== Add Export Data Functionality =====
function exportDashboardData() {
    const data = {
        timestamp: new Date().toISOString(),
        boilerData: boilerData,
        plant: document.querySelector('.plant-selector span').textContent
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `boilerguard-data-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
}

// Add export button to settings
const settingsBtn = document.querySelector('.icon-btn');
if (settingsBtn) {
    settingsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const existingMenu = document.querySelector('.settings-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        const menu = document.createElement('div');
        menu.className = 'settings-menu';
        menu.innerHTML = `
            <div class="settings-option" data-action="export">
                <i class="fas fa-download"></i> Export Data
            </div>
            <div class="settings-option" data-action="print">
                <i class="fas fa-print"></i> Print Dashboard
            </div>
            <div class="settings-option" data-action="fullscreen">
                <i class="fas fa-expand"></i> Fullscreen
            </div>
            <div class="settings-option" data-action="refresh">
                <i class="fas fa-sync"></i> Refresh All
            </div>
        `;
        
        settingsBtn.style.position = 'relative';
        settingsBtn.appendChild(menu);
        
        menu.querySelectorAll('.settings-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const action = option.dataset.action;
                
                switch(action) {
                    case 'export':
                        exportDashboardData();
                        break;
                    case 'print':
                        window.print();
                        showNotification('Opening print dialog...', 'info');
                        break;
                    case 'fullscreen':
                        if (!document.fullscreenElement) {
                            document.documentElement.requestFullscreen();
                            showNotification('Entered fullscreen mode', 'success');
                        } else {
                            document.exitFullscreen();
                            showNotification('Exited fullscreen mode', 'info');
                        }
                        break;
                    case 'refresh':
                        location.reload();
                        break;
                }
                
                menu.remove();
            });
        });
        
        setTimeout(() => {
            document.addEventListener('click', function closeMenu() {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            });
        }, 10);
    });
}

console.log('%c ✨ All interactive features loaded! ', 'background: linear-gradient(135deg, #2F80ED 0%, #56CCF2 100%); color: white; font-size: 12px; font-weight: bold; padding: 6px 12px; border-radius: 6px;');
