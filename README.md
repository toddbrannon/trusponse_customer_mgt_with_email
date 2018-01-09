# trusponse_customer_mgt_email_app

RESTFUL ROUTES (there a 7 total routes)

REST - A mapping between HTTP routes and CRUD (Create, Read, Update, Destroy)

name        url                 verb        desc.
======================================================================
INDEX       /customers          GET         Display a list of all dogs/customers/campgrounds
NEW         /customers/new      GET         Displays form to make a new customer
CREATE      /customers          POST        Add new dog to DB
SHOW        /customers/:id      GET         Shows info about one customer
EDIT        /customers/:id/edit GET         Show edit form for one customer
UPDATE      /customers/:id      PUT         Update a particular customer, then redirect somewhere
DESTROY     /customers/:id      DELETE      Delete a particluar customer, then redirect somewhere


** You have to have two routes in order to send a post request: NEW (show form) and CREATE (submit form).
