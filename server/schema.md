crm_test=# \dt
                List of relations
 Schema |        Name         | Type  |  Owner
--------+---------------------+-------+----------
 public | alembic_version     | table | postgres
 public | campaign_steps      | table | postgres
 public | campaigns           | table | postgres
 public | prospect_step_joins | table | postgres
 public | prospects           | table | postgres
 public | users               | table | postgres
(6 rows)


            Table "public.campaigns"
 Column  |            Type             | Collation | Nullable |
---------+-----------------------------+-----------+----------|
 id      | bigint                      |           | not null |
 title   | character varying(200)      |           | not null |
 user_id | bigint                      |           |          |
 created | timestamp without time zone |           | not null |
Indexes:
    "campaigns_pkey" PRIMARY KEY, btree (id)
    "campaigns_title_key" UNIQUE CONSTRAINT, btree (title)
Foreign-key constraints:
    "campaigns_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "campaign_steps" CONSTRAINT "campaign_steps_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id)


                  Table "public.campaign_steps"
    Column     |            Type             | Collation | Nullable |
---------------+-----------------------------+-----------+----------|
 id            | bigint                      |           | not null |
 step_name     | character varying(200)      |           | not null |
 email_subject | character varying(200)      |           | not null |
 email_body    | character varying(10000)    |           | not null |
 campaign_id   | bigint                      |           | not null |
 created       | timestamp without time zone |           | not null |
Indexes:
    "campaign_steps_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "campaign_steps_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id)
Referenced by:
    TABLE "prospect_step_joins" CONSTRAINT "prospect_step_joins_step_id_fkey" FOREIGN KEY (step_id) REFERENCES campaign_steps(id)


                  Table "public.prospect_step_joins"
    Column     |            Type             | Collation | Nullable |   
---------------+-----------------------------+-----------+----------|
 id            | bigint                      |           | not null |
 step_id       | bigint                      |           | not null |
 prospect_id   | bigint                      |           | not null |
 email_sent    | boolean                     |           | not null |
 email_opened  | boolean                     |           | not null |
 email_replied | boolean                     |           | not null |
 created       | timestamp without time zone |           | not null |
Indexes:
    "prospect_step_joins_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "prospect_step_joins_prospect_id_fkey" FOREIGN KEY (prospect_id) REFERENCES prospects(id)
    "prospect_step_joins_step_id_fkey" FOREIGN KEY (step_id) REFERENCES campaign_steps(id)


              Table "public.prospects"
  Column   |          Type          | Collation | Nullable |                Default
-----------+------------------------+-----------+----------|
 id        | bigint                 |           | not null |
 email     | character varying(120) |           | not null |
 status    | character varying(120) |           |          |
 firstName | character varying(120) |           |          |
 lastName  | character varying(120) |           |          |
 userId    | bigint                 |           | not null |
Indexes:
    "prospects_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "prospects_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id)
Referenced by:
    TABLE "prospect_step_joins" CONSTRAINT "prospect_step_joins_prospect_id_fkey" FOREIGN KEY (prospect_id) REFERENCES prospects(id)


                Table "public.users"
   Column    |            Type             | Collation | Nullable |
-------------+-----------------------------+-----------+----------|
 id          | bigint                      |           | not null |
 email       | character varying(120)      |           | not null |
 password    | character varying(120)      |           | not null |
 created     | timestamp without time zone |           | not null |
 firstName   | character varying(120)      |           | not null |
 lastName    | character varying(120)      |           | not null |
 credentials | character varying(500)      |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_email_key" UNIQUE CONSTRAINT, btree (email)
Referenced by:
    TABLE "campaigns" CONSTRAINT "campaigns_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
    TABLE "prospects" CONSTRAINT "prospects_userId_fkey" FOREIGN KEY ("userId") REFERENCES users(id)