<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once 'head.php'; ?>
    <link rel="stylesheet" href="resources/css/home.min.css">
    <script src="js/home.js"></script>
    <title>Dynamic ToDo List - Home</title>
</head>
<body data-username="<?= isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8') : ''; ?>">
    <?php require_once 'header.php'; ?>
</body>
</html>