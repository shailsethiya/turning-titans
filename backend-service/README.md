# solvathon-project

POST
http://127.0.0.1:5000/auth/register
{
    "username" : "test",
    "password"  : "test"
}
-----
POST
http://127.0.0.1:5000/auth/login
{
    "username" : "test",
    "password"  : "test"
}
---
GET 
http://127.0.0.1:5000/auth/logout
---
GET
http://127.0.0.1:5000/api/list_proposals

---
POST
http://127.0.0.1:5000/api/add_proposal
{
     "upload_file" : "upload button",
    "name" : "rfp_name",
    "LTIM_offering" : "Refract",
    "additional_info" : "info"
}

---
DELETE  
http://127.0.0.1:5000/api/delete_proposal/010396c9-4e60-4cda-9edd-b809f03bab70

----
GET
http://127.0.0.1:5000/api/download_proposal/46d99bb0-c1e1-4079-9fce-fd02798b2e5a


"proxy" : "http://127.0.0.1:5000"