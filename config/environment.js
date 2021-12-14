

const developement = {
    name: 'developement',
    asset_path: '/assets',
    session_cookie_key: 'blahblah',
    db: 'codeial_developement',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'skandeshsuresh@gmail.com',
            pass: 's_k_a_n_desh1'
        }
    },
    google_client_id: "339891985621-0ticvonkiotm52tm5131du0g3k94ca98.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
    
}

const production = {
    name: 'production'
}


module.exports = developement;