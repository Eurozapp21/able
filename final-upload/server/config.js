// Load environment variables from .env file manually (no dotenv dependency)
const fs = require('fs');
const path = require('path');

function loadEnvFile() {
  const envPath = path.join(__dirname, '../.env');
  const envVars = {};
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    });
  }
  
  return envVars;
}

const envVars = loadEnvFile();

const config = {
  port: envVars.PORT || process.env.PORT || 3002,
  databaseUrl: envVars.DATABASE_URL || 'mysql://abletoolscom_ablenewcy:abletoolscom_ablenewcy@localhost:3306/abletoolscom_ablenewcy',
  sessionSecret: envVars.SESSION_SECRET || 'abletools-secure-session-secret-2025-production',
  nodeEnv: envVars.NODE_ENV || 'production'
};

// Validate required environment variables
if (!config.databaseUrl) {
  console.error('❌ ERROR: DATABASE_URL environment variable is required');
  console.error('📝 Please create a .env file with your MySQL connection string:');
  console.error('   DATABASE_URL=mysql://username:password@hostname:3306/database_name');
  process.exit(1);
}

module.exports = config;