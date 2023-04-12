// Copyright (c) 2023, Talib Sheikh and contributors
// For license information, please see license.txt
frappe.ui.form.on("Incidence Report", {
  after_save: function (frm) {
    location.reload();
  },

  refresh: function (frm) {
    if (!frm.is_new() && frm.doc.shared_with_users == "false") {
      frm.set_intro(
        "Your Report is Saved for Branch : <b>" + frm.doc.branch + "</b>",
        "green"
      );
      // Define CSS class for blinking animation
      var style = document.createElement("style");
      style.innerHTML = `
  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .blink {
    animation: blink 1s linear infinite;
    color: red;
  }
`;
      document.head.appendChild(style);

      // Use the CSS class to create blinking intro
      if (!frm.is_new() && frm.doc.shared_with_users == "false") {
        var introMessage =
          "<div class='blink'><b><i>Please Submit Your Report</i></b></div>";
        frm.set_intro(introMessage, "green");
      }
    }

    if (!frm.is_new() && frm.doc.shared_with_users == "true") {
      var dateString = moment(frm.doc.date).format("DD-MM-YYYY");
      frm.set_intro(
        "<b>" +
          frm.doc.branch +
          "</b> Branch Report is Submitted on " +
          dateString,
        "green"
      );
    }

    var now = new Date(); // Create a new Date object with the current date and time
    var options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    var currentDateTime = now.toLocaleString("en-GB", options); // Get the current date and time in DD/MM/YYYY hh:MM:SS AM/PM format

    console.log("Current Date and Time:", currentDateTime);

    if (frm.doc.final_save == "true") {
      frm.disable_form();
      frm.disable_save();
    }

    console.log(frm.doctype);
    console.log(frm.docname);

    frm.toggle_display("employee_id", false);
    let email = frappe.session.user;
    let eid = email.match(/\d+/)[0];
    if (frm.is_new()) {
      frm.set_value("employee_id", eid);
    }

    console.log(eid);
    frappe.call({
      method:
        "sahayog_report.sahayog_report.doctype.incidence_report.api.check_user_designation",
      args: {
        emp_id: eid,
      },
      callback: function (r) {
        var designation = r.message[0].designation;
        console.log(designation);
        if (
          designation == "Branch Operation Manager" ||
          designation == "BRANCH MANAGER"
        ) {
          if (frm.doc.shared_with_users == "true") {
            frm.disable_form();
            frm.disable_save();
          } else if (frm.doc.shared_with_users == "false") {
            frm.enable_form();
            frm.enable_save();
          }
        } else {
          console.log("false");
          frm.disable_form();

          if (frm.is_new()) {
            frm.set_intro("This form is not Accessible", "red");
          }
        }
      },
    });
    let user = frappe.session.user;
    if (
      !frm.is_new() &&
      frm.doc.shared_with_users == "false" &&
      user == frm.doc.user_id
    ) {
      frm
        .add_custom_button(__("Submit"), function () {
          // perform desired action such as routing to new form or fetching etc.
          let user = frappe.session.user;
          if (frm.doc.final_save == "false") {
            frappe.confirm(
              "Are you sure you want to proceed?",
              function () {
                // action to perform if Yes is selected
                let reporting_emp = frm.doc.reporting_employee_id;
                let higher_emp = frm.doc.higher_reporting_id;
                let dgm = "914@sahayog.com";
                let cto = "1299@sahayog.com";
                let cfo = "1389@sahayog.com";
                let ceo = "1@sahayog.com";
                let ghm = "1394@sahayog.com";
                let rom = "813@sahayog.com";

                if (!frm.is_new() && frm.doc.shared_with_users == "false") {
                  frappe.call({
                    method: "frappe.share.add",
                    args: {
                      doctype: frm.doctype,
                      name: frm.docname,
                      user: rom,
                      read: 1,
                      write: 0,
                      submit: 0,
                      share: 0,
                      notify: 1,
                    },
                    callback: function (response) {
                      // Display a message to the user
                      // frappe.show_alert({
                      //   message: "Doctype shared with user " + dgm,
                      //   indicator: "green",
                      // });
                    },
                  });

                  frappe.call({
                    method: "frappe.share.add",
                    args: {
                      doctype: frm.doctype,
                      name: frm.docname,
                      user: dgm,
                      read: 1,
                      write: 0,
                      submit: 0,
                      share: 0,
                      notify: 1,
                    },
                    callback: function (response) {
                      // Display a message to the user
                      // frappe.show_alert({
                      //   message: "Doctype shared with user " + dgm,
                      //   indicator: "green",
                      // });
                    },
                  });

                  frappe.call({
                    method: "frappe.share.add",
                    args: {
                      doctype: frm.doctype,
                      name: frm.docname,
                      user: reporting_emp,
                      read: 1,
                      write: 0,
                      submit: 0,
                      share: 0,
                      notify: 1,
                    },
                    callback: function (response) {
                      // Display a message to the user
                      // frappe.show_alert({
                      //   message: "Doctype shared with user " + reporting_emp,
                      //   indicator: "green",
                      // });
                    },
                  });

                  frappe.call({
                    method: "frappe.share.add",
                    args: {
                      doctype: frm.doctype,
                      name: frm.docname,
                      user: higher_emp,
                      read: 1,
                      write: 0,
                      submit: 0,
                      share: 0,
                      notify: 1,
                    },
                    callback: function (response) {
                      // Display a message to the user
                      // frappe.show_alert({
                      //   message: "Doctype shared with user " + higher_emp,
                      //   indicator: "green",
                      // });
                    },
                  });
                  frappe.call({
                    method: "frappe.share.add",
                    args: {
                      doctype: frm.doctype,
                      name: frm.docname,
                      user: cto,
                      read: 1,
                      write: 0,
                      submit: 0,
                      share: 0,
                      notify: 1,
                    },
                    callback: function (response) {
                      // Display a message to the user
                      // frappe.show_alert({
                      //   message: "Doctype shared with user " + cto,
                      //   indicator: "green",
                      // });
                    },
                  });

                  frappe.call({
                    method: "frappe.share.add",
                    args: {
                      doctype: frm.doctype,
                      name: frm.docname,
                      user: ceo,
                      read: 1,
                      write: 0,
                      submit: 0,
                      share: 0,
                      notify: 1,
                    },
                    callback: function (response) {
                      // Display a message to the user
                      // frappe.show_alert({
                      //   message: "Doctype shared with user " + ceo,
                      //   indicator: "green",
                      // });
                    },
                  });

                  frappe.call({
                    method: "frappe.share.add",
                    args: {
                      doctype: frm.doctype,
                      name: frm.docname,
                      user: ghm,
                      read: 1,
                      write: 0,
                      submit: 0,
                      share: 0,
                      notify: 1,
                    },
                    callback: function (response) {
                      // Display a message to the user
                      // frappe.show_alert({
                      //   message: "Doctype shared with user " + ghm,
                      //   indicator: "green",
                      // });
                    },
                  });

                  frappe.call({
                    method: "frappe.share.add",
                    args: {
                      doctype: frm.doctype,
                      name: frm.docname,
                      user: cfo,
                      read: 1,
                      write: 0,
                      submit: 0,
                      share: 0,
                      notify: 1,
                    },
                    callback: function (response) {
                      // Display a message to the user
                      // frappe.show_alert({
                      //   message: "Doctype shared with user " + cfo,
                      //   indicator: "green",
                      // });
                    },
                  });

                  frm.set_value("shared_with_users", "true");
                  frm.set_value("final_save", "true");
                }
                //----------------------------------------------

                frm.save();
                frappe.show_alert({
                  message: "Report Submitted Successfully",
                  indicator: "green",
                });
              },
              function () {
                frappe.show_alert({
                  message: "Please Submit Your Report",
                  indicator: "red",
                });
                // action to perform if No is selected
              },
              null,
              null
            );
          }

          // prevent saving the document immediately after the dialog is shown
        })
        .css("background-color", "#4CAF50")
        .css("border-radius", "8px")
        .css("color", "white")
        .css("font-weight", "bold");
    }
  },

  share: function (frm) {},
});
