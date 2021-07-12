INSERT INTO department (name)
VALUES ("Marketing"),
    ("Operations"),
    ("Finance"),
    ("Sales"),
    ("Human Resource");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing employee", "100000", "1"),
    ("Operations employee", "110000", "2"),
    ("Finance employee", "120000", "3"),
    ("Sales employee", "130000", "4"),
    ("Human Resource employee", "140000", "5");

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Adam", "Knott", "1"),
    ("Angela", "Penn", "2"),
    ("Kasper", "Cooper", "3"),
    ("Marisa", "Sparrow", "4"),
    ("Elyse", "Bowes", "5");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rob", "Smith", "1", "1"),
    ("Tom", "Coleman", "1", "1");