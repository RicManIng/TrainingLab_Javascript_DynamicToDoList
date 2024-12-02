<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php require_once 'head.php'; ?>
    <link rel="stylesheet" href="resources/css/addItem.min.css">
    <script src="js/addItem.js"></script>
    <title>Dynamic ToDo List - Add item</title>
</head>
<body data-username="<?= isset($_SESSION['username']) ? htmlspecialchars($_SESSION['username'], ENT_QUOTES, 'UTF-8') : ''; ?>">
    <?php 
        require_once 'header.php';

        $taskArrays = json_decode(file_get_contents('./resources/database/task.json'), true);
        
        /* load or create parameter */
        if (isset($_GET['state'])) {
            $state = $_GET['state'];
            $id = $_GET['id'];

            foreach ($taskArrays as $key => $task) {
                if ($task['id'] == $id) {
                    $task = $taskArrays[$key];
                    $key_selected = $key;
                    break;
                }
            }
        }
        else {
            $state = 'add';
        }

        if(isset($_POST['formComplete'])){
            /* manage the form completion and save params */
            if ($state == 'edit'){
                $task['name'] = $_POST['name'];
                $task['description'] = $_POST['description'];
                $task['type'] = $_POST['type'];
                $task['urgency'] = intval($_POST['urgency']);
                $task['updated_at'] = date('Y-m-d');
                $taskArrays[$key_selected] = $task;
                file_put_contents('./resources/database/task.json', json_encode($taskArrays, JSON_PRETTY_PRINT));
                header('Location: home.php?selected=1');
            } else if ($state == 'add'){
                $task = [
                    'id' => $taskArrays[count($taskArrays) - 1]['id'] + 1,
                    'name' => $_POST['name'],
                    'description' => $_POST['description'],
                    'type' => $_POST['type'],
                    'urgency' => intval($_POST['urgency']),
                    'status' => 'pending',
                    'created_at' => date('Y-m-d'),
                    'updated_at' => date('Y-m-d'),
                    'deleted_at' => null
                ];
                $taskArrays[] = $task;
                file_put_contents('./resources/database/task.json', json_encode($taskArrays, JSON_PRETTY_PRINT));
                header('Location: home.php?selected=1');
            }
        }

        if ($state == 'delete'){
            /* if state == delete so change the state of the task into cancel and then go to home */
            $task['status'] = 'cancelled';
            $task['updated_at'] = date('Y-m-d');
            $task['deleted_at'] = date('Y-m-d');
            $taskArrays[$key_selected] = $task;
            file_put_contents('./resources/database/task.json', json_encode($taskArrays, JSON_PRETTY_PRINT));
            header('Location: home.php?selected=1');
        } else if ($state == 'edit') {
            /* if state == edit load param from file json and then save the changes */
            $name = $task['name'];
            $description = $task['description'];
            $type = $task['type'];
            $urgency = $task['urgency'];
        } else if ($state == 'complete') {
            /* if state == complete so change the state of the task into complete and then go to home */
            $task['status'] = 'completed';
            $task['updated_at'] = date('Y-m-d');
            $task['deleted_at'] = date('Y-m-d');
            $taskArrays[$key_selected] = $task;
            file_put_contents('./resources/database/task.json', json_encode($taskArrays, JSON_PRETTY_PRINT));
            header('Location: home.php?selected=1');            
        } else {
            /* if state == add load the add form from POST parameters if present */
            $name = @$_POST['name'];
            $description = @$_POST['description'];
            $type = @$_POST['type'];
            $urgency = @$_POST['urgency'];
        }
    ?>
    <main>
        <?php if(!$_SESSION['username']): ?>
            <!-- here we redirect to login form -->
            <section>
                <h1>Access denied</h1>
                <p>You need to login to access this page</p>
                <a href="login.php?selected=3&state=login">Login</a>
            </section>
        <?php else: ?>
            <!-- if pass the php check load the form -->
            <form action="" method="POST">
                <label for="name">Insert the task name : </label>
                <input type="text" name="name" id="name" required placeholder="insert here the task name" value="<?= $name; ?>" autocomplete="off">
                <label for="type">Select the task type : </label>
                <select name="type" id="type">
                    <option value="">Select the task type</option>
                </select>
                <div id="urgencyContainer">
                    <label for="urgency">Select the task urgency : </label>
                    <input type="number" name="urgency" id="urgency" value=<?= $urgency; ?>>
                    <button type="button" class="urgency" id="1" <?= ($urgency == 1) ? 'selected' : '' ?>></button>
                    <button type="button" class="urgency" id="2" <?= ($urgency == 2) ? 'selected' : '' ?>></button>
                    <button type="button" class="urgency" id="3" <?= ($urgency == 3) ? 'selected' : '' ?>></button>
                    <button type="button" class="urgency" id="4" <?= ($urgency == 4) ? 'selected' : '' ?>></button>
                    <button type="button" class="urgency" id="5" <?= ($urgency == 5) ? 'selected' : '' ?>></button>
                </div>
                <label for="description">Insert here the task description : </label>
                <textarea placeholder="Task description must be more than 20 characters" name="description" id="description" rows="10"><?= htmlspecialchars($description); ?></textarea>
                <p id="descriprion-counter"></p>
                <button type="submit" id="submit" name="formComplete" value="true" disabled>Save</button>
            </form>
        <?php endif; ?>
    </main>
</body>
</html>