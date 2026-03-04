# BoilerGuard IoT Dashboard

A fully functional, pixel-perfect IoT-based predictive boiler health monitoring system with real-time data updates and interactive features.

## 🚀 Features

### Real-Time Monitoring
- **Live Data Updates**: All KPIs, gauges, and charts update automatically every 2-3 seconds
- **Health Score**: Circular progress indicator showing overall boiler health (0-100)
- **5 Gauge Meters**: pH, TDS, Turbidity, Temperature, and Pressure with animated needles
- **Trend Charts**: Real-time line graphs showing 12-hour trends

### Interactive Elements
- **Clickable KPI Cards**: Click any KPI card to view detailed trends and statistics
- **Clickable Gauges**: Click gauge cards to see detailed parameter information
- **Plant Selector**: Switch between different boiler plants
- **Notification System**: Real-time alerts with interactive notification panel
- **User Profile Menu**: Access profile settings and options

### Control Features
- **Pause/Resume**: Control real-time data updates with the control panel
- **Manual Refresh**: Force refresh all data instantly
- **Live Indicator**: Visual indicator showing live/paused status
- **Action Buttons**: Confirm actions, call engineers, or dismiss alerts

### Theme Support
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Persistent Theme**: Theme preference saved in localStorage
- **Keyboard Shortcut**: Press `Ctrl/Cmd + K` to toggle theme

### Additional Features
- **Export Data**: Download current dashboard data as JSON
- **Print Dashboard**: Print-friendly layout
- **Fullscreen Mode**: Expand dashboard to fullscreen
- **Settings Menu**: Access various dashboard options
- **Custom Notifications**: Toast notifications for all actions
- **Keyboard Shortcuts**: ESC to close modals, Ctrl+K for theme toggle
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🎨 Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables
- **Vanilla JavaScript**: No frameworks, pure JS
- **Chart.js**: Interactive line charts
- **SVG**: Circular progress rings and gauge meters
- **Google Fonts**: Inter font family
- **Font Awesome**: Icon library

## 📊 Dashboard Sections

### Top Navigation
- Logo and branding
- Plant selector dropdown
- Theme toggle button
- Settings menu
- Notification bell with badge
- User profile with dropdown

### Main Dashboard (Left)
1. **Header Banner**: Glassmorphism effect with gradient
2. **KPI Cards Row**: 4 key performance indicators
   - Efficiency (%)
   - Risk Index
   - Blowdown Rate (%)
   - Savings Today (₹)
3. **Gauge Meters Row**: 5 semicircular gauges with status badges
4. **Trend Chart**: 12-hour data visualization
5. **Compliance Cards**: IBR and CPCB reporting status

### Right Sidebar
1. **Health Score**: Circular progress ring (86/100)
2. **AI Powers**: Quick access to AI features
3. **Predictive Insights**: Alert system with recommended actions
   - Warning indicators
   - Action buttons (Confirm, Call Engineer, Dismiss)
   - View all insights

### Control Panel (Bottom Right)
- Pause/Resume button
- Refresh button
- Live status indicator

## 🎯 Interactive Features

### Click Interactions
- **KPI Cards**: View detailed trends and statistics
- **Gauge Cards**: See parameter details and history
- **Plant Selector**: Switch between plants
- **Notifications**: View and manage alerts
- **User Profile**: Access profile menu
- **Settings**: Export, print, fullscreen options
- **Action Buttons**: Confirm, call, or dismiss alerts

### Real-Time Updates
- KPI values update every 3 seconds
- Gauge needles animate smoothly
- Chart adds new data points every 2 seconds
- Health score updates dynamically
- All changes are animated

### Keyboard Shortcuts
- `Ctrl/Cmd + K`: Toggle dark/light theme
- `ESC`: Close open modals

## 🎨 Color Palette

### Light Mode
- Primary Blue: `#2F80ED`
- Secondary Blue: `#56CCF2`
- Background: `#F4F7FB`
- Card Background: `#FFFFFF`
- Success Green: `#27AE60`
- Warning Orange: `#F2994A`
- Danger Red: `#EB5757`

### Dark Mode
- Background: `#0F172A`
- Card Background: `#1E293B`
- Border: `#334155`
- Text: `#F1F5F9`

## 📱 Responsive Breakpoints

- **Desktop**: 1400px+ (Full layout)
- **Laptop**: 1200px - 1400px (Adjusted gauges)
- **Tablet**: 768px - 1200px (Stacked layout)
- **Mobile**: < 768px (Single column)

## 🚀 Getting Started

1. Open `index.html` in a modern web browser
2. No build process or dependencies required
3. All resources loaded from CDN

## 📦 File Structure

```
boilerguard-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with themes
├── script.js           # All interactive functionality
└── README.md          # This file
```

## 🔧 Customization

### Change Update Frequency
Edit the intervals in `script.js`:
```javascript
// Update KPIs every 3 seconds
dataUpdateInterval = setInterval(() => { ... }, 3000);

// Update chart every 2 seconds
chartUpdateInterval = setInterval(() => { ... }, 2000);
```

### Modify Color Theme
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-blue: #2F80ED;
    --success-green: #27AE60;
    /* ... more colors */
}
```

### Add New Gauges
Add gauge HTML in `index.html` and update the data in `script.js`:
```javascript
boilerData.newParameter = initialValue;
```

## 🎯 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 Notes

- All data is simulated for demonstration purposes
- Real-time updates use realistic value ranges
- Charts use Chart.js for smooth animations
- Theme preference persists across sessions
- Fully functional without backend

## 🎨 Design Philosophy

- **Pixel-Perfect**: Matches reference design exactly
- **Modern SaaS**: Clean, professional industrial IoT aesthetic
- **User-Friendly**: Intuitive interactions and clear feedback
- **Performance**: Smooth animations and efficient updates
- **Accessibility**: Proper contrast ratios and semantic HTML

## 🚀 Future Enhancements

- WebSocket integration for real backend data
- Historical data analysis
- Alert configuration
- User management
- Multi-language support
- Advanced analytics dashboard
- Mobile app version

## 📄 License

This is a demonstration project. Feel free to use and modify as needed.

---

**Built with ❤️ for Industrial IoT Monitoring**
