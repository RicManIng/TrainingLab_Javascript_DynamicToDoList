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
    <main>
        <section>
            <form>
                <label for="search">Search a task : </label>
                <input type="text" id="search" name="search" placeholder="Insert the name of the task">
                <label for="select">Select a type : </label>
                <select name="taskType" id="select">
                    <option value="" class="default">Select a task type to search</option>
                </select>
                <button type="button" id="searchButton">Search</button>
            </form>
        </section>
        <section class="taskContainer pending"id="pending-task">
            <h1>Pending Tasks</h1>
        </section>
        <section class="taskContainer completed" id="completed-task">
            <h1>Completed Tasks</h1>
        </section>
        <section class="taskContainer cancelled" id="cancelled-task">
            <h1>Cancelled Tasks</h1>
        </section>
    </main>
</body>
</html>