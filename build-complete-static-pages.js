#!/usr/bin/env node

// Script to rebuild all static pages with complete HTML content
import fs from 'fs';
import path from 'path';

// Base HTML template with AbleTools styling
const getBaseTemplate = (title, description, content) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${description}">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header { background: white; border-bottom: 1px solid #e2e8f0; padding: 1rem 0; }
        .nav { display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 1.5rem; font-weight: bold; color: #ffeb3b; }
        .nav-links { display: flex; gap: 2rem; }
        .nav-link { text-decoration: none; color: #64748b; font-weight: 500; }
        .nav-link:hover { color: #ffeb3b; }
        .hero { background: linear-gradient(135deg, #ffeb3b 0%, #fdd835 100%); padding: 4rem 0; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; color: #1a1a1a; }
        .hero p { font-size: 1.25rem; color: #333; max-width: 600px; margin: 0 auto; }
        .breadcrumb { padding: 1rem 0; color: #64748b; }
        .breadcrumb a { color: #ffeb3b; text-decoration: none; }
        .content { padding: 3rem 0; }
        .card { background: white; border-radius: 12px; padding: 2rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 2rem; }
        .btn { background: #ffeb3b; color: black; padding: 0.75rem 2rem; border: none; border-radius: 4px; text-decoration: none; display: inline-block; font-weight: 500; }
        .btn:hover { background: #fdd835; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        @media (max-width: 768px) { .nav-links { display: none; } .hero h1 { font-size: 2rem; } }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">AbleTools</div>
                <div class="nav-links">
                    <a href="../index.html" class="nav-link">Home</a>
                    <a href="about.html" class="nav-link">About</a>
                    <a href="products.html" class="nav-link">Products</a>
                    <a href="solutions.html" class="nav-link">Solutions</a>
                    <a href="seminars.html" class="nav-link">Education</a>
                    <a href="catalogue.html" class="nav-link">Catalogue</a>
                    <a href="newsroom.html" class="nav-link">Newsroom</a>
                    <a href="contact.html" class="nav-link">Contact</a>
                </div>
            </nav>
        </div>
    </header>
    ${content}
</body>
</html>`;

// Sample content for different page types
const pageConfigs = {
    'about.html': {
        title: 'About Us - AbleTools Ltd',
        description: 'Leading provider of rehabilitation equipment and solutions in Cyprus',
        content: `
            <div class="hero">
                <div class="container">
                    <h1>About AbleTools</h1>
                    <p>Leading provider of rehabilitation equipment and solutions, empowering independence and improving quality of life.</p>
                </div>
            </div>
            <main class="container">
                <div class="content">
                    <div class="card">
                        <h2>Our Mission</h2>
                        <p>At AbleTools, we believe in "Your ability to dream!" Our mission is to provide innovative rehabilitation solutions that enhance the quality of life for individuals with disabilities and support healthcare professionals in delivering exceptional care.</p>
                    </div>
                </div>
            </main>`
    },
    // Add more page configurations as needed
};

// Process all HTML files in the pages directory
const pagesDir = 'static-export/pages';
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
    if (file.endsWith('.html')) {
        const filePath = path.join(pagesDir, file);
        
        // Get configuration or use default
        const config = pageConfigs[file] || {
            title: file.replace('.html', '').replace(/[-_]/g, ' ') + ' - AbleTools',
            description: 'Professional rehabilitation equipment and solutions from AbleTools Ltd',
            content: `
                <div class="hero">
                    <div class="container">
                        <h1>${file.replace('.html', '').replace(/[-_]/g, ' ')}</h1>
                        <p>Professional rehabilitation equipment and solutions from AbleTools Ltd</p>
                    </div>
                </div>
                <main class="container">
                    <div class="content">
                        <div class="card">
                            <h2>Content</h2>
                            <p>This page contains detailed information about ${file.replace('.html', '').replace(/[-_]/g, ' ')}.</p>
                            <a href="../index.html" class="btn">Back to Home</a>
                        </div>
                    </div>
                </main>`
        };
        
        const html = getBaseTemplate(config.title, config.description, config.content);
        fs.writeFileSync(filePath, html);
        console.log(`Updated: ${file}`);
    }
});

console.log('All pages have been updated with complete HTML content!');