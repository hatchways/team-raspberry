              List of relations
| Schema |      Name       | Type  |  Owner   |
|--------+-----------------+-------+----------|
| public | prospects       | table | postgres |
| public | users           | table | postgres |


Prospects:

| column_name | is_nullable | data_type | char_max_length |
+-------------+-------------+-----------+-----------------|
| id          | NO          | bigint    |                 |
| email       | NO          | string    |             120 |
| status      | YES         | string    |             120 |
| firstName   | YES         | string    |             120 |
| lastName    | YES         | string    |             120 |
| userId      | NO          | bigint    |                 |


Users:

| column_name | is_nullable | data_type | char_max_length | 
+-------------+-------------+-----------+-----------------|
| id          | NO          | bigint    |                 |
| email       | NO          | string    |             120 |
| password    | NO          | string    |             120 |
| created     | NO          | timestamp |                 |
| firstName   | NO          | string    |             120 |
| lastName    | NO          | string    |             120 |
| credentials | YES         | string    |             500 |