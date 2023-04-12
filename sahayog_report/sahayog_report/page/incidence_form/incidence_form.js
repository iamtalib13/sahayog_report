frappe.pages["incidence-form"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "Incidence Report Form",
    single_column: true,
  });

  // Define table data
  var data = [
    { name: "John", age: 30, gender: "Male" },
    { name: "Jane", age: 25, gender: "Female" },
    { name: "Bob", age: 40, gender: "Male" },
    { name: "Alice", age: 35, gender: "Female" },
  ];

  // Generate HTML code for the table
  var html = `
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody>
                {% for row in data %}
                <tr>
                    <td>{{ row.name }}</td>
                    <td>{{ row.age }}</td>
                    <td>{{ row.gender }}</td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    `;

  // Render the table on the page
  page.add_field({ fieldtype: "HTML", options: html });
};
