// Cross-platform script to kill process on a port
const { exec } = require('child_process');

const port = process.env.PORT || 5000;

let command;
if (process.platform === 'win32') {
    // Windows: Find PID and kill it
    command = `for /f "tokens=5" %a in ('netstat -ano ^| findstr :${port}') do @taskkill /F /PID %a 2>nul`;
} else {
    // Mac/Linux
    command = `lsof -ti:${port} | xargs kill -9 2>/dev/null || true`;
}

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.log(`✅ Port ${port} is already free`);
        process.exit(0);
    } else {
        console.log(`✅ Killed process on port ${port}`);
        process.exit(0);
    }
});

