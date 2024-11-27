<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once 'head.php'; ?>
    <link rel="stylesheet" href="resources/css/login.min.css">
    <title>Dynamic ToDo List - Login</title>
</head>
<body>
    <?php
        require_once 'header.php';

        $form_validated = true;

        if(isset($_POST)){
            $username = $_POST['username'];
            $password = $_POST['password'];
            $userArr = json_decode(file_get_contents('./resources/database/user.json'), true);

            foreach($userArr as $user){
                if($user['username'] === $username && $user['password'] === $password){
                    $_SESSION['username'] = $username;
                    header('Location: home.php');
                } else {
                    $form_validated = false;
                }

            }
        }
    ?>
    <main>
        <?php if (isset($_GET['state']) && $_GET['state'] === 'login') : ?>
        <form action="login.php" method="POST" novalidate>
            <label for="username">Username : </label>
            <input type="text" name="username" id="username" required>
            <label for="password">Password : </label>
            <input type="password" name="password" id="password" required>
            <?php if(!$form_validated) : ?>
                <p class="error">Invalid Username or Password</p>
            <?php endif; ?>
            <button type="submit" id="submit">Login</button>
        </form>
        <?php elseif (isset($_GET['state']) && $_GET['state'] === 'logout') : ?>
            <?php $_SESSION['username'] = null; ?>
            <h1>Logout Success</h1>
            <p>Login again to modify tasks</p>
            <a href="login.php?state=login">Go to Login</a>
        <?php endif; ?>
    </main>
</body>
</html>