export const LOGIN = {
  LOGIN_DETAILS: [
    {
      field_id: "username",
      field_label: "Username",
      field_value: "",
      field_type: "text",
      field_width: "100%",
      field_mandatory: true,
    },
    {
      field_id: "password",
      field_label: "Password",
      field_value: "",
      field_type: "password",
      field_width: "100%",
      field_mandatory: true,
    },
  ],
};

export const CREATE_PROPOSAL = {
  PROPOSAL_FORM: [
    {
      field_id: "proposal_name",
      field_label: "Name",
      field_value: "",
      field_type: "text",
      field_width: "100%",
      field_mandatory: true,
    },
    {
      field_id: "ltim_offering",
      field_label: "LITM Offering",
      field_type: "select",
      field_width: "100%",
      field_value: "",
      field_mandatory: true,
      field_options: ["Refract by fosfor"],
    },
    {
      field_id: "additional_info",
      field_label: "Additonal info about customer ",
      field_value: "",
      field_type: "multiline",
      field_width: "100%",
      max_rows: 5,
      min_rows: 2,
    },
    {
      field_id: "file_upload",
      field_label: "Upload file",
      field_value: {
        file: "",
        fileName: "",
        fileSize: "",
      },
      alternate_field_type: 'upload',
      file_type: ".doc/.pdf",
      field_type: "upload",
      file_accept: '.pdf, .doc, .docx',
      field_width: "100%",
      field_mandatory: true,
    },
  ],
};
