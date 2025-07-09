# 📤 Shared Hosting Setup - Static Version

## For Shared Hosting Without Node.js Support

Most shared hosting providers (like GoDaddy, Bluehost, etc.) don't support Node.js. Here's how to create a static version:

### Step 1: Create Static Build Directory Structure

```
your-website-folder/
├── index.html (main page)
├── assets/ (CSS, JS, images)
├── attached_assets/ (your uploaded images)
├── api/ (PHP files for backend)
├── admin/ (admin panel)
└── .htaccess (URL rewriting)
```

### Step 2: Convert React App to Static HTML

Since your app is built with React, you can export it as static HTML:

1. **Build the React app:**
   ```bash
   npm run build
   ```

2. **The `dist` folder contains:**
   - `index.html` - Main HTML file
   - `assets/` - CSS and JS files
   - All your images and content

### Step 3: Create Simple PHP Backend

Create these PHP files in an `api/` folder:

#### api/config.php
```php
<?php
// Database configuration
$host = 'localhost';
$dbname = 'your_database_name';
$username = 'your_db_username';
$password = 'your_db_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Enable CORS for API calls
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
?>
```

#### api/products.php
```php
<?php
include 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Get all products or by category
        $category_id = $_GET['category_id'] ?? null;
        $search = $_GET['search'] ?? null;
        
        $sql = "SELECT * FROM products WHERE is_active = 1";
        $params = [];
        
        if ($category_id) {
            $sql .= " AND category_id = ?";
            $params[] = $category_id;
        }
        
        if ($search) {
            $sql .= " AND (name LIKE ? OR description LIKE ?)";
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $products = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($products);
        break;
        
    case 'POST':
        // Add new product (admin only)
        $data = json_decode(file_get_contents('php://input'), true);
        
        $sql = "INSERT INTO products (name, description, category_id, images, specifications, price, sku) 
                VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            $data['name'],
            $data['description'],
            $data['category_id'],
            $data['images'],
            $data['specifications'],
            $data['price'],
            $data['sku']
        ]);
        
        echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
        break;
}
?>
```

#### api/categories.php
```php
<?php
include 'config.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $parent_id = $_GET['parent_id'] ?? null;
        
        $sql = "SELECT * FROM categories WHERE is_active = 1";
        $params = [];
        
        if ($parent_id !== null) {
            $sql .= " AND parent_id = ?";
            $params[] = $parent_id;
        } else {
            $sql .= " AND parent_id IS NULL";
        }
        
        $sql .= " ORDER BY display_order, name";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($categories);
        break;
}
?>
```

#### api/contact.php
```php
<?php
include 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (!$data['name'] || !$data['email'] || !$data['message']) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        exit;
    }
    
    // Save to database
    $sql = "INSERT INTO enquiries (subject, message, status) VALUES (?, ?, 'open')";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        "Contact from " . $data['name'],
        "Name: " . $data['name'] . "\n" .
        "Email: " . $data['email'] . "\n" .
        "Phone: " . ($data['phone'] ?? '') . "\n" .
        "Message: " . $data['message']
    ]);
    
    // Send email notification (optional)
    $to = "info@abletools.com";
    $subject = "New Contact Form Submission";
    $message = "New contact form submission:\n\n" .
               "Name: " . $data['name'] . "\n" .
               "Email: " . $data['email'] . "\n" .
               "Phone: " . ($data['phone'] ?? '') . "\n" .
               "Message: " . $data['message'];
    
    mail($to, $subject, $message);
    
    echo json_encode(['success' => true]);
}
?>
```

### Step 4: Upload via FTP

#### Using FileZilla:
1. **Connect to your FTP server**
2. **Navigate to public_html**
3. **Create folder: `abletools`**
4. **Upload all files:**
   - `index.html` (from dist folder)
   - `assets/` folder (from dist)
   - `attached_assets/` folder (your images)
   - `api/` folder (PHP files)
   - `.htaccess` file

#### File Structure on Server:
```
public_html/
├── abletools/
│   ├── index.html
│   ├── assets/
│   │   ├── index-[hash].css
│   │   └── index-[hash].js
│   ├── attached_assets/
│   │   ├── logo.png
│   │   ├── banner1.jpg
│   │   └── [all your images]
│   ├── api/
│   │   ├── config.php
│   │   ├── products.php
│   │   ├── categories.php
│   │   └── contact.php
│   └── .htaccess
```

### Step 5: Database Setup via cPanel

1. **Login to cPanel**
2. **Go to MySQL Databases**
3. **Create database: `your_domain_abletools`**
4. **Create user with all privileges**
5. **Run the SQL from the previous guide to create tables**

### Step 6: Configure .htaccess

```apache
RewriteEngine On

# API routes
RewriteRule ^api/products/?$ api/products.php [L]
RewriteRule ^api/categories/?$ api/categories.php [L]
RewriteRule ^api/contact/?$ api/contact.php [L]

# Frontend routes (single page app)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/api/
RewriteRule ^(.*)$ index.html [L,QSA]

# Security
<Files "*.php">
    Order allow,deny
    Allow from all
</Files>

<Files "config.php">
    Order deny,allow
    Deny from all
</Files>
```

### Step 7: Update Your Built JavaScript

Since your React app will now call PHP APIs instead of Node.js, you might need to update the API endpoints in your built JavaScript files, or add a configuration that detects the environment.

### Step 8: Test Your Deployment

1. **Visit: `https://yourdomain.com/abletools/`**
2. **Check all pages load**
3. **Test API endpoints: `https://yourdomain.com/abletools/api/products`**
4. **Test contact form**
5. **Verify images load from attached_assets**

## 🔧 Quick FTP Upload Steps

1. **Download FileZilla** (free FTP client)
2. **Connect to your hosting**
3. **Go to public_html**
4. **Create `abletools` folder**
5. **Upload all files maintaining folder structure**
6. **Set permissions: 755 for folders, 644 for files**
7. **Test your website**

Your static version is now ready for shared hosting!