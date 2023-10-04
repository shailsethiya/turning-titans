
export const LOGIN = {
    LOGIN_DETAILS: [
        {
            field_id: 'username',
            field_label: 'Username',
            field_value: '',
            field_type: 'text',
            field_width: '100%',
            field_mandatory: true,
        },
        {
            field_id: 'password',
            field_label: 'Password',
            field_value: '',
            field_type: 'password',
            field_width: '100%',
            field_mandatory: true,
        },
    ],
};

export const CREATE_PROPOSAL = {
    PROPOSAL_FORM: [
        {
            field_id: 'proposal_name',
            field_label: 'name',
            field_value: '',
            field_type: 'text',
            field_width: '100%',
            field_mandatory: true,
        },
        {
            field_id: 'file_upload',
            field_label: 'Upload file',
            field_value: {
                file: '',
                fileName: '',
                fileSize: '',
            },
            field_type: 'upload',
            alternate_field_type: 'upload',
            // file_accept: 'application/gzip, .gz, .tar',
            field_width: '100%',
            field_mandatory: true,
        },
    ],
};