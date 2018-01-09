        <% for(var i = 0; i < customers.length; i++) { %>
        <tr>
            <td><%= customers[i].first_name %></td>
            <td><%= customers[i].last_name %></td>
            <td><%= customers[i].email %></td>
        </tr>
       <% }; %> 
        
        <% customers.forEach(function(customer) { %>
            <div>
                <tr>
                    <td><%= customers.first_name %></td>
                    <td><%= customers.last_name %></td>
                    <td><%= customers.email %></td>
                </tr>
            </div>
        <% }); %>