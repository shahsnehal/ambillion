// dropzone file extensions - start

// application types
export const pdf = { 'application/pdf': ['.pdf'] };
export const doc = { 'application/msword': ['.doc'] };
export const docx = {
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
};
export const xls = { 'application/vnd.ms-excel': ['.xls'] };
export const xlsx = {
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
};
// export const zip = { 'application/zip': ['.zip'] };
//text types
export const csv = { 'text/csv': ['.csv'] };
export const txt = { 'text/plain': ['.txt'] };

//image types
export const jpeg = { 'image/jpeg': ['.jpg', '.jpeg'] };
export const png = { 'image/png': ['.png'] };
// export const gif = { 'image/gif': ['.gif'] };

//DocumentType Formats
export const fileFormats = [
    { label: 'PDF', value: 'pdf' },
    { label: 'DOC', value: 'doc' },
    { label: 'DOCX', value: 'docx' },
    { label: 'XLS', value: 'xls' },
    { label: 'XLSX', value: 'xlsx' },
    { label: 'CSV', value: 'csv' },
    { label: 'TXT', value: 'txt' },
    { label: 'JPEG', value: 'jpeg' },
    { label: 'JPG', value: 'jpg' },
    { label: 'PNG', value: 'png' }
];
