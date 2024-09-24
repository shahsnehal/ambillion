/* eslint-disable camelcase */
export const generic = {
    success: 'has been successfully added.',
    saveError: 'Oops! There was some error in saving the detail. Please try again.',
    UM_EA_4002: 'Email already exist.',
    UM_MA_4003: 'Mobile number already exist.',
    UM_INV_4004: 'This user does not exist. Please try again with the correct Email ID/Password.',
    US_SAE_2002: 'Slug already present.',
    US_CSE_2003: 'Slug already present.',
    MT_AE_2002: 'Slug already present.',
    PW_SAE_2002: 'Slug already present.',
    MTS_UW_2001: 'Invalid URL',
    MKT_PG_1004: 'Slug already present.',
    WEB_SLGE_2002: 'Slug already present.',
    EV_SAE_2002: 'Slug already present.',
    CO_SlUG_2002: 'Slug already present.',
    status: {
        201: 'Document upload successfully',
        400: 'Apologies! Something has gone wrong at our end and we are trying to fix it. Please retry after sometime.',
        401: 'You currently donot have permissions to access this page or feature. Please send mail to studyabroad-support@upgrad.com',
        403: 'You currently donot have permissions to access this page or feature. Please send mail to support@example.com',
        404: 'Apologies! Something has gone wrong at our end and we are trying to fix it. Please retry after sometime.',
        409: 'Apologies! Something has gone wrong at our end and we are trying to fix it. Please retry after sometime.',
        500: 'Apologies! Something has gone wrong at our end and we are trying to fix it. Please retry after sometime.',
        503: 'You currently donot have permissions to access this page or feature. Please send mail to support@example.com',
        701: 'Apologies! Something has gone wrong at our end and we are trying to fix it. Please retry after sometime.',
        702: 'Apologies! Something has gone wrong at our end and we are trying to fix it. Please retry after sometime.',
        801: 'Apologies! Something has gone wrong at our end and we are trying to fix it. Please retry after sometime.',
        ECONNABORTED:
            'We are not able to reach our servers. Please check your internet connection.',
        ERR_NETWORK: 'Network Error'
    },
    network:
        'We are experiencing internet challenges with your connection. Please check your internet connection.'
};

export type StatusCode = keyof typeof generic.status;
