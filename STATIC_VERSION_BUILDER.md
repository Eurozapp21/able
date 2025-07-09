# Build Static Version for Regular cPanel Hosting

## If Your Hosting Doesn't Support Node.js

Since many shared hosting providers only support PHP/HTML, here's how to create a static version:

### Step 1: Build the Frontend
In this Replit project, run:
```bash
npm run build
```
This creates a `dist` folder with static HTML, CSS, and JavaScript files.

### Step 2: Download the Built Files
1. After building, download the entire `dist` folder
2. These are the files that go in your `public_html` folder

### Step 3: Create Simple PHP Backend
Instead of Node.js, use PHP for database operations. Create these files:

#### `api/products.php`
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$dbname = 'your_database_name';
$username = 'your_db_user';
$password = 'your_db_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $stmt = $pdo->query("SELECT * FROM products WHERE is_featured = 1");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database error']);
}
?>
```

#### `api/categories.php`
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$host = 'localhost';
$dbname = 'your_database_name';
$username = 'your_db_user';
$password = 'your_db_password';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $stmt = $pdo->query("SELECT * FROM categories");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch(PDOException $e) {
    echo json_encode(['error' => 'Database error']);
}
?>
```

### Step 4: File Structure in public_html
```
public_html/
├── index.html (from dist folder)
├── assets/ (from dist folder)
├── api/
│   ├── products.php
│   ├── categories.php
│   └── seminars.php
└── admin/
    └── (simple PHP admin files)
```

### Step 5: Update API Calls
The frontend will call `/api/products.php` instead of Node.js endpoints.

This approach gives you a working website on standard cPanel hosting, though without the full CMS features.